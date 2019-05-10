import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheeseForm from './cheese/layout/CheeseForm';
import CategoryForm from './category/layout/CategoryForm';
import MenuForm from './menu/layout/MenuForm';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 8,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'

  },
  add: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
  }
});

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toAddCheeseForm: false,
        toCheeses: false,
        toAddMenuForm: false,
        toMenus: false,
        toAddCategoryForm: false,
        toCategories: false
      };
    }
    showForm = (name) => this.setState({ [name]: true});
    // showAddMenu = () => this.setState({ toAddMenuForm: true});
    

    handleAddCheese = (cheeseAdded) => {
      this.setState({ toAddCheeseForm: false});
      if(cheeseAdded) {
        this.setState({toCheeses: true});
      }
    }

    handleAddMenu = (menuAdded) => {
      this.setState({ toAddMenuForm: false});
      if(menuAdded) {
        this.setState({toMenus: true});
      }
    }
  
  handleAddCategory = (categoryAdded) => {
    this.setState({ toAddCategoryForm: false});
    if(categoryAdded) {
      this.setState({toCategories: true});
    }
  }

    render() {
      if(this.state.toCheeses) {
        return <Redirect to='/cheeses'/>
      }
      else if (this.state.toCategories) {
        return <Redirect to='/categories'/>
      }
      else if(this.state.toMenus) {
        return <Redirect to='/menus'/>
      }
      const { classes } = this.props;
      const { toAddCheeseForm, toAddCategoryForm, toAddMenuForm } = this.state;
      return (
        <>
          
        <Paper className={classes.root} elevation={1}>
          <Typography component="h3">
              This is a single page application that employs <a href="https://cheesemvc-api.herokuapp.com/swagger-ui.html#" target="_blank" rel="noopener noreferrer">Cheese-API</a> to perform CRUD operations. 
              <a href="https://cheesemvc-api.herokuapp.com/swagger-ui.html#" target="_blank" rel="noopener noreferrer">Cheese-API</a> is a REST API written in Spring Boot.
          </Typography>
          <Button size="large" variant="contained" color="secondary" className={classes.add} onClick={()=> this.showForm('toAddCheeseForm')}>Add Cheese</Button>
          <Button size="large" variant="contained" color="secondary" className={classes.add} onClick={()=> this.showForm('toAddCategoryForm')}>Add Category</Button>
          <Button size="large" variant="contained" color="secondary" className={classes.add} onClick={()=> this.showForm('toAddMenuForm')}>Add Menu</Button>
        </Paper>
       
        
        {toAddCheeseForm && <CheeseForm handleClose={this.handleAddCheese} action="Add Cheese" />}
        {toAddCategoryForm && <CategoryForm handleClose={this.handleAddCategory} action='Add Category'/>}
        {toAddMenuForm && <MenuForm handleClose={this.handleAddMenu} action="Add Menu"/>}
        </>
      );
    }
  }

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Main);