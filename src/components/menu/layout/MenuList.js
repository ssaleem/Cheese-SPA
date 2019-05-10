import React from 'react';
import PropTypes from 'prop-types';
import {menuType} from '../../../api/resourcesShape';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
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
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 4,
  },
  nomenu: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
  },
  expansion: {
    flexDirection: 'column',
  },
});

class MenuList extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState ({
      expanded: expanded ? panel : false,
    });
  };

  render () {
    const {classes, menus} = this.props;
    const {expanded} = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Menus
        </Typography>
        {menus.length === 0
          ? <Paper>
              <Typography
                variant="subtitle1"
                color="secondary"
                className={classes.nomenu}
              >
                No Menus to display
              </Typography>
            </Paper>
          : menus.map (item => (
              <ExpansionPanel
                key={item.id}
                expanded={expanded === item.id}
                onChange={this.handleChange (item.id)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{item.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansion}>
                  <Typography variant="subtitle1" align="center">
                    Cheeses
                  </Typography>
                  <List className={classes.list}>
                    {item.cheeses.map ((cheese, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={cheese.name}
                          secondary={cheese.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
      </div>
    );
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  menus: PropTypes.arrayOf (menuType).isRequired,
};

export default withStyles (styles) (MenuList);
