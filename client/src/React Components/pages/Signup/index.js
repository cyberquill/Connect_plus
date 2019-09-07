import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../../components/FormGroup';
import { createUser } from '../../../redux/actions/Auth Actions';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            gender: '',
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
        const { errors, ...newUser } = this.state;
        this.props.createUser(newUser, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        if (!isEmpty(this.props.auth)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { firstName, lastName, email, password, password2, errors } = this.state;
        return (
            <div className="signup__back">
                <div className="signup">
                    <div className="signup__display">Signup to Continue!</div>
                    <div className="signup__card">
                        <form noValidate className="signup__card__form" onSubmit={this.onSubmit}>
                            <FormGroup
                                name="firstName"
                                type="text"
                                thumb="fas fa-user-alt"
                                placeholder="First-Name"
                                value={firstName}
                                onChange={this.onChange}
                                error={errors.firstName}
                            />

                            <FormGroup
                                name="lastName"
                                type="text"
                                thumb="fas fa-user-alt"
                                placeholder="Last-Name"
                                value={lastName}
                                onChange={this.onChange}
                                error={errors.lastName}
                            />

                            <FormGroup
                                name="email"
                                type="email"
                                thumb="fas fa-envelope"
                                placeholder="E-mail"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                            />

                            <FormGroup
                                name="password"
                                type="password"
                                thumb="fas fa-lock"
                                placeholder="Password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                            />

                            <FormGroup
                                name="password2"
                                type="password"
                                thumb="fas fa-unlock-alt"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />

                            <div className="signup__card__form--radio">
                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        onChange={this.onChange}
                                    />
                                    <label htmlFor="male" className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Male
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        onChange={this.onChange}
                                    />
                                    <label htmlFor="female" className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Female
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="other"
                                        name="gender"
                                        value="Other"
                                        onChange={this.onChange}
                                    />
                                    <label htmlFor="other" className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Other
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="other"
                                        name="gender"
                                        value="None"
                                        onChange={this.onChange}
                                    />
                                    <label htmlFor="other" className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Rather not say
                                    </label>
                                </div>

                                <div
                                    className={classnames('', {
                                        'form-radioGroup--invalid': errors.gender,
                                    })}>
                                    {errors.gender}
                                </div>
                            </div>

                            <input type="submit" value="Sign Up!" className="elbtn__type2" />
                            <input type="hidden" name="_gotcha" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createUser },
)(withRouter(Signup));
