import React from 'react';
import PropTypes from 'prop-types';
import { cheeseType } from '../../../api/resourcesShape';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
  label: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } 
    else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
    this.props.onSelectCheese(newChecked);
  };

  render() {
    const { classes, items } = this.props;
    return (
      <>
      <InputLabel htmlFor="cheese-list" className={classes.label}>Add Cheese/s</InputLabel>
      <List className={classes.root} id="cheese-list" dense>
        {items.map(item => (
          <ListItem key={item.id} role={undefined} dense button onClick={this.handleToggle(item.id)}>
            <Checkbox
              checked={this.state.checked.indexOf(item.id) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      </>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(cheeseType).isRequired,
};

export default withStyles(styles)(CheckboxList);
