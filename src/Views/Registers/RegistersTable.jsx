import React from 'react';
import MUIDataTable from 'mui-datatables';

const RegistersTable = (props) => {
    const {data, onDelete} = props

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
        name: "schedule.master.name",
        label: "Мастер",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "schedule.date",
        label: "Дата",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "schedule.time.label",
        label: "Время",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "service.name",
        label: "Услуга",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "service.price",
        label: "Цена",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "client.name",
        label: "Клиент",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "client.phone",
        label: "Телефон",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "client.email",
        label: "Почта",
        options: {
            filter: true,
            sort: true,
            display: false
        }
    },
]

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
        onDelete(rowsDeleted.data)
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
}
    return(
        <MUIDataTable
        data={data}
        columns={columns}
        options={options}
    />
    )
}

export default RegistersTable