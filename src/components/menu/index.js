import React from 'react';
import PropTypes from 'prop-types';
import MenuList from './layout/MenuList';
import {getMenus} from '../../api/menuApi';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 12,
    display: 'block',
  },
});

class Menu extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount () {
    getMenus ().then (
      result => {
        this.setState ({
          isLoaded: true,
          items: result,
        });
      },
      error => {
        this.setState ({
          isLoaded: false,
          error,
        });
      }
    );
  }

  render () {
    const {classes} = this.props;
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress size={80} className={classes.progress} />;
    } else {
      return <MenuList menus={items} />;
    }
  }
}

Menu.prototypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (Menu);
