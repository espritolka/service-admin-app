import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Components/Title'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import InputAttribute from '../../Components/InputAttribute'
import ApiDirectory from '../../API/ApiDirectory'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

const Directorys = () => {
    const api = new ApiDirectory();
    const classes = useStyles();

    const [directoryName, setDirectoryName] = useState('')
    const [directoryValue, setDirectoryValue] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState({ value: null, label: null })
    const [typeList, setTypeList] = useState([])
    const [error, setError] = useState({})

    useEffect(() => {
        getTypeList()
    }, [])

    useEffect(() => {
        typeList[0] && setItemType({ value: typeList[0].value, label: typeList[0].label })
    }, [typeList])

    const getTypeList = () => {
        api.Get.getDirectoryByType('directory').then((res) => {
            setTypeList(res)
        })
            .catch((error) => {
                console.log('getDirectoryByType error', error)
            })
    }

    const handleChangeType = event => {
        setItemType({ value: event.value, label: event.label })
    };

    const getValueSelect = () => {
        return new Promise(resolve => {
            let result = typeList
            resolve(result);
        });
    };

    const handleButtonAddClick = (type, data) => {
        api.Add.addDirectoryByType(type, data).then((res) => {
            setDirectoryName('')
            setDirectoryValue('')
            setItemName('')
            setItemType('')
            if (type == 'directory') {
                setTypeList([])
                getTypeList()
            }

        })
            .catch((error) => {
                setError(error)
                console.log('addDirectoryByType error =>', error)
            })
    }


    return (
        <div>
            <Grid container spacing={5} justify="left" alignItems="top">
            <Grid item xs={12} md={12} lg={6}>  
            <Grid container spacing={5} justify="left" alignItems="center">
                <Grid item xs={12} md={12} lg={12}>
                    <Title> Добавление справочника</Title>
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    <InputAttribute
                        name={'name'}
                        label={'Название'}
                        value={directoryName}
                        onChange={(event) => setDirectoryName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    <InputAttribute
                        name={'value'}
                        label={'Ключ'}
                        value={directoryValue}
                        onChange={(event) => setDirectoryValue(event.target.value)}
                    />
                </Grid>
                <Grid item xs={2} md={1} lg={1}>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                            onClick={() => handleButtonAddClick('directory',
                                { value: directoryValue, label: directoryName })}>
                            <AddCircle />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
           </Grid>
           <Grid item xs={12} md={12} lg={6}>  
            <Grid container spacing={5} justify="left" alignItems="center">
                <Grid item xs={12} md={12} lg={12}>
                    <Title>
                        Наполнение справочника
                    </Title>
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    {typeList.length > 0 && (<InputAttribute
                        name={'itemType'}
                        label={'Справочник'}
                        type={'select'}
                        onChange={handleChangeType}
                        selectOptions={typeList}
                        loadOptions={(inputValue, name) => getValueSelect(inputValue, name)}
                        value={itemType}
                    />)}
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    <InputAttribute
                        name={'itemName'}
                        label={'Текст'}
                        value={itemName}
                        disabled={!itemType.value}
                        onChange={(event) => setItemName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={2} md={1} lg={1}>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                            onClick={() => handleButtonAddClick(itemType.value,
                                { label: itemName })}>
                            <AddCircle />
                        </IconButton>
                    </label>
                </Grid>

            </Grid>
           </Grid>
           <Grid item xs={12} md={12} lg={6}>  
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Title>
                        Удаление справочника/элемента
                    </Title>
                </Grid>
             </Grid>
             </Grid>
            </Grid>
        </div>
    )
}

export default Directorys