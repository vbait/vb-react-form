const isFieldProp = (propName) => {
  return (
    propName === 'component' ||
    propName === 'value' ||
    propName === 'onInit' ||
    propName === 'onUpdate' ||
    propName === 'onFocus' ||
    propName === 'onBlur' ||
    propName === 'onChange' ||
    propName === 'onRemove' ||
    propName === 'onValid' ||
    propName === 'onAsyncValid' ||
    propName === 'validatorsOptions' ||
    propName === 'validators' ||
    propName === 'asyncValidator' ||
    propName === 'asyncValidatorOptions' ||
    propName === 'asyncValidateOn' ||
    propName === 'errors'
  );
};

export const getElementProps = (props) => {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isFieldProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return elementProps;
};