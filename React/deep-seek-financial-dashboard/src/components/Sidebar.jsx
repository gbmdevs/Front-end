import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider,Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Sidebar = () => {
  return (
    <div
      style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1976D2 0%, #009688 100%)',
        height: '100vh',
        color: '#FFFFFF',
      }}
    >
      <Toolbar /> {/* Adds spacing below the Navbar */}
      <Divider />
      <List>
        {['Dashboard', 'Expenses', 'Reports'].map((text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text.toLowerCase()}`}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <ListItemIcon sx={{ color: '#FFFFFF' }}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;