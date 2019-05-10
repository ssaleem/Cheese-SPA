import React from 'react';
import PropTypes from 'prop-types';
import {categoryType} from '../../../api/resourcesShape';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    margin: 'auto',
    [theme.breakpoints.down ('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.up ('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up ('lg')]: {
      width: '60%',
    },
    marginBottom: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  title: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
    marginBottom: theme.spacing.unit,
  },
});

const CategoryList = props => {
  const {classes, categories} = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h4" className={classes.title}>
        Cheese Categories
      </Typography>
      <List>
        {categories.map (category => (
          <ListItem divider key={category.id}>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf (categoryType).isRequired,
};

export default withStyles (styles) (CategoryList);
