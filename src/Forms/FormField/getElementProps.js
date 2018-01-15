const isFieldProp = propName => (
  propName === 'value' ||
  propName === 'component' ||
  propName === 'validator' ||
  propName === 'excluded' ||
  propName === 'onUpdate' ||
  propName === 'onFieldChange' ||
  propName === 'includeModel' ||
  propName === 'submissionErrors' ||
  propName === 'onFocus' ||
  propName === 'onChange' ||
  propName === 'onBlur'
);

export const getElementProps = (props) => {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isFieldProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return elementProps;
};
