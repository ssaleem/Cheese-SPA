import React from 'react';
import PropTypes from 'prop-types';
import CheeseTable from './layout/CheeseTable';
import CheeseForm from './layout/CheeseForm';
import { getCheeses, deleteCheese } from '../../api/cheeseApi';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 12,
    display: 'block'
  },
});

class Cheese extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        toEditForm: false,
        cheeseToEdit: null
      };
    }
  
    componentDidMount() {
      getCheeses()
      .then(
          (result) => {
          // console.log(result);
          this.setState({
              isLoaded: true,
              items: result
          });
          },
          (error) => {
          this.setState({
              isLoaded: true,
              error
          });
          }
      );
    }

  handleDelete = cheeseId =>
    deleteCheese(cheeseId)
      .then(() => this.setState(prevState => {
        return {items: prevState.items.filter(item => item.id !== cheeseId)};
      }));

  showEdit = cheese => this.setState({
    toEditForm: true,
    cheeseToEdit: cheese
  });

  hideEdit = updatedCheese => {
    if(updatedCheese) {
      const index = this.state.items.findIndex(item => item.id === updatedCheese.id);
      this.setState(prevState => {
        let cheeses = [...prevState.items];
        cheeses[index] = updatedCheese;
        return {items: cheeses};
      });
    }
    this.setState({
      toEditForm: false,
      cheeseToEdit: null
    });
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, items, toEditForm, cheeseToEdit } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <CircularProgress size={80} className={classes.progress}/>
    } 
    else {
      return (
        <>    
        <CheeseTable 
          cheeses={items} 
          onDelete={this.handleDelete}
          onEdit={this.showEdit}/>
        
        {toEditForm && <CheeseForm handleClose={this.hideEdit} cheese={cheeseToEdit} action="Update Cheese"/>}
        </>
      );
    }
  }
}
  
Cheese.prototypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Cheese);