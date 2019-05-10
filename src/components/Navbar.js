import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  appBar: {
    position: 'relative',
    flexDirection: 'row',
    padding: theme.spacing.unit * 2,
  },
  toolbarTitle: {
    flex: 1,
  },
  test: {
    fontWeight: 'bolder',
  },
});

const links = [
  {path: '/cheeses', name: 'Cheeses'},
  {path: '/categories', name: 'Categories'},
  {path: '/menus', name: 'Menus'},
];

const NavBar = props => {
  const {classes} = props;

  return (
    <AppBar color="primary" className={classes.appBar}>

      <Typography variant="h4" noWrap className={classes.toolbarTitle}>
        <NavLink to="/">Cheese-MVC</NavLink>
      </Typography>

      {links.map ((link, index) => (
        <Button key={index}>
          <Typography variant="h6">
            <NavLink to={link.path} activeClassName={classes.test}>
              {link.name}
            </NavLink>
          </Typography>
        </Button>
      ))}

    </AppBar>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (NavBar);
