import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import menuRoutes from '../Routes/menu'


const ListItems = (props) => {

const [selectedIndex, setSlectedIndex] = React.useState(null);

  const handleListItemClick = ( event, index, path) => {
     setSlectedIndex(index)
     props.history.push(`${path}`);
  }
  return ( <div>
    {menuRoutes().map((prop, key)=>{
        
           return (<ListItem
                  key={key}
                  button
                  selected={selectedIndex === prop.name}
                  onClick={event => handleListItemClick(event, prop.name, prop.path)}
              >
                  <ListItemIcon>
                      { prop.icon }
                  </ListItemIcon>
                  <ListItemText primary= { prop.label } />
              </ListItem>)
        
          })
      }
  </div>)
 };



export default ListItems