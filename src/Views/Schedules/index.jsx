import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ApiDirectory from '../../API/ApiDirectory';
import Title from '../../Components/Title';
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import SchedulesTable from './SchedulesTable';
import InputAttribute from '../../Components/InputAttribute';
import selectOptionsConverter from '../../Methods/';


const Schedules = (props) => {
    const api = new ApiDirectory()

    const [data, setData] = useState({
        date: new Date(), 
        time: [],
        master: { value: '', label: '' }}
        )
    const [timesList, setTimesList] = useState([])
    const [mastersList, setMastersList] = useState([])

    const [update, setUpdate] = useState(false)

     useEffect(() => {
        getLists()
     },[])   

    const getLists = () => {
        api.Get.getDirectoryByType('time').then((res) => {
            let value = selectOptionsConverter(res)
            setTimesList(value)
        })
        .catch((error) => {
            console.log(`error in getDirectoryByType time`)
        })
        api.Get.getMasters().then((res) => {
            let value = selectOptionsConverter(res)
            setMastersList(value)
        })
        .catch((error) => {
            console.log(`error in getMasters time`)
        })
    } 

    const handleButtonAddClick = () => {
       api.Add.addSchedule(data).then((res) => {
           setUpdate(!update)
           setData({date: new Date(), 
            time: [],
            master: { value: '', label: '' }})
       })
       .catch((error) => {
           console.log('error in addSchedules')
       })
    }

    const hendleChangeTime = (event) => {
        setData({...data, time: event})
    }

    const hendleChangeMaster = event => {
        setData({...data, master: event})
    }


    return (
        <div>
           <Grid container spacing={5} justify="left" alignItems="top">
           <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={5} justify='left' alignItems='top'>
                <Grid item xs={12} md={12} lg={12}>
                    <Title>Добавление графика работы</Title>
                </Grid>
                <Grid item xs={12} md={5} lg={3}>
                   <InputAttribute
                        name={'date'}
                        label="Дата"
                        type={'date'}
                        value={data.date}
                        onChange={(date)=> setData({...data, date: date})}
                    />
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                <InputAttribute
                                    name={'time'}
                                    label={'Выберите время'}
                                    type={'select'}
                                    onChange={hendleChangeTime}
                                    selectOptions={timesList}
                                    value={data.time}
                                    isMulti={true}
                                />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <InputAttribute
                                    name={'master'}
                                    label={'Выберите мастрера'}
                                    type={'select'}
                                    onChange={hendleChangeMaster}
                                    selectOptions={mastersList}
                                    value={data.master}
                                />
                </Grid>
                <Grid item xs={12} md={1} lg={1}>
                  <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                        onClick={() => handleButtonAddClick(data)}>
                                        <AddCircle />
                                    </IconButton>
                 </label>
                </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing = {5} justify='left' alignItems='top'>
               <Grid item xs={12} md={12} lg={6}>
                    <Title>График работы</Title>
               </Grid>
               <Grid item xs={12} md={12} lg={12}>
                    <SchedulesTable update={update}/>
               </Grid>
            </Grid>
            </Grid>
       </Grid>
        </div>
    )
}

export default Schedules