import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addCheese, updateCheese} from '../../../api/cheeseApi';
import {getCategories} from '../../../api/categoryApi';
import {cheeseType} from '../../../api/resourcesShape';

const styles = () => ({
  container: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '10px auto',
    width: '70%',
  },
  submitButton: {
    margin: '20px auto',
    width: '70%',
  },
});

const ratings = [1, 2, 3, 4, 5];

class CheeseForm extends React.Component {
  abortController = new window.AbortController ();

  constructor (props) {
    super (props);
    this.state = {
      name: '',
      description: '',
      rating: '',
      categories: [],
      categoryId: '',
      error: null,
      open: true,
    };
  }

  componentDidMount () {
    if (this.props.cheese) {
      const cheese = this.props.cheese;
      this.setState ({
        name: cheese.name,
        description: cheese.description,
        rating: cheese.rating,
        categoryId: cheese.category.id,
      });
    }
    getCategories (this.abortController.signal)
      .then (categories => this.setState ({categories}))
      .catch (error => {
        if (error.name === 'AbortError') {
          // console.log ('abort before fetch completed');
          return; // form was closed before categories could be fetched, so just return
        }
      });
  }

  handleChange = name => event => {
    this.setState ({[name]: event.target.value});
  };

  handleClose = (updatedCheese = null) => {
    this.setState ({open: false});
    this.props.handleClose (updatedCheese);
  };

  handleSubmit = event => {
    event.preventDefault ();
    const cheese = (({name, description, categoryId, rating}) => ({
      name,
      description,
      categoryId,
      rating,
    })) (this.state);
    if (this.props.cheese) {
      //   use put to update current cheese
      updateCheese (this.props.cheese.id, cheese)
        .then (response => this.handleClose (response))
        .catch (errors => this.setState ({error: errors}));
    } else {
      //   use post to create new cheese
      addCheese (cheese)
        .then (() => this.handleClose (true))
        .catch (errors => this.setState ({error: errors}));
    }
  };

  componentWillUnmount = () => {
    this.abortController.abort ();
  };

  render () {
    const {classes, action} = this.props;
    const {categories} = this.state;

    return (
      <Dialog
        open={this.state.open}
        onClose={() => this.handleClose ()}
        aria-labelledby={action}
      >
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            required
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange ('name')}
            margin="normal"
            error={this.state.error && Boolean (this.state.error['name'])}
            helperText={this.state.error ? this.state.error['name'] : ''}
          />

          <TextField
            required
            id="standard-multiline-flexible"
            label="Description"
            multiline
            rowsMax="3"
            value={this.state.description}
            onChange={this.handleChange ('description')}
            className={classes.textField}
            margin="normal"
            error={
              this.state.error && Boolean (this.state.error['description'])
            }
            helperText={this.state.error ? this.state.error['description'] : ''}
          />

          <TextField
            select
            label="Category"
            className={classes.textField}
            value={this.state.categoryId}
            onChange={this.handleChange ('categoryId')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {categories.map (category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="standard-select-rating"
            select
            label="Rating"
            className={classes.textField}
            value={this.state.rating}
            onChange={this.handleChange ('rating')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {ratings.map (option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submitButton}
          >
            {action}
          </Button>
        </form>
      </Dialog>
    );
  }
}

CheeseForm.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  cheese: cheeseType,
};

export default withStyles (styles) (CheeseForm);
