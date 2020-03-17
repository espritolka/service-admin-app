import React from 'react'
import Directorys from '../Views/Directorys'
import LayersIcon from '@material-ui/icons/Layers';
import Dashboard from '../Views/Dashboard'

const indexRoutes = () => {
  return  [
   // {path: '/directorys', name: 'Directorys', icon: <LayersIcon/>, component: Directorys},
    {path: '/',           name: "Home", component: Dashboard}
]
}

export default indexRoutes