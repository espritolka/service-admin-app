import React , {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Components/Title'

import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Create from '@material-ui/icons/Create';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Grid from '@material-ui/core/Grid';
import InputAttribute from '../../Components/InputAttribute'
import ApiDirectory from '../../API/ApiDirectory';
import selectOptionsConverter from '../../Methods/'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

const Services = (props) =>{
    const api = new ApiDirectory();

    const [newData, setNewData] = useState({name: '', price: 0})
    const [data, setData] = useState({name: '', price: ''})
    const [servicesList, setServicesList] = useState([])
    const [serviceForDelete, setServiceForDelete] = useState({ value: null, label: null })
    const [serviceForUpdate, setServiceForUpdate] = useState({ value: null, label: null })

    const [error, setError] = useState([])

    useEffect(() => {
        getServicesList()
    }, [])

    const getServicesList = () => {
        api.Get.getServices().then((res) => {
            setServicesList(selectOptionsConverter(res))
        })
            .catch((error) => {
                console.log('getServices error', error)
            })
    }

    const getServiceById = (id) => {
        api.Get.getServiceById(id).then((res) => {
            setData(res)
        })
        .catch((error)=>{
            console.log('getServiceById error', error)
        })
    }

    const handleChangeServiceForDelete = event => {
        setServiceForDelete({ value: event._id, label: event.name })
    };

    const handleChangeServiceForUpdate = event => {
        setServiceForUpdate({value: event._id, label: event.name})
        getServiceById(event._id)
    }

    const handleButtonAddClick = (data) => {
        api.Add.addService(data).then((res) => {
            setNewData({name: '', price: 0})
            setServicesList([])
            getServicesList()
            setError([])
        })
            .catch((error) => {
                setError(error)
                console.log('addMaster error =>', error)
            })
    }


    const handleButtonDeleteClick = (id) => {
        api.Delete.deleteServiceById(id).then((res)=>{
          setServicesList([])
          setServiceForDelete({})
          setServiceForUpdate({})
          getServicesList()
            alert('удалено')
        })
        .catch((error)=>{
         console.log(`deleteServiceById ${id} error`, error)
        })
     }
 
     const handleButtonUpdateClick = (id, body) => {
         api.Update.updateServiceById(id, body).then((res)=>{
            setServicesList([])
            setServiceForDelete({})
            setServiceForUpdate({})
            getServicesList()
            setData({name:'', price: ''})
        //   setData('')
         })
         .catch((error)=>{
          console.log(`updateServiceById ${id} error`, error)
         })
      }
 
     const getValueSelect = () => {
         return new Promise(resolve => {
             let result = servicesList
             resolve(result);
         });
     };

    return(
            <div>
                <Grid container spacing={5} justify="left" alignItems="top">
                    <Grid item xs={12} md={12} lg={6}>
                        <Grid container spacing={5} justify="left" alignItems="center">
                            <Grid item xs={12} md={12} lg={12}>
                                <Title>Добавление услуги</Title>
                            </Grid>
                            <Grid item xs={5} md={5} lg={5}>
                                <InputAttribute
                                    name={'newDataName'}
                                    label={'Название услуги'}
                                    value={newData.name}
                                    validate={error.name}
                                    onChange={(event) => setNewData({...newData, name: event.target.value})}
                                />
                            </Grid>
                            <Grid item xs={5} md={5} lg={5}>
                                <InputAttribute
                                    name={'newDataPrice'}
                                    label={'Цена'}
                                    value={newData.price}
                                    validate={error.price}
                                    onChange={(event) => setNewData({...newData, price: event.target.value})}
                                />
                            </Grid>
                            <Grid item xs={2} md={1} lg={1}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                        onClick={() => handleButtonAddClick(newData)}>
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
                                    Удаление услуги
                             </Title>
                            </Grid>
                            <Grid item xs={5} md={5} lg={10}>
                                {servicesList.length > 0 && (<InputAttribute
                                    name={'serviceForDelete'}
                                    label={'Выберите услугу'}
                                    type={'select'}
                                    onChange={handleChangeServiceForDelete}
                                    selectOptions={servicesList}
                                    loadOptions={(inputValue, name) => getValueSelect(inputValue, name)}
                                    value={serviceForDelete}
                                />)}
                            </Grid>
    
                            <Grid item xs={2} md={1} lg={1}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                        onClick={() => handleButtonDeleteClick(serviceForDelete.value)}>
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
                            <Grid item xs={5} md={4} lg={4}>
                                {servicesList.length > 0 && (<InputAttribute
                                    name={'serviceUpdate'}
                                    label={'Выберите Услугу'}
                                    type={'select'}
                                    onChange={handleChangeServiceForUpdate}
                                    selectOptions={servicesList}
                                    loadOptions={(inputValue, name) => getValueSelect(inputValue, name)}
                                    value={serviceForUpdate}
                                />)}
                            </Grid>
                            <Grid item xs={5} md={3} lg={4}>
                                <InputAttribute
                                    name={'name'}
                                    label={'Новое название'}               
                                    onChange={(event) => setData({...data, name: event.target.value})}
                                    display ={!serviceForUpdate.value}
                                    value={data.name}
                                />
                            </Grid>
                            <Grid item xs={5} md={3} lg={3}>
                                <InputAttribute
                                    name={'price'}
                                    label={'Новая цена'}               
                                    onChange={(event) => setData({...data, price: event.target.value})}
                                    display ={!serviceForUpdate.value}
                                    value={data.price}
                                />
                            </Grid>
                            <Grid item xs={2} md={1} lg={1}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                        onClick={() => handleButtonUpdateClick(serviceForUpdate.value, data)}>
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

export default Services