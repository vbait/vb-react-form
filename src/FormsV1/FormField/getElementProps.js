const isFieldProp = propName => (
  propName === 'component' ||
  propName === 'validator' ||
  propName === 'excluded' ||
  propName === 'onUpdate' ||
  propName === 'onFieldChange' ||
  propName === 'includeModel' ||
  propName === 'submissionErrors'
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
