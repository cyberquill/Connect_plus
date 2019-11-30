import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authTokenPresent from '../../../utils/authTokenPresent';
import isEmpty from '../../../validation/isEmpty';
import AuthWrapper from '../../components/AuthWrapper';
import FormGroup from '../../components/FormGroup';
import { loginUser } from '../../../redux/actions/User Actions';
import userImg from '../../../assets/user_purple.png';
import setAuthToken from '../../../utils/setAuthToken';
import Logo from '../../components/Logo';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: { user: {} },
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
        const token = authTokenPresent();
        if (token) {
            setAuthToken(token);
            return <Redirect to='/dashboard' />;
        }

        if (!isEmpty(this.props.user)) {
            return <Redirect to='/dashboard' />;
        }

        const googleURL =
            process.env.NODE_ENV === 'production'
                ? 'https://connect-plus.herokuapp.com/auth/google'
                : 'http://localhost:8000/auth/google';

        const { email, password } = this.state;
        const errors = this.state.errors.user;
        return (
            <AuthWrapper>
                <form noValidate className='auth__card__form' onSubmit={this.onSubmit}>
                    <div className='login__userimg rounded-circle'>
                        <img src={userImg} alt='' className='login__userimg--img' />
                    </div>
                    <Logo others='login__logo' />
                    <FormGroup
                        name='email'
                        type='email'
                        thumb='fas fa-envelope'
                        placeholder='E-mail'
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                        others='px-3'
                    />

                    <FormGroup
                        name='password'
                        type='password'
                        thumb='fas fa-lock'
                        placeholder='Password'
                        value={password}
                        onChange={this.onChange}
                        error={errors.password}
                        others='px-3 mb-5'
                    />
                    <input type='hidden' name='_gotcha' />
                    <button href='#' className='form__submitBtn'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sign In!
                    </button>
                    <div className='auth-rule'>
                        <span></span>
                        <span>OR</span>
                        <span></span>
                    </div>
                    <a href={googleURL}>
                        <button type='button' class='google-button'>
                            <span class='google-button__icon'>
                                <svg viewBox='0 0 366 372' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z'
                                        id='Shape'
                                        fill='#EA4335'
                                    />
                                    <path
                                        d='M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z'
                                        id='Shape'
                                        fill='#FBBC05'
                                    />
                                    <path
                                        d='M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z'
                                        id='Shape'
                                        fill='#4285F4'
                                    />
                                    <path
                                        d='M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z'
                                        fill='#34A853'
                                    />
                                </svg>
                            </span>
                            <span class='google-button__text'>Sign-in with Google</span>
                        </button>
                    </a>
                </form>
            </AuthWrapper>
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
export default connect(mapStatesToProps, { loginUser })(withRouter(Login));
