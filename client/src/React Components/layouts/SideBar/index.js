import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import userImg from '../../../assets/user_purple.png';
import { logoutUser } from '../../../redux/actions/User Actions';
import { setPerson } from '../../../redux/actions/Person Actions';

class SideBar extends Component {
    constructor() {
        super();
        this.state = {};
        this.addPostLinkHandler = this.addPostLinkHandler.bind(this);
        this.userProfileLinkHandler = this.userProfileLinkHandler.bind(this);
        this.settingsLinkHandler = this.settingsLinkHandler.bind(this);
        this.logoutLinkHandler = this.logoutLinkHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    addPostLinkHandler = e => this.props.history.push('/createpost');
    //==========================================================================
    userProfileLinkHandler = e => this.props.setPerson(this.props.user.id, this.props.history);
    //==========================================================================
    settingsLinkHandler = e => this.props.history.push('/settings');
    //==========================================================================
    logoutLinkHandler = e => this.props.logoutUser(this.props.history);
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;

        let {
            profilePic,
            firstName,
            lastName,
            email,
            nFollowers,
            nFollowing,
            nPosts,
        } = this.props.user;
        if (isEmpty(profilePic)) profilePic = userImg;

        return (
            <Fragment>
                <input type='checkbox' className='sidebar__chkbx' id='sidebar-toggle' />
                <label htmlFor='sidebar-toggle' className='sidebar__btn'>
                    <span className='sidebar__icon'>&nbsp;</span>
                </label>
                <div className='sidebar__wrapper'>
                    <div className='sidebar'>
                        <div className='user'>
                            <div className='user__profilePic'>
                                <img src={profilePic} alt='' />
                            </div>
                            <div className='user__text'>
                                {firstName} {lastName}
                                <div>{email}</div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Followers:</td>
                                            <td>{nFollowers}</td>
                                        </tr>
                                        <tr>
                                            <td>Following:</td>
                                            <td>{nFollowing}</td>
                                        </tr>
                                        <tr>
                                            <td>Posts:</td>
                                            <td>{nPosts}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='sidebar__link' onClick={this.userProfileLinkHandler}>
                            User Profile
                        </div>
                        <div className='sidebar__link' onClick={this.addPostLinkHandler}>
                            Add Post
                        </div>
                        <div className='sidebar__link' onClick={this.settingsLinkHandler}>
                            Settings
                        </div>
                        <div className='sidebar__link' onClick={this.logoutLinkHandler}>
                            Logout
                        </div>
                    </div>
                </div>
            </Fragment>
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
export default connect(mapStatesToProps, { logoutUser, setPerson })(withRouter(SideBar));
