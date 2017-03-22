import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import styles from './styles.scss';

const orderings = new Map();
orderings.set(1, 'ascending');
orderings.set(-1, 'descending');
orderings.set(0, 'ordering-none');

/**
 * This callback accepts data from table row and returns formatted value.
 *
 * @callback format
 * @param {object} data - A value to be formatted.
 * @returns {string} formattedString
 */

/**
 * This callback accepts row from data and returns props that will be applied to table row. Useful for styles, etc.
 *
 * @callback rowCallback
 * @param {object} row - A row from data array.
 * @returns {object} props
 */

/**
 * This callback accepts orderings applied to data, and data key of column that had been clicked.
 *
 * @callback orderCallback
 * @param {object} orderList - An ordering object. The keys of object are data keys of sortable columns and their values represent their state.
 *                             1: ascending, 0: no ordering applied, -1: descending.
 * @param {string} dataKey - A column dataKey.
 * @returns
 */

/**
 * This interface represents column configuration which might look like this:
 * ```javascript
 * {
 *    title: 'Doughnuts',
 *    dataKey: 'doughnuts',
 *    format: (doughnuts) => {
 *      return doughnuts.map(doughnut => doughnut.name).join(', ');
 *    },
 *    style: {{color: red}}
 * }
 * ```
 *
 * @typedef {object} DataTableColumnConfig
 * @property {string} [title] - The text displayed in column header.
 * @property {string} dataKey - A key in data row that represents cell data.
 * @property {format} [format] - The callback that receives row[dataKey] value and returns formatted value(useful for Date objects etc.).
 * @property {Component} [component] - A component that will receive value and row props.
 * @property {object} [style] - Styles applied to table column.
 * @property {?boolean} [hidden=false] - If column should be hidden. Useful for configurable dynamic tables.
 * @property {?boolean} [sortable=false] - If column should be sortable.
 */

/**
 * Expand is similar to column but provides less options. Is used for expandable data table rows.
 *
 * @typedef {object} ExpandConfig
 * @property {string} dataKey - A key in data row that represents cell data.
 * @property {Component} component - A component that will receive value and row props.
 */

/**
 * Ordering is simple object which keys are columns' data keys and it's values are ordering state. Looks like this:
 * ```javascript
 * {
 *    name: 1,
 *    price: -1,
 *    tax: 0
 * }
 * ```
 * This ordering says that names should be ordered ascending, price descending and tax should have no initial ordering.
 *
 * @typedef {object} Ordering
 */

/**
 * Data table configuration.
 *
 * @typedef {object} DataTableConfig
 * @property {DataTableColumnConfig[]} columns - array of columns configurations.
 * @property {object} [props] - Props passed to react-bootstrap Table.
 * @property {ExpandConfig} [expand] - Expand configuration. If this option is enabled the first column of DataTable will
 * be clickable and will show/hide additional row.
 * @property {Ordering} [ordering] - Initial ordering configuration. Initially this will be merged with columns sortable properties.
 * @property {rowCallback} [rowCallback]
 * @property {orderCallback} [orderCallback]
 *
 */

/**
 * This component should've been simple react-bootstrap-data-table until client demanded more features. Now it's a grotesque
 * abomination of it's former simplicity.
 *
 * DataTable accepts following props:
 *
 * @property {object} DataTableConfig - A data table configuration.
 * @property {object[]} data - An array of data(rows).
 *
 */
class DataTable extends React.Component {
  constructor(props) {
    super(props);

    const ordering = {
      ...props.config.ordering,
    };

    props.config.columns.filter(column => column.sortable).forEach((column) => {
      ordering[column.dataKey] = ordering[column.dataKey] || 0;
    });

    this.state = {
      expandList: new Array(props.data.length).fill(false),
      orderList: ordering,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const newOrderList = {};

      Object.keys(this.state.orderList).forEach((key) => {
        newOrderList[key] = nextProps.config.ordering ? nextProps.config.ordering[key] || 0 : 0;
      });

      this.setState({
        expandList: new Array(nextProps.data.length).fill(false),
        orderList: newOrderList,
      });
    }
  }

