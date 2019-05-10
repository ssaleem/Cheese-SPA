import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addCategory} from '../../../api/categoryApi';

const styles = () => ({
  container: {
    width: '70%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '10px auto',
    width: '90%',
  },
  submitButton: {
    margin: '20px auto',
    width: '90%',
  },
});

class CategoryForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      error: null,
      open: true,
    };
  }

  handleChange = name => event => {
    this.setState ({[name]: event.target.value});
  };

  handleClose = (updatedCategory = null) => {
    this.setState ({open: false});
    this.props.handleClose (updatedCategory);
  };

  handleSubmit = event => {
    event.preventDefault ();
    const category = (({name}) => ({name})) (this.state);

    addCategory (category)
      .then (() => this.handleClose (true))
      .catch (errors => this.setState ({error: errors}));
  };

  render () {
    const {classes, action} = this.props;

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

CategoryForm.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles (styles) (CategoryForm);
