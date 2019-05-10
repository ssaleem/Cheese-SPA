import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CheckboxList from './CheckboxList';
import {addMenu, addCheesestoMenu} from '../../../api/menuApi';
import {getCheeses} from '../../../api/cheeseApi';

const styles = theme => ({
  container: {
    width: '70%',
    margin: 'auto',
    marginBottom: theme.spacing.unit * 3,
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

class MenuForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      cheeseIds: [],
      cheeses: [],
      error: null,
      open: true,
    };
  }

  componentDidMount () {
    getCheeses ().then (
      result => this.setState ({cheeses: result}),
      error => this.setState ({error})
    );
  }

  handleChange = name => event => {
    this.setState ({[name]: event.target.value});
  };

  handleClose = (updatedMenu = null) => {
    this.setState ({open: false});
    this.props.handleClose (updatedMenu);
  };

  handleSelectCheese = checked => this.setState ({cheeseIds: checked});

  handleSubmit = event => {
    event.preventDefault ();
    const menu = (({name}) => ({name})) (this.state);

    if (this.props.menu) {
      //   use put to update current cheese
      // addCheesetoMenu(this.props.menu.id, cheeseId)
      // .catch(errors => this.setState({error : errors}));
      // TODO: redirect to main page
    } else {
      //   use post to create new menu
      addMenu (menu)
        .then (newMenu => newMenu.id)
        .then (menuId => addCheesestoMenu (menuId, this.state.cheeseIds))
        .then (() => this.handleClose (true))
        .catch (errors => this.setState ({error: errors}));
    }
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
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange ('name')}
            margin="normal"
            error={this.state.error && Boolean (this.state.error['name'])}
            helperText={this.state.error ? this.state.error['name'] : ''}
          />
          <CheckboxList
            items={this.state.cheeses}
            onSelectCheese={this.handleSelectCheese}
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

MenuForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles (styles) (MenuForm);
