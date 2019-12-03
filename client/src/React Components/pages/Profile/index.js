import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import PostCard from '../../components/PostCard';
import Loader4 from '../../layouts/Loader4';
import SideBar from '../../layouts/SideBar';
import Post from '../../layouts/Post';
import userImg from '../../../assets/user_purple.png';
import { getPosts, postsReset } from '../../../redux/actions/Post Actions';
import {
    setFollowMode,
    getPersonFollowers,
    getPersonFollowings,
} from '../../../redux/actions/Person Actions';
import FollowBtn from '../../components/FollowBtn';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            allowRequest: 0,
        };
        this.pageBottomHandler = this.pageBottomHandler.bind(this);
        this.followersHandler = this.followersHandler.bind(this);
        this.followingHandler = this.followingHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {
        window.addEventListener('scroll', this.pageBottomHandler);
        this.props.getPosts(this.props.person._id);
    }
    //==========================================================================
    followersHandler = e => {
        e.preventDefault();
        this.props.setFollowMode('FOLLOWERS');
        this.props.getPersonFollowers(this.props.person._id);
        this.props.history.push('/follow');
    }
    //==========================================================================
    followingHandler = e => {
        e.preventDefault();
        this.props.setFollowMode('FOLLOWING');
        this.props.getPersonFollowings(this.props.person._id);
        this.props.history.push('/follow');
    }
    //==========================================================================
    pageBottomHandler = e => {
        const windowHeight =
            'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight,
        );
        const windowBottom = Math.round(windowHeight + window.pageYOffset);

        if (windowBottom >= docHeight && this.state.allowRequest) {
            this.props.getPosts(this.props.person._id);
            this.setState({ allowRequest: 0 });
        } else if (Math.abs(windowBottom - docHeight) > 500 && !this.state.allowRequest)
            this.setState({ allowRequest: 1 });
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;
        if (isEmpty(this.props.person._id)) return <Redirect to='/dashboard' />;

        let {
            _id,
            profilePic,
            firstName,
            lastName,
            email,
            joinDtTime,
            nFollowers,
            nFollowing,
            nPosts,
            bio,
            tw,
            fb,
            ig,
            isFollowed,
        } = this.props.person;

        const showLoader = this.props.posts.showLoader ? <Loader4 /> : null;
        const postCards = this.props.posts.list.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
        });

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
            <Fragment>
                <SideBar />
                <div className='profile--wrapper'>
                    <div className='profile'>
                        <div className='profile__header'>
                            <div className='profile__user'>
                                <div className='profile__user__profilePic'>
                                    <img src={profilePic} alt='profile Pic' />
                                </div>
                                <div className='profile__user__details'>
                                    <div className='profile__user__name'>
                                        {firstName} {lastName}
                                    </div>
                                    <div className='profile__user__email'>{email}</div>
                                    <div className='profile__user__subsection'>
                                        <div className='profile__user__subsection--1'>
                                            joined on {joinDtTime}
                                        </div>
                                        <div className='profile__user__subsection--2'>
                                            <Link to='/followers' onClick={this.followersHandler}>
                                                <div className='profile__user__stats'>
                                                    {nFollowers} Followers
                                                </div>
                                            </Link>
                                            <Link to='/following' onClick={this.followingHandler}>
                                                <div className='profile__user__stats'>
                                                    {nFollowing} Following
                                                </div>
                                            </Link>
                                            <div className='profile__user__stats'>
                                                {nPosts} Posts
                                            </div>
                                        </div>
                                        <div className='profile__user__subsection--3'>
                                            <a href={tw} className='profile__user__socialLink'>
                                                <i className='fab fa-twitter'></i>
                                            </a>
                                            <a href={fb} className='profile__user__socialLink'>
                                                <i className='fab fa-facebook'></i>
                                            </a>
                                            <a href={ig} className='profile__user__socialLink'>
                                                <i className='fab fa-instagram'></i>
                                            </a>
                                            <FollowBtn
                                                others='profile__followbtn'
                                                id={_id}
                                                isFollowed={isFollowed}
                                                disable={_id === this.props.user.id}
                                            />
                                        </div>
                                    </div>
                                    <div className='profile__user__bio'>{bio}</div>
                                </div>
                            </div>
                        </div>
                        <div className='postcard--wrapper mt-5 pt-5'>{postCards}</div>
                        {showLoader}
                    </div>
                </div>
                {!isEmpty(this.props.posts.activePost) ? <Post /> : null}
            </Fragment>
        );
    }
    //==========================================================================
    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageBottomHandler);
        this.props.postsReset();
    }
}
//==========================================================================
UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    posts: state.posts,
    person: state.person,
    errors: state.errors,
});
//==========================================================================
export default connect(mapStatesToProps, {
    getPosts,
    postsReset,
    setFollowMode,
    getPersonFollowers,
    getPersonFollowings,
})(withRouter(UserProfile));
