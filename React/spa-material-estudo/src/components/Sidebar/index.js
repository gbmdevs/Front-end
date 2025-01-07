import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, AdminPanelSettings, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Admin', icon: <AdminPanelSettings />, path: '/admin' },
        { text: 'Login', icon: <Login />, path: '/login' },
    ];

    return(
        <Drawer variant="permanent" anchor="left">
        <List>
          {menuItems.map((item) => (
            <ListItem button component={Link} to={item.path} key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
}

export default Sidebar