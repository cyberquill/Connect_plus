import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import authTokenPresent from '../../../utils/authTokenPresent';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../../components/FormGroup';
import { loginUser } from '../../../redux/actions/Auth Actions';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });
    }
    //==========================================================================
    onSubmit = e => {
        e.preventDefault();
        const { errors, ...user } = this.state;
        this.props.loginUser(user, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        if (authTokenPresent() || !isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { email, password, errors } = this.state;
        return (
            <div className="login__back">
                <div className="login">
                    <div className="login__display">Login to Continue!</div>
                    <div className="login__card">
                        <form
                            noValidate
                            className="login__card__form"
                            onSubmit={this.onSubmit}>
                            <div className="login__card__form__heading">
                                Login
                            </div>

                            <FormGroup
                                name="email"
                                type="email"
                                thumb="fas fa-envelope"
                                placeholder="E-mail"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                                others="mt-4"
                            />

                            <FormGroup
                                name="password"
                                type="password"
                                thumb="fas fa-lock"
                                placeholder="Password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                                others="mt-4"
                            />

                            <input
                                type="submit"
                                value="Log In!"
                                className="elbtn__type2"
                            />

                            <input type="hidden" name="_gotcha" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    errors: state.errors,
});
//==========================================================================
export default connect(
    mapStatesToProps,
    { loginUser },
)(withRouter(Login));
