import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import PostCard from '../../components/PostCard';
import Loader4 from '../../layouts/Loader4';
import SideBar from '../../layouts/SideBar';
import Post from '../Post';
import userImg from '../../../assets/user_purple.png';
import { getPosts, postsReset } from '../../../redux/actions/Post Actions';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            allowRequest: 0,
        };
        this.pageBottomHandler = this.pageBottomHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {
        window.addEventListener('scroll', this.pageBottomHandler);
        this.props.getPosts(this.props.person._id);
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
            profilePic,
            firstName,
            lastName,
            email,
            gender,
            joinDtTime,
            nFollowers,
            nFollowing,
            nPosts,
            bio,
            tw,
            fb,
            ig,
        } = this.props.person;

        const showLoader = this.props.posts.showLoader ? <Loader4 /> : null;
        const postCards = this.props.posts.list.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
        });

        if (isEmpty(profilePic)) profilePic = userImg;
        gender = gender == 'None' ? '' : gender + ' | ';
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
                                            {gender}joined on {joinDtTime}
                                        </div>
                                        <div className='profile__user__subsection--2'>
                                            <a href={tw} className='profile__user__socialLink'>
                                                <i className='fab fa-twitter'></i>
                                            </a>
                                            <a href={fb} className='profile__user__socialLink'>
                                                <i className='fab fa-facebook'></i>
                                            </a>
                                            <a href={ig} className='profile__user__socialLink'>
                                                <i className='fab fa-instagram'></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='profile__user__bio'>{bio}</div>
                                </div>
                            </div>
                        </div>
                        <div className='postcard--wrapper'>{postCards}</div>
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
export default connect(mapStatesToProps, { getPosts, postsReset })(withRouter(UserProfile));
