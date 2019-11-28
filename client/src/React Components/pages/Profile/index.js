import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { getPosts } from '../../../redux/actions/Post Actions';
import PostCard from '../../components/PostCard';
import Loader4 from '../../layouts/Loader4';
import SideBar from '../../layouts/SideBar';
import Post from '../Post';
import userImg from '../../../assets/user_purple.png';
import authTokenPresent from '../../../utils/authTokenPresent';

class UserProfile extends Component {
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
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;
        if (isEmpty(this.props.person)) return <Redirect to='/dashboard' />;

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
                                    <div className='profile__user__bio'>
                                        {bio} Lorem ipsum, dolor sit amet consectetur adipisicing
                                        elit. Sed voluptatibus iste voluptate asperiores error quam
                                        commodi quidem quia enim fugiat ratione, adipisci ea facilis
                                        nihil doloribus! Distinctio ut magni cum quo molestiae quis
                                        voluptatum consectetur cumque. Fuga sunt incidunt eveniet,
                                        et quod consectetur asperiores voluptate iusto nam tempore
                                        nesciunt architecto.{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile__posts'></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
//==========================================================================
UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    person: state.person,
    errors: state.errors,
});
//==========================================================================
export default connect(mapStatesToProps, { getPosts })(withRouter(UserProfile));
