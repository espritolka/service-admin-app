import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Components/Title'

import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Create from '@material-ui/icons/Create';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Grid from '@material-ui/core/Grid';
import InputAttribute from '../../Components/InputAttribute'
import ApiDirectory from '../../API/ApiDirectory';
import selectOptionsConverter from '../../Methods/';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

const Masters = () => {
    const api = new ApiDirectory();
    const classes = useStyles();

    const [newName, setNewName] = useState('')
    const [masterUpdate, setMasterUpdate] = useState({ value: null, label: null })
    const [name, setName] = useState('')
    const [mastersForDelete, setMastersForDelete] = useState({ value: null, label: null })
    const [mastersList, setMastersList] = useState([])

    const [error, setError] = useState({})

    useEffect(() => {
        getMastersList()
    }, [])

    const getMastersList = () => {
        api.Get.getMasters().then((res) => {
            setMastersList(selectOptionsConverter(res))
        })
            .catch((error) => {
                console.log('getMasterList error', error)
            })
    }

    const getMasterById = (id) => {
        api.Get.getMasterById(id).then((res) => {
            setName(res.name)
        })
            .catch((error) => {
                console.log(`getMasterById ${id} error`, error)
            })
    }

    const handleChangeMastersForDelete = event => {
        setMastersForDelete({ value: event._id, label: event.name })
    };

    const handleChangeMasterForUpdate = event => {
        setMasterUpdate({value: event._id, label: event.name})
        getMasterById(event._id)
    }

    const handleButtonDeleteClick = (id) => {
       api.Delete.deleteMasterById(id).then((res)=>{
        setMastersList([])
        setMastersForDelete({})
        setMasterUpdate({})
        getMastersList()
           alert('удалено')
       })
       .catch((error)=>{
        console.log(`deleteMasterById ${id} error`, error)
       })
    }

    const handleButtonUpdateClick = (id, body) => {
        api.Update.updateMasterById(id, body).then((res)=>{
         setMastersList([])
         setMasterUpdate({})
         setName('')
         getMastersList()
        })
        .catch((error)=>{
         console.log(`updateMasterById ${id} error`, error)
        })
     }


    const handleButtonAddClick = (data) => {
        api.Add.addMaster(data).then((res) => {
            setNewName('')
            setMastersList([])
            getMastersList()
        })
            .catch((error) => {
                setError(error)
                console.log('addMaster error =>', error)
            })
    }


    return (
        <div>
            <Grid container spacing={5} justify="left" alignItems="top">
                <Grid item xs={12} md={12} lg={6}>
                    <Grid container spacing={5} justify="left" alignItems="center">
                        <Grid item xs={12} md={12} lg={12}>
                            <Title> Добавление мастера</Title>
                        </Grid>
                        <Grid item xs={5} md={5} lg={10}>
                            <InputAttribute
                                name={'name'}
                                label={'ФИО'}
                                value={newName}
                                validate={error.name}
                                onChange={(event) => setNewName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2} md={1} lg={1}>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span"
                                    onClick={() => handleButtonAddClick({ name: newName})}>
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
                                Удаление мастера
                         </Title>
                        </Grid>
                        <Grid item xs={5} md={5} lg={10}>
                            <InputAttribute
                                name={'mastersForDelete'}
                                label={'Выберите мастера'}
                                type={'select'}
                                onChange={handleChangeMastersForDelete}
                                selectOptions={mastersList}
                                value={mastersForDelete}
                            />
                        </Grid>

                        <Grid item xs={2} md={1} lg={1}>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span"
                                    onClick={() => handleButtonDeleteClick(mastersForDelete.value)}>
                                    <RemoveCircle />
                                </IconButton>
                            </label>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container spacing={5} justify="left" alignItems="center">
                        <Grid item xs={12} md={12} lg={12}>
                            <Title>
                                Редактирование 
                         </Title>
                        </Grid>
                        <Grid item xs={5} md={5} lg={5}>
                            <InputAttribute
                                name={'masterUpdate'}
                                label={'Выберите мастера'}
                                type={'select'}
                                onChange={handleChangeMasterForUpdate}
                                selectOptions={mastersList}
                                value={masterUpdate}
                            />
                        </Grid>
                        <Grid item xs={0} md={1} lg={1}>
                            </Grid>
                        <Grid item xs={5} md={5} lg={5}>
                            <InputAttribute
                                name={'name'}
                                label={'Новое значение ФИО'}               
                                onChange={(event) => setName(event.target.value)}
                                display ={!masterUpdate.value}
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={2} md={1} lg={1}>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span"
                                    onClick={() => handleButtonUpdateClick(masterUpdate.value, {name: name})}>
                                    <Create />
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Masters