const isFieldProp = propName => (
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
  propName === 'validator' ||
  propName === 'validatorOptions' ||
  propName === 'asyncValidator' ||
  propName === 'asyncValidatorOptions' ||
  propName === 'asyncValidateOn' ||
  propName === 'errors' ||
  propName === 'excluded'
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
