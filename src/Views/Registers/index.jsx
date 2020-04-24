import React, {useState, useEffect} from 'react';
import ApiDirectory from '../../API/ApiDirectory';
import RegistersTable from './RegistersTable';


const Registers = (props) => {
    const api = new ApiDirectory();
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        api.Get.getRegisters().then((res) => {
            setData(res)
        })
        .catch((error) => {
            console.log('error in getRegisters')
        })
    }

    const handleDeleteItems = (items) => {
        items.map((item) => {
            
            api.Delete.deleteRegisterById(data[item.dataIndex]._id).then((res)=>{
             
            })
            .catch((error) => {
                getData()
                alert(error.response.data)
            })
        })
    }

    return(
        <RegistersTable
        data = {data}
        onDelete = {(items) => handleDeleteItems(items)}
        /> 
    )
}

export default Registers