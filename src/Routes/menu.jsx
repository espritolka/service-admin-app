import React from 'react'
import Directorys from '../Views/Directorys'
import Masters from '../Views/Masters'
import Services from '../Views/Services'
import List from '@material-ui/icons/List';
import Group from '@material-ui/icons/Group';
import Work from '@material-ui/icons/Work';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import Event from '@material-ui/icons/Event';

const menuRoutes = () => {
  return  [
    {path: '/directorys',    name: 'Directorys', label: 'Справочники', icon: <List/>,         component: Directorys},
    {path: '/services',      name: "Services",   label: 'Услуги',      icon: <Work/>,         component: Services},
    {path: '/masters',       name: "Masters",    label: 'Мастера',     icon: <Group/>,        component: Masters   },
    {path: '/shedules',      name: "Shedules",   label: 'График',      icon: <QueryBuilder/>, component: Directorys},
    {path: '/registeres',    name: "Registeres", label: 'Записи',      icon: <Event/>,        component: Directorys},
]
}

export default menuRoutes