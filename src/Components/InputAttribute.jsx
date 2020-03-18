import React from 'react';

import CustomInput from "../Components/Input";
import CustomAsyncSelect from "../Components/Select.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from "@material-ui/core/styles/withStyles";

import DateFnsUtils from '@date-io/date-fns';

import ruLocale from "date-fns/locale/ru";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const customStyles = {
    control: (provided) => ({
        display: 'flex',
        border: '#fff',
        zIndex: 0,
        borderRadius: 'none',
        borderBottom: '1px dotted hsl(0,0%,80%)',
        borderStyle: 'dotted',
        fontSize: 14,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 400,
        lineHeight: 1.42857,
        backgroundColor: 'none',
        height: 29
    }),
};

const styles = {
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center"
    },
    cardCategory: {
        margin: "0",
        color: "#999999"
    },
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    inputAdornment: {
        position: "relative"
    },
    grid: {
        width: "100%"
    },
    ...customStyles,
};


function InputAttribute(props) {

    const getElemByType = () => {
        const { name,label, type, disabled, value, loadOptions, onChange, classes, validate } = props;
        switch (type) {
            case 'select':
                return (
                    <CustomAsyncSelect
                        error={ !!validate }
                        labelText={ validate ? validate : label}
                        id={name}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={
                            {
                                onChange: onChange,
                                value: value ? value : '',
                                loadOptions: (inputValue) => loadOptions(inputValue, name),
                                styles: customStyles,
                                color: "danger",
                                isDisabled:disabled
                            }
                        }
                    />
                );
                break;
            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={disabled}
                                checked={ value ? value : false }
                                onChange={onChange}
                                value={name}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot
                                }}
                            />
                        }
                        label={label}
                    />
                );
                break;
            case 'date':
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale = {ruLocale}>
                        <KeyboardDatePicker
                            helperText={validate}
                            error={ validate }
                            labelText={label}
                            margin="normal"
                            id={label}
                            label={  label}
                            format="dd.MM.yyyy"
                            value={ value }
                            disabled={disabled}
                            onChange={onChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />


                    </MuiPickersUtilsProvider>
                );
                break;
            default:
                return (
                    <CustomInput
                        helpText={validate}
                        error={ validate }
                        labelText={label}
                        id={name}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        disabled={disabled}
                        inputProps={
                            {
                                onChange: onChange,
                                disabled: disabled,
                               // value: value ? value : ' ',
                                value: value,
                                color: "danger"
                            }
                        }
                    />
                );
        }
    };

    return (
        getElemByType()
    )
}


export default withStyles(styles)(InputAttribute);