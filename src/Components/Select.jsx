import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import customInputStyle from './style/customInputStyle'


import AsyncSelect from 'react-select/async';

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    loadOptions,
    onChange
  } = props;


  const labelClasses = classNames({
    [" " + classes.selectLabel]: !error,
    [" " + classes.selectLabelError]: error
  });


  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }

  return (
    <FormControl {...formControlProps} 
    className={formControlClasses}
    >
        <InputLabel
          className={ labelClasses }
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>

      <AsyncSelect
        id={id}
        name={id}
        loadOptions={(inputValue) => loadOptions(inputValue, id)}
        onChange={ onChange }
        defaultOptions
        {...inputProps}
      />
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helpText: PropTypes.node
};

export default withStyles(customInputStyle)(CustomInput);
