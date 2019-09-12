import React, { Component } from 'react';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import setAuthToken from '../../../utils/setAuthToken';
import { googleLogin } from '../../../redux/actions/Auth Actions';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            uploadURLs: [
                'https://i.pinimg.com/236x/8f/20/30/8f2030245aa0c71a86bc47362f5ef79c.jpg',
                'https://i.pinimg.com/564x/bb/79/97/bb79976c5db7a5d0b89398f19711e6fb.jpg',
                'https://i.pinimg.com/236x/ab/84/a9/ab84a992a2b9bb55d9b0d02b6b241833.jpg',
                'https://i.pinimg.com/originals/1e/90/65/1e9065ad5287cc70dad6f5cc52d8e57c.gif',
                'https://i.pinimg.com/564x/bb/42/28/bb4228b856d20a90f9c019cfb0117ef5.jpg',
                'https://i.pinimg.com/564x/87/c8/38/87c838bdb18ef5c1c4d3f8bcbc736299.jpg',
                'https://i.pinimg.com/564x/b4/c1/a0/b4c1a015fa63f1913cd7eb659fd758c1.jpg',
            ],
        };
    }

    componentDidMount() {
        const { token } = queryString.parse(this.props.location.search);
        if (token) {
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            this.props.googleLogin(decoded);
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return <div className="home">Hello</div>;
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