  render() {
    const {
      config: {
        columns: columnsConfiguration = [],
        expand = {},
        tableProps = {
          responsive: true,
          bordered: true,
        },
        orderCallback = () => ({}),
        rowCallback = () => ({}),
      },
      data,
      className,
    } = this.props;

    /*
     We will populate rows and columns.
     Rows will represent table rows (tr) and columns - table heads (th)
     */
    const rows = [];
    const columns = [];

    const ExpandComponent = expand.component;
    const expandKey = expand.dataKey;

    const visibleColumns = columnsConfiguration.filter(column => column.hidden !== true);
    const flatColumns = columnsConfiguration.filter(col => col.component === undefined);

    if (expandKey !== undefined) {
      visibleColumns.unshift(
        {
          dataKey: 'expandColumn',
          props: {
            className: 'expand-column',
            ...expand.props,
          },
        },
      );
    }

    visibleColumns.forEach((column, index) => {
      const props = {
        ...column.props,
      };
      if (this.state.orderList[column.dataKey] !== undefined) {
        props.onClick = () => {
          let order = this.state.orderList[column.dataKey] + 1;
          order = order >= 2 ? -1 : order;

          const newOrdering = { ...this.state.orderList };
          newOrdering[column.dataKey] = order;

          const newState = {
            ...this.state,
            orderList: newOrdering,
          };

          this.setState(newState);
          orderCallback(newState.orderList, column.dataKey);
        };

        const order = this.state.orderList[column.dataKey];

        props.className = orderings.get(order);
      }

      columns.push(
        <th key={column.title ? column.title : index} {...props}>
          {column.title ? column.title : ''}
        </th>,
      );
    });

    // Check for existing data.
    if (!data.length) {
      rows.push(
        <tr key="0">
          <td colSpan={columns.length}>
            No results found. Please update your search input and try again.
          </td>
        </tr>,
      );
    } else {
      data.forEach((row, index) => {
        const expandClick = () => {
          const list = [...this.state.expandList];
          list[index] = !list[index];
          this.setState({
            expandList: list,
          });
        };

        const rowKey = flatColumns.reduce((key, col) => `${key}-${row[col.dataKey]}`, row[flatColumns[0].dataKey]);

        rows.push(
          <tr key={rowKey} {...rowCallback(row)} >
            {visibleColumns.map((column, columnIndex) => {
              // Populate expandProps if expand option is enabled.
              const expandProps = {};
              if (expandKey && columnIndex === 0) {
                expandProps.onClick = expandClick;
                expandProps.className = `expand-icon ${this.state.expandList[index] ? 'shown' : ''}`;
              }

              const ColumnComponent = column.component;
              return (
                <td key={`${rowKey}-${column.dataKey}`} {...expandProps}>
                  {(column.component && (
                    <ColumnComponent value={row[column.dataKey]} row={row} />
                  )) || (
                    column.format ? column.format(row[column.dataKey]) : row[column.dataKey]
                  )}
                </td>
              );
            })}
          </tr>,
        );

        // Append expanded row if needed.
        if (expandKey && this.state.expandList[index]) {
          rows.push(
            <tr key={`${rowKey}-expand`} className="expanded">
              <td colSpan={columns.length}>
                <ExpandComponent row={row} value={row[expandKey]} />
              </td>
            </tr>,
          );
        }
      });
    }

    const tableClassName = className || tableProps.className || styles['b-data-table'];

    return (
      <Table {...tableProps} className={tableClassName}>
        <thead>
          <tr>
            {columns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }
}

DataTable.propTypes = {
  config: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.object),
    expand: PropTypes.shape({
      component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }),
    ordering: PropTypes.objectOf(PropTypes.number),
    tableProps: PropTypes.objectOf(PropTypes.any),
    orderCallback: PropTypes.func,
    rowCallback: PropTypes.func,
  }),
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

DataTable.defaultProps = {
  config: {
    columns: [],
  },
  data: [],
  className: null,
};

export default DataTable;
