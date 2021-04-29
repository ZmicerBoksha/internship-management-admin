import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Collapse, MenuItem, MenuList } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import { ExpandLess } from '@material-ui/icons';
import EventIcon from '@material-ui/icons/Event';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StaffIcon from '@material-ui/icons/Group';
import CandidateIcon from '@material-ui/icons/PeopleOutline';
import Routers from '../routers/routers';
import './navBarStyle.scss';

/*
const Navbar: React.FC = () => {
    let [currentLink, currentLinkEdit] = useState<string>('dashboard');
    return (
        <aside className="aside">
            <nav className="menu">
                <ul className="menu__list">

                    <li onClick={() => {currentLinkEdit("dashboard")}}
                        className={currentLink === "dashboard" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("authorization")}
                        className={currentLink === "authorization" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/authorization"
                        >
                            Authorization
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("events")}
                        className={currentLink === "events" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/events"
                        >
                            Events
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("tsTable")}
                        className={currentLink === "tsTable" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/tsTable"
                        >
                            TsTable
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("hrs")}
                        className={currentLink === "hrs" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/hrs"
                        >
                            HR
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("add")}
                        className={currentLink === "add" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/staff/add"
                        >
                            Staff add
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Navbar;

*/

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(5),
    },
  }),
);

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [staffOpen, setStaffOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const staffHandleClick = () => {
    setStaffOpen(!staffOpen);
  };

  const drawer = (
    <div>
      <MenuList>
        <MenuItem
          component={Link}
          to="/"
          selected={selectedIndex === 0}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleListItemClick(event, 0)}
        >
          <DashboardIcon style={{ marginRight: '5px' }} />
          Dashboard
        </MenuItem>
        <MenuItem
          component={Link}
          to="/events"
          button
          selected={selectedIndex === 1}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleListItemClick(event, 1);
            handleClick();
          }}
        >
          {open ? <ExpandLess style={{ marginRight: '5px' }} /> : <EventIcon style={{ marginRight: '5px' }} />}
          Events
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuList disablePadding>
            {['Planned', 'In progress', 'Archive'].map((category, index) => {
              return (
                <MenuItem
                  key={index}
                  button
                  className={classes.nested}
                  component={Link}
                  to={`/events/${index}`}
                  selected={selectedIndex === index + 2}
                  onClick={(event: React.MouseEvent<HTMLElement>) => handleListItemClick(event, index + 2)}
                >
                  {category}
                </MenuItem>
              );
            })}
          </MenuList>
        </Collapse>
        {/*temporary*/}
        <MenuItem
          component={Link}
          to="/candidate"
          selected={selectedIndex === 5}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleListItemClick(event, 5)}
        >
          <CandidateIcon style={{ marginRight: '5px' }} />
          Candidates
        </MenuItem>
        <MenuItem
          component={Link}
          to="/staff"
          selected={selectedIndex === 6}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleListItemClick(event, 6);
            staffHandleClick();
          }}
        >
          <StaffIcon style={{ marginRight: '5px' }} />
          Staff
        </MenuItem>
        <Collapse in={staffOpen} timeout="auto" unmountOnExit>
          <MenuList disablePadding>
            {['HR', 'TS', 'add'].map((category, index) => {
              return (
                <MenuItem
                  key={index}
                  button
                  className={classes.nested}
                  component={Link}
                  to={`/staff/${category}`}
                  selected={selectedIndex === index + 7}
                  onClick={(event: React.MouseEvent<HTMLElement>) => handleListItemClick(event, index + 7)}
                >
                  {category}
                </MenuItem>
              );
            })}
          </MenuList>
        </Collapse>
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Routers />
    </div>
  );
}
