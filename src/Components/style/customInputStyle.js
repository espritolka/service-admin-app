const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";

  
  const customInputStyle = {
    disabled: {
      color: '#999999 !important',
      "&:before": {
        borderColor: "transparent !important",
      }
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: "#D2D2D2 !important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: primaryColor
      }
    },
    underlineError: {
      "&:after": {
        borderColor: dangerColor
      }
    },
    underlineSuccess: {
      "&:after": {
        borderColor: successColor
      }
    },
    labelRoot: {
     // ...defaultFont,
      color: "#AAAAAA !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      top: "10px",
      "& + $underline": {
        marginTop: "0px"
      }
    },
    labelRootError: {
      color: dangerColor + " !important"
    },
    labelRootSuccess: {
      color: successColor + " !important"
    },
    formControl: {
      margin: "0 0 17px 0",
      paddingTop: "27px",
      position: "relative",
      verticalAlign: "unset",
      "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
        color: "#495057"
      }
    },
    whiteUnderline: {
      "&:hover:not($disabled):before,&:before": {
        backgroundColor: "#FFFFFF"
      },
      "&:after": {
        backgroundColor: "#FFFFFF"
      }
    },
    input: {
      color: "#495057",
      "&,&::placeholder": {
        fontSize: "14px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "400",
        lineHeight: "1.42857",
        opacity: "1",
        paddingRight: 22
      },
      "&::placeholder": {
        color: "#AAAAAA"
      }
    },
    whiteInput: {
      "&,&::placeholder": {
        color: "#FFFFFF",
        opacity: "1"
      }
    },
    selectLabel: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left',
      top: 10,
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.42857,
      color: '#AAAAAA !important'
    },
    selectLabelError: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left',
      top: 10,
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.42857,
      color: dangerColor + " !important"
    }
  };
  
  export default customInputStyle;
  