import React from 'react';
import PropTypes from 'prop-types';
import { cheeseType } from '../../../api/resourcesShape';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 'auto',
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
    marginBottom: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 4,
  },
  title: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
    marginBottom: theme.spacing.unit,
  }
});

function CheeseTable(props) {
  const { classes, cheeses, onDelete, onEdit } = props;

  return (
    <>
      <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Cheeses
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Category</TableCell>
            <TableCell align="center">Rating</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {cheeses.length === 0 ? 
              
          <TableRow key={0}>
            <TableCell colSpan={4}>
              <Typography variant="subtitle1" color="secondary" className={classes.title}>
                No Cheeses to display
              </Typography>
            </TableCell>
          </TableRow> :
              
          cheeses.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="center">{item.category.name}</TableCell>
              <TableCell align="center">{item.rating}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Edit" onClick={() => onEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete" onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
            
        </TableBody>
      </Table>
    </Paper>
    </>
  );
}

CheeseTable.propTypes = {
  classes: PropTypes.object.isRequired,
  cheeses: PropTypes.arrayOf(cheeseType).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default withStyles(styles)(CheeseTable);
