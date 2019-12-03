import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { selectPost } from '../../../redux/actions/Post Actions';
import moreImg from '../../../assets/more-white.png';

class PostCard extends Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => this.props.selectPost(this.props.post);
    //==========================================================================
    render() {
        let { resources, desc, user, dtTime } = this.props.post;
        user = user[0];
        dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const resource = resources.length ? resources[0] : null;
        const description = isEmpty(desc) ? null : <div className="postcard__desc">{desc}</div>;

        const resourceOverlay =
            resources.length <= 1 ? null : (
                <div className="postcard__overlay">
                    <img src={moreImg} alt="more" />
                </div>
            );

        return (
            <div className="postcard" onClick={this.clickHandler}>
                <div className="postcard-user">
                    <div className="postcard-user__profilePic">
                        <img src={user.profilePic} alt="" />
                    </div>
                    <div className="postcard-user__text">
                        {user.firstName} {user.lastName}
                        <div>{dtTime}</div>
                    </div>
                </div>
                {description}
                <div className="postcard__imgsection">
                    <img src={resource} alt="" className="postcard__img" />
                    {resourceOverlay}
                </div>
            </div>
        );
    }
}
//==========================================================================
PostCard.propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    posts: state.posts,
    errors: state.errors,
});
//==========================================================================
export default connect(
    mapStatesToProps,
    { selectPost },
)(withRouter(PostCard));
