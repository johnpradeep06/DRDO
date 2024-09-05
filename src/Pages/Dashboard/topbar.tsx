import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Topbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
