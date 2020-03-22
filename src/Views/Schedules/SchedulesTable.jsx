import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import ApiDirectory from '../../API/ApiDirectory';
import Typography from '@material-ui/core/Typography'

const SchedulesTable = (props) => {
    const api = new ApiDirectory()

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [props.update])

    const getData = () => {
        api.Get.getSchedules().then((res) => {
            setData(res)
        })
            .catch((error) => {
                console.log(`error in getSchedules`, error)
            })
    }

    const handleDeleteItems = (array) => {
        array.map((item) => {
            console.log('item id', data[item.dataIndex]._id)
            api.Delete.deleteScheduleById(data[item.dataIndex]._id).then((res)=>{
              //setData(data.splice(item.dataIndex, 1))
            })
            .catch((error) => {
                getData()
                alert(error.response.data)
            })
        })
    }


    const columns = [
        {
            name: "_id",
            label: "id",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "master.name",
            label: "Мастер",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "master.id",
            label: "Мастер id",
            options: {
                //filter: false,
                sort: true,
                display: false
            }
        },
        {
            name: "date",
            label: "Дата",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "time.label",
            label: "Время",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "free",
            label: "Статус",
            options: {
                filter: true,
                sort: false,
                download: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if (value) {
                            return (<Typography color='primary'>Свободно</Typography>)
                        } else {
                            return (<Typography color='error'>Занято</Typography>)
                        }
                   
            }
            }
        },
        {
            name: "register.id",
            label: "запись",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
    ];



    const options = {
        filterType: 'checkbox',
        print: false,
        downloadOptions: {
            filename: `Записи.csv`,
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            }
        },
        onDownload: (buildHead, buildBody, columns, data, displayData) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data);
        },
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        onRowsDelete: (rowsDeleted) => {
            handleDeleteItems(rowsDeleted.data)
        },
        textLabels: {
            body: {
                noMatch: "Идёт загрузка данных",
                toolTip: "Отсортировать",
            },
            pagination: {
                next: "Следующая страница",
                previous: "Предыдущая страница",
                rowsPerPage: "Отображать по:",
                displayRows: "из",
            },
            toolbar: {
                search: "Поиск",
                downloadCsv: "Скачать CSV",
                print: "Распечатать",
                viewColumns: "Отображение столбцов",
                filterTable: "Фильтр",
            },
            filter: {
                all: "Все",
                title: "Фильтры",
                reset: "Очистить",
            },
            viewColumns: {
                title: "Столбцы",
                titleAria: "Отобразить/Скрыть столбцы",
            },
            selectedRows: {
                text: "элемент(ов) выбрано",
                delete: "Удалить",
                deleteAria: "Удалить выбранные элементы",
            },
        }
    };


    return (
        <div>

            <MUIDataTable
                // title={"График работы"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default SchedulesTable