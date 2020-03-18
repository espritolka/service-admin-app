import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Components/Title'

import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
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
    const [itemTypeDelete, setItemTypeDelete] = useState({ value: null, label: null })
    const [itemDelete, setItemDelete] = useState({ value: null, label: null })
    const [typeList, setTypeList] = useState([])
    const [itemList, setItemList] = useState([])
    const [error, setError] = useState({})

    useEffect(() => {
        getTypeList()
    }, [])

    useEffect(() => {
        getItemList(itemTypeDelete.value)
    }, [itemTypeDelete])

    const getTypeList = () => {
        api.Get.getDirectoryByType('directory').then((res) => {
            setTypeList(res)
        })
            .catch((error) => {
                console.log('getDirectoryByType error', error)
            })
    }

    const getItemList = (type) => {
        api.Get.getDirectoryByType(type).then((res) => {
            setItemList(res)
        })
            .catch((error) => {
                console.log(`getDirectoryByType ${type} error`, error)
            })
    }

    const handleChangeType = event => {
        setItemType({ value: event.value, label: event.label })
    };

    const handleChangeTypeDelete = event => {
        setItemList([])
        setItemTypeDelete({value: event.value, label: event.label})
    }

    const handleChangeItemDelete = event => {
        setItemDelete({value: event._id, label: event.label})
    }

    const handleButtonDeleteClick = (type, id) => {
       api.Delete.deleteDirectoryById(type,id).then((res)=>{
        setItemList([])
        setItemDelete({})
        getTypeList()
           alert('удалено')
       })
       .catch((error)=>{
        console.log(`deleteDirectoryById ${type} error`, error)
       })
    }

    const getValueSelect = () => {
        return new Promise(resolve => {
            let result = typeList
            resolve(result);
        });
    };

    const getValueItemSelect = () => {
        return new Promise(resolve => {
            let result = itemList
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
                        validate={error.name}
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
           <Grid container spacing={5} justify="left" alignItems="center">
                <Grid item xs={12} md={12} lg={12}>
                    <Title>
                        Удаление элемента справочника
                    </Title>
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    {typeList.length > 0 && (<InputAttribute
                        name={'itemTypeDelete'}
                        label={'Справочник'}
                        type={'select'}
                        onChange={handleChangeTypeDelete}
                        selectOptions={typeList}
                        loadOptions={(inputValue, name) => getValueSelect(inputValue, name)}
                        value={itemTypeDelete}
                    />)}
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    {itemList.length > 0 && (<InputAttribute
                        name={'itemDelete'}
                        label={'Элемент'}
                        type={'select'}
                        onChange={handleChangeItemDelete}
                        selectOptions={itemList}
                        loadOptions={(inputValue, name) => getValueItemSelect(inputValue, name)}
                        value={itemDelete}
                    />)}
                </Grid>
                <Grid item xs={2} md={1} lg={1}>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                            onClick={() => handleButtonDeleteClick(itemTypeDelete.value, itemDelete.value)}>
                            <RemoveCircle />
                        </IconButton>
                    </label>
                </Grid>
             </Grid>
             </Grid>
            </Grid>
        </div>
    )
}

export default Directorys