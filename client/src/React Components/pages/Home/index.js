import React, { Component } from 'react';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Logo from '../../components/Logo';
import setAuthToken from '../../../utils/setAuthToken';
import { googleLogin } from '../../../redux/actions/User Actions';

class Home extends Component {
    constructor() {
        super();
    }
    //==========================================================================
    componentDidMount() {
        const { token } = queryString.parse(this.props.location.search);
        if (token) {
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            this.props.googleLogin(decoded, this.props.history);
        }
    }
    //==========================================================================
    render() {
        return (
            <div className='home__wrapper'>
                <div className='home'>
                    <div className='home__nav'>
                        <Link to='/'>
                            <span className='home__nav__link'>About Us</span>
                        </Link>
                        <Link to='/signup'>
                            <span className='home__nav__link'>SignUp</span>
                        </Link>
                        <Link to='/login'>
                            <span className='home__nav__link'>LogIn</span>
                        </Link>
                    </div>
                    <Logo others='home__logo' />
                    <div className='home__heading'>
                        Connect <sup>+</sup>
                    </div>
                    <div className='home__desc'>
                        It's not just a social-network, It's an Adventure!
                    </div>
                    <Link to='/signup'>
                        <button className='home__btn'>Explore!</button>
                    </Link>
                </div>
            </div>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { googleLogin },
)(withRouter(Home));
