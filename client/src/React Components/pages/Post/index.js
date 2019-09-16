import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import {
    unSelectPost,
    getPostReactions,
    getPostComments,
} from '../../../redux/actions/Post Actions';
import like from '../../../assets/r_like.png';
import love from '../../../assets/r_love.png';
import haha from '../../../assets/r_haha.png';
import amazed from '../../../assets/r_amazed.png';
import sad from '../../../assets/r_sad.png';
import angry from '../../../assets/r_angry.png';

class Post extends Component {
    constructor() {
        super();
        this.state = { comment: '', mode: 'details' };
        this.reactionBottomHandler = this.reactionBottomHandler.bind(this);
        this.commentBottomHandler = this.commentBottomHandler.bind(this);
        this.detailsViewHandler = this.detailsViewHandler.bind(this);
        this.reactionsViewHandler = this.reactionsViewHandler.bind(this);
        this.commentsViewHandler = this.commentsViewHandler.bind(this);
        this.reactionHandler = this.reactionHandler.bind(this);
        this.commentChangeHandler = this.commentChangeHandler.bind(this);
        this.commentSubmitHandler = this.commentSubmitHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    reactionBottomHandler = e => {};
    //==========================================================================
    commentBottomHandler = e => {};
    //==========================================================================
    detailsViewHandler = e => this.setState({ mode: 'details' });
    //==========================================================================
    reactionsViewHandler = e => {
        this.props.getPostReactions(this.props.posts.activePost._id, this.props.posts.rxbPgCtr);
        this.setState({ mode: 'reactions' });
    };
    //==========================================================================
    commentsViewHandler = e => {
        this.props.getPostComments(this.props.posts.activePost._id, this.props.posts.cmtPgCtr);
        this.setState({ mode: 'comments' });
    };
    //==========================================================================
    reactionHandler = reaction => () => {};
    //==========================================================================
    commentChangeHandler = e => this.setState({ comment: e.target.innerText });
    //==========================================================================
    commentSubmitHandler = e => {};
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to="/login" />;

        if (isEmpty(this.props.posts.activePost)) return <Redirect to="/dashboard" />;

        let {
            resources,
            desc,
            dtTime,
            nReactions,
            nComments,
            user,
            rxnList,
            cmtList,
        } = this.props.posts.activePost;

        const description = isEmpty(desc) ? null : <div className="postDesc">{desc}</div>;
        user = user[0];
        dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const resourceCarouselItems = resources.map((resource, index) => {
            const active = index ? '' : ' active';
            const cls = 'carousel-item resCarousel' + active;
            return (
                <div
                    className={cls}
                    style={{
                        background: `url('${resource}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}></div>
            );
        });

        const resourceCarouselIndicators = resources.map((resource, index) => {
            const cls = index ? '' : 'active';
            return (
                <li data-target="#resourceCarousel" data-slide-to={`${index}`} className={cls}></li>
            );
        });

        /* const commentList = cmtList.map((comment, index) => {
            let {
                desc,
                dtTime,
                user,
            } = comment;
            return (
                <div className="comment">
                    <div className="comment__user">
                        <div className="comment__user__profilePic">
                            <img src={user.profilePic} alt="" />
                        </div>
                        <div className="comment__user__text">
                            {user.firstName} {user.lastName}
                            <div>{dtTime}</div>
                        </div>
                    </div>
                </div>
            );
        }); */

        /* const reactionList = rxnList.map((reaction, index) => (
            
        )); */

        const detailSection = (
            <section className="post__section">
                <div className="postUser">
                    <div className="postUser__profilePic">
                        <img src={user.profilePic} alt="" />
                    </div>
                    <div className="postUser__text">
                        {user.firstName} {user.lastName}
                        <div>{dtTime}</div>
                    </div>
                </div>
                {description}
                <div className="postSpecs">
                    <button className="postSpecs__btn" onClick={this.reactionsViewHandler}>
                        {nReactions} Reactions
                    </button>
                    <button className="postSpecs__btn" onClick={this.commentsViewHandler}>
                        {nComments} Comments
                    </button>
                </div>
                <div className="postReactions">
                    <img
                        src={like}
                        className="postReactions--item"
                        onClick={this.reactionHandler('like')}
                    />
                    <img
                        src={love}
                        className="postReactions--item"
                        onClick={this.reactionHandler('love')}
                    />
                    <img
                        src={haha}
                        className="postReactions--item"
                        onClick={this.reactionHandler('haha')}
                    />
                    <img
                        src={amazed}
                        className="postReactions--item"
                        onClick={this.reactionHandler('amazed')}
                    />
                    <img
                        src={sad}
                        className="postReactions--item"
                        onClick={this.reactionHandler('sad')}
                    />
                    <img
                        src={angry}
                        className="postReactions--item"
                        onClick={this.reactionHandler('angry')}
                    />
                </div>
                <div className="postComment">
                    <button className="commentSend" onKeyUp={this.commentSubmitHandler}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                    <div
                        contentEditable="true"
                        onKeyUp={this.commentChangeHandler}
                        className="postComment--text"></div>
                </div>
            </section>
        );

        const reactionSection = (
            <section className="post__section">
                <div className="post-group">
                    <button className="post__backBtn" onClick={this.detailsViewHandler}>
                        <i className="fas fa-arrow-circle-left"></i>
                    </button>
                    <div className="post__section__heading">Reactions:</div>
                </div>
                {/* <div className="post__section__list">{reactionList}</div> */}
            </section>
        );

        const commentSection = (
            <section className="post__section">
                <div className="post-group">
                    <button className="post__backBtn" onClick={this.detailsViewHandler}>
                        <i className="fas fa-arrow-circle-left"></i>
                    </button>
                    <div className="post__section__heading">Comments:</div>
                </div>
                {/* <div className="post__section__list">{commentList}</div> */}
            </section>
        );

        let visibleSection = null;
        if (this.state.mode === 'reactions') visibleSection = reactionSection;
        else if (this.state.mode === 'comments') visibleSection = commentSection;
        else visibleSection = detailSection;

        return (
            <div className="post__wrapper">
                <div className="post">
                    <section className="post__resourceSection">
                        <div id="resourceCarousel" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">{resourceCarouselIndicators}</ol>
                            <div className="carousel-inner">{resourceCarouselItems}</div>
                            <a
                                className="carousel-control-prev"
                                href="#resourceCarousel"
                                role="button"
                                data-slide="prev">
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#resourceCarousel"
                                role="button"
                                data-slide="next">
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </section>
                    {visibleSection}
                </div>
                <button className="post__closeBtn" onClick={this.props.unSelectPost}>
                    <i className="fas fa-times-circle"></i>
                </button>
            </div>
        );
    }
}
//==========================================================================
Post.propTypes = {
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
    { unSelectPost, getPostReactions, getPostComments },
)(withRouter(Post));
