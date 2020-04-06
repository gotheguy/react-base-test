import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("App running..");
  }

  state = ({
    persons: [
      { id: 1, name: 'Gonzalo', age: 29 },
      { id: 2, name: 'German', age: 29 },
      { id: 3, name: 'Nacho', age: 27 }
    ],
    otherState: 'some other value',
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  });

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  componentDidMount() { }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter+1
      }
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
          <Persons persons={this.state.persons}
                   clicked={this.deletePersonHandler}
                   changed={this.nameChangedHandler}
                   isAuthenticated= {this.state.authenticated} />
      );
    }

    return (
      <Auxiliary classes={classes.App}>
        <AuthContext.Provider 
          value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler
          }}>
          <Cockpit 
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            togglePersonsHandler={this.togglePersonsHandler} />
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default WithClass(App, classes.App);