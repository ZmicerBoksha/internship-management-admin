/*
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <aside className="aside">
      <nav className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link className="menu__item-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__item-link" to="/authorization">
              Authorization
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__item-link" to="/events">
              Events
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__item-link" to="/staff">
              Staff
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__item-link" to="/candidate">
              Candidates
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;

*/

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Collapse, Menu, MenuItem, MenuList } from '@material-ui/core';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { AccountCircle, ExpandLess } from '@material-ui/icons';
import EventIcon from '@material-ui/icons/Event';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import StaffIcon from '@material-ui/icons/Group';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import CandidateIcon from '@material-ui/icons/PeopleOutline';
import Routers from '../routers/routers';
import { IEmployeeRoles } from '../../api/api';
import { isEmployee, isRoleExist } from '../../helper/roles/getRoles';
import { getEmployeeType } from '../../helper/getEmployeeType';
import { getEmployeeId } from '../../helper/getEmployeeId';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: isRoleExist() && isEmployee() ? '100%' : `calc(100% - ${drawerWidth}px)`,
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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [staffOpen, setStaffOpen] = React.useState(true);

  const [employeeInfoEl, setEmployeeInfoEl] = React.useState<null | HTMLElement>(null);

  const employeeInfo: IEmployeeRoles = JSON.parse(window.localStorage.getItem('employeeInfo') || '{}');

  const employeeMenu = Boolean(employeeInfoEl);

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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setEmployeeInfoEl(event.currentTarget);
  };

  const handleClose = () => {
    setEmployeeInfoEl(null);
  };

  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('employeeInfo');
    history.push('/authorization');
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
          <EventIcon style={{ marginRight: '5px' }} />
          Events
        </MenuItem>
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
          <PeopleOutlineOutlinedIcon style={{ marginRight: '5px' }} />
          Staff
        </MenuItem>
        <Collapse in={staffOpen} timeout="auto" unmountOnExit>
          <MenuList disablePadding>
            {['HR', 'TS'].map((category, index) => {
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
            <MenuOutlinedIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Admin panel
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
              <Typography variant="h6" noWrap>
                {employeeInfo.name} {employeeInfo.lastName}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={employeeInfoEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={employeeMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {isEmployee() && <Redirect to={`/staff/${getEmployeeType().toLowerCase()}/${getEmployeeId()}`} />}
      {!isEmployee() && (
        <>
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
        </>
      )}
      <Routers />
    </div>
  );
}
