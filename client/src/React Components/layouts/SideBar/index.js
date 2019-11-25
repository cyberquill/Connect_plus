import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import userImg from '../../../assets/user_purple.png';

class SideBar extends Component {
    constructor() {
        super();
        this.state = {};
        this.pageBottomHandler = this.pageBottomHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    pageBottomHandler = e => {};
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) 
            return <Redirect to="/login" />;

        let { profilePic, firstName, lastName, email } = this.props.user;
        if(isEmpty(profilePic)) profilePic = userImg;

        return (
            <div className="sidebar__wrapper">
                <div className="sidebar">
                    <div className="user">
                        <div className="user__profilePic">
                            <img src={profilePic} alt="" />
                        </div>
                        <div className="user__text">
                            {firstName} {lastName}
                            <div>{email}</div>
                        </div>
                    </div>
                    <Link to='/createpost'>
                        <div className="sidebar__link">Add Post</div>
                    </Link>
                </div>
            </div>
        );
    }
}
//==========================================================================
SideBar.propTypes = {
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
    {},
)(withRouter(SideBar));
