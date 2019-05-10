import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getCategories} from '../../api/categoryApi';
import {withStyles} from '@material-ui/core/styles';
import CategoryList from './layout/CategoryList';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 12,
    display: 'block',
  },
});

class Category extends Component {
  constructor (props) {
    super (props);
    this.state = {
      categories: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount () {
    getCategories ()
      .then (categories =>
        this.setState ({
          isLoaded: true,
          categories,
        })
      )
      .catch (error =>
        this.setState ({
          isLoaded: true,
          error,
        })
      );
  }

  render () {
    const {classes} = this.props;
    const {categories, isLoaded} = this.state;

    if (!isLoaded) {
      return <CircularProgress size={80} className={classes.progress} />;
    } else {
      return <CategoryList categories={categories} />;
    }
  }
}

Category.prototypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles (styles) (Category);
