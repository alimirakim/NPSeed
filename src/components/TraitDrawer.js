import React from 'react';

// MATERIAL-UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar'



export default function TraitDrawer({ open, setOpen, currentTraitTypes, }) {


  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    // appBar: {
      // zIndex: theme.zIndex.drawer + 1,
      // transition: theme.transitions.create(['margin', 'width'], {
        // easing: theme.transitions.easing.sharp,
        // duration: theme.transitions.duration.leavingScreen,
      // }),
    // },
    // appBarShift: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   transition: theme.transitions.create(['margin', 'width'], {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    //   marginRight: drawerWidth,
    // },
    // title: {
    //   flexGrow: 1,
    // },
    // hide: {
    //   display: 'none',
    // },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      top: "4rem",
      borderTop: "1px",
    },
    drawerContainer: {
      overflow: 'auto'
    },
    // drawerHeader: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   padding: theme.spacing(0, 1),
    //   // necessary for content to be below app bar
    //   ...theme.mixins.toolbar,
    //   justifyContent: 'flex-start',
    // },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      // transition: theme.transitions.create('margin', {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      // marginRight: -drawerWidth,
    },
    // contentShift: {
    //   transition: theme.transitions.create('margin', {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    //   marginRight: 0,
    // },
  }));

  const classes = useStyles();

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Drawer
      elevation="13"
      className={classes.drawer}
      variant="permanent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      styles={{top: "4rem"}}
    >
    
    <Toolbar />
    
      {/* <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div> */}

      <Divider />
      <div className={classes.drawerContainer}>
        <List>
          <h3>{currentTraitTypes.traitType} Options</h3>
          <Divider />
          {currentTraitTypes.traits.map((trait) => (
            <>
            <ListItem key={trait}>
              <ListItemText primary={trait} />
            </ListItem>
        <Divider />
        </>
          ))}
        </List>
      </div>
    </Drawer>
  )
}
