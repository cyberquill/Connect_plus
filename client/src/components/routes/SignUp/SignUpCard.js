import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../../redux/actions/Auth Actions';
import FormGroup from '../../layout/formGroup';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors)
            this.setState({ errors: newProps.errors });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, password2 } = this.state;

        const newUser = {
            name,
            email,
            password,
            password2,
        };

        this.props.createUser(newUser, this.props.history);

    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, email, password, password2, errors } = this.state;
        return (
            <div className="signup__card">
                <div className="signup__card__pic">
                    <i className="zmdi zmdi-landscape" />
                </div>
                <form
                    noValidate
                    className="signup__card__form"
                    onSubmit={this.onSubmit}>

                    <FormGroup
                        name="name"
                        type="text"
                        thumb="fas fa-user-alt"
                        placeholder="Name"
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                        others="mt-5"
                    />
                    <FormGroup
                        name="email"
                        type="email"
                        thumb="fas fa-envelope"
                        placeholder="E-mail"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                        others="mt-5"
                    />
                    <FormGroup
                        name="password"
                        type="password"
                        thumb="fas fa-lock"
                        placeholder="Password"
                        value={password}
                        onChange={this.onChange}
                        error={errors.password}
                        others="mt-5"
                    />
                    <FormGroup
                        name="password2"
                        type="password"
                        thumb="fas fa-unlock-alt"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={this.onChange}
                        error={errors.password2}
                        others="mt-5 mb-3"
                    />

                    <input type="hidden" name="_gotcha" />

                    <button className="signup__card__btn">Sign Up!</button>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createUser })(withRouter(SignUp));
