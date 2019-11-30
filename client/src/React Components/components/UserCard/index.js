import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import userImg from '../../../assets/user_purple.png';
import { setPerson } from '../../../redux/actions/Person Actions';
import FollowBtn from '../FollowBtn';

class UserCard extends Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => this.props.setPerson(this.props.user._id, this.props.history);
    //==========================================================================
    render() {
        let {
            _id,
            profilePic,
            firstName,
            lastName,
            email,
            gender,
            joinDtTime,
            nFollowers,
            nFollowing,
            nPosts,
            tw,
            fb,
            ig,
            isFollowed,
        } = this.props.user;

        if (isEmpty(profilePic)) profilePic = userImg;
        joinDtTime = new Date(joinDtTime).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });

        return (
            <div className='usercard' onClick={this.clickHandler}>
                <div className='usercard__profilePic'>
                    <img src={profilePic} alt='profile Pic' />
                </div>

                <div className='usercard__name'>
                    {firstName} {lastName}
                </div>
                <div className='usercard__email'>{email}</div>
                <div className='usercard__section--1'>
                    <a href={tw} className='usercard__socialLink'>
                        <i className='fab fa-twitter'></i>
                    </a>
                    <a href={fb} className='usercard__socialLink'>
                        <i className='fab fa-facebook'></i>
                    </a>
                    <a href={ig} className='usercard__socialLink'>
                        <i className='fab fa-instagram'></i>
                    </a>
                </div>
                <div className='usercard__section--2'>
                    <div className='usercard__stats'>
                        {nFollowers}
                        <br />
                        Followers
                    </div>
                    <div className='usercard__stats'>
                        {nFollowing}
                        <br />
                        Following
                    </div>
                    <div className='usercard__stats'>
                        {nPosts}
                        <br />
                        Posts
                    </div>
                </div>
                <FollowBtn
                    others='usercard__followbtn'
                    id={_id}
                    isFollowed={isFollowed}
                    disable={_id === this.props.loginUser.id}
                />
            </div>
        );
    }
}
//==========================================================================
UserCard.propTypes = {
    loginUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    loginUser: state.user,
    errors: state.errors,
});
//==========================================================================
export default connect(mapStatesToProps, { setPerson })(withRouter(UserCard));
