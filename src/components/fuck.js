import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'

// MATERIAL-UI
import {
  AppBar,
  Toolbar,
  Link,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { deleteUserToken } from '../store/actions/authActions'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  const user = useSelector(state => state.authUser.user)
  const [anchor, setAnchor] = useState(null)

  const handleClick = ev => setAnchor(ev.currentTarget)

  const handleClose = (ev) => setAnchor(null)

  const handleLogout = (ev) => {
    setAnchor(null)
    dispatch(deleteUserToken())
  }
  return (
    <div className={classes.root}>

<AppBar position="static" className={classes.appBar}>
      <Toolbar>

        {/* Logo */}
        <Typography variant="h6" className={classes.title} noWrap>
          <Link component={NavLink} to="/" color="inherit">NPSeed</Link>
        </Typography>
          {/* Welcome message */}
        <Typography variant="h6" className={classes.title} hidden={!hasToken}>
          💕 Hey hey hey, {user.username}! 💕
        </Typography>

        {/* Account Menu */}
        <nav hidden={!hasToken}>
          <IconButton onClick={handleClick}
            className={classes.menuButton} color="inherit"
            aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
            <AccountCircle />
          </IconButton>

          <Menu anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}
              component={NavLink}
              to={{ pathname: "/profile" }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </nav>

        <div hidden={hasToken}>
          <Button component={NavLink}
            to={{ pathname: "/signup"}}
            variant="contained"
            color="secondary"
          >
            Sign up
          </Button>
          
          <Button
            component={NavLink}
            to="/login"
            color="inherit"
            variant="outlined"
          >
            Login
          </Button>
        </div>
        
      </Toolbar>
    </AppBar>


      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}