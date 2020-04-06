import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from'./Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
    }

    render() {
        return (
            <Auxiliary>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" ref={this.inputElementRef} onChange={this.props.changed} value={this.props.name} />
            </Auxiliary>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default WithClass(Person, classes.Person);