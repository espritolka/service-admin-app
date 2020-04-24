import React from 'react';

import CustomInput from "../Components/Input";
import CustomAsyncSelect from "../Components/Select.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from "@material-ui/core/styles/withStyles";

import DateFnsUtils from '@date-io/date-fns';
import moment from "moment-timezone";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import ruLocale from "date-fns/locale/ru";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const materialTheme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            input: {
                fontSize: 14,
                padding : '6px 0 1px',
                '&:before' : {
                    padding : '6px 0 1px',
                },
            },
            root: {
                fontSize: 14,
                color: 'hsl(0,0%,80%)',
            },
            miltiline: {
                'padding': '6px 0 1px',
            }
        },
        MuiInput: {
            input: {
                padding : '6px 0 1px',
                fontSize: 14,
                'border-bottom': '1px solid #9c27b0'
            },
            underline: {
                "&:after": {
                    'border-bottom': '1px solid #9c27b0'
                },
                '&:before' : {
                    'border-bottom' : '1px solid hsl(0,0%,80%)'
                },
                '&:hover': {
                    'border-bottom': '1px solid hsl(0,0%,80%)',
                    'border-weight': '1px',
                        }
                }, 
                '&.Mui-focused': {
                   '& .MuiOutlinedInput-notchedOutline' :{
                      'border-width': '1px'
                   }
                }
            }
        },
});




const customStyles = {
    control: (provided) => ({
        display: 'flex',
        border: '#fff',
        zIndex: 0,
        borderRadius: 'none',
        fontSize: 14,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 400,
        lineHeight: 1.42857,
        backgroundColor: 'none',
        height: 29,
        borderBottom: '1px solid hsl(0,0%,80%)',
        borderStyle: 'solid'
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
        const { name,label, type, disabled, value, loadOptions, onChange, classes, validate, selectOptions } = props;
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
                        selectOptions = {selectOptions}
                        inputProps={
                            {
                                onChange: onChange,
                                value: value ? value : '',
                                loadOptions: (inputValue) => loadOptions(inputValue, name),
                                styles: customStyles,
                                color: "danger",
                                isDisabled:disabled,
                                ...props
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
                    <ThemeProvider theme={materialTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale = {ruLocale}>
                        <KeyboardDatePicker
                            moment={ moment.tz.setDefault('MSK')}
                            helperText={validate}
                            error={ validate }
                            labelText={label}
                            margin="normal"
                            id={ name }
                            label={ label}
                            minDate = {new Date()}
                            minDateMessage = {"Дата записи не может быть менее ранее сегодняшнего дня"}
                            format="dd.MM.yyyy"
                            clearLabel="очистить"
                            cancelLabel="отменить"
                            value={ value }
                            disabled={disabled}
                            onChange={onChange}
                            className={classes.grid}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    </ThemeProvider>
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