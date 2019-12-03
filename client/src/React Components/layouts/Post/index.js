import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import {
    unSelectPost,
    getPostViews,
    getPostReactions,
    getPostComments,
    setPostReaction,
    setPostComment,
    postsReset,
    postViewsReset,
    postReactionsReset,
    postCommentsReset,
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
        this.commentDiv = React.createRef();
        this.viewsBottomHandler = this.viewsBottomHandler.bind(this);
        this.reactionsBottomHandler = this.reactionsBottomHandler.bind(this);
        this.commentsBottomHandler = this.commentsBottomHandler.bind(this);
        this.detailsViewHandler = this.detailsViewHandler.bind(this);
        this.viewsViewHandler = this.viewsViewHandler.bind(this);
        this.reactionsViewHandler = this.reactionsViewHandler.bind(this);
        this.reactionSubmitHandler = this.reactionSubmitHandler.bind(this);
        this.commentsViewHandler = this.commentsViewHandler.bind(this);
        this.commentChangeHandler = this.commentChangeHandler.bind(this);
        this.commentSubmitHandler = this.commentSubmitHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    detailsViewHandler = e => this.setState({ mode: 'details' });
    //==========================================================================
    viewsViewHandler = e => {
        this.props.postViewsReset();
        this.props.getPostViews(this.props.posts.activePost._id, this.props.posts.viwPgCtr);
        this.setState({ mode: 'views' });
    };
    //==========================================================================
    reactionsViewHandler = e => {
        this.props.postReactionsReset();
        this.props.getPostReactions(this.props.posts.activePost._id, this.props.posts.rxnPgCtr);
        this.setState({ mode: 'reactions' });
    };
    //==========================================================================
    commentsViewHandler = e => {
        this.props.postCommentsReset();
        this.props.getPostComments(this.props.posts.activePost._id, this.props.posts.cmtPgCtr);
        this.setState({ mode: 'comments' });
    };
    //==========================================================================
    viewsBottomHandler = e => {};
    //==========================================================================
    reactionsBottomHandler = e => {};
    //==========================================================================
    commentsBottomHandler = e => {};
    //==========================================================================
    reactionSubmitHandler = reaction => () => {
        this.props.setPostReaction(this.props.posts.activePost._id, reaction);
    };
    //==========================================================================
    commentSubmitHandler = e => {
        console.log('pressed!');
        const comment = { text: this.state.comment };
        this.props.setPostComment(this.props.posts.activePost._id, comment);
        this.commentDiv.current.innerText = '';
    };
    //==========================================================================
    commentChangeHandler = e => this.setState({ comment: e.target.innerText });
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;

        if (isEmpty(this.props.posts.activePost)) return <Redirect to='/dashboard' />;

        let {
            resources,
            desc,
            dtTime,
            nViews,
            nReactions,
            nComments,
            user,
            viwList,
            rxnList,
            cmtList,
        } = this.props.posts.activePost;

        const description = isEmpty(desc) ? null : <div className='postDesc'>{desc}</div>;
        user = user[0];
        dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const resourceCarouselItems = resources.map((resource, index) => {
            const active = index ? '' : ' active';
            const cls = 'carousel-item resCarouselItm' + active;
            return (
                <div
                    className={cls}
                    style={{
                        background: `url('${resource}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    &nbsp;
                </div>
            );
        });

        const resourceCarouselIndicators = resources.map((resource, index) => {
            const cls = index ? '' : 'active';
            return (
                <li data-target='#resourceCarousel' data-slide-to={`${index}`} className={cls}></li>
            );
        });

        const viewList = isEmpty(viwList)
            ? null
            : viwList.map((view, index) => {
                  let { dtTime, user } = view;
                  user = user[0];
                  dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
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
                      <div className='postList__item' key={index}>
                          <div className='postList__item__user'>
                              <div className='postList__item__profilePic'>
                                  <img src={user.profilePic} alt='' />
                              </div>
                              <div className='postList__item__text'>
                                  {user.firstName} {user.lastName}
                                  <div>{dtTime}</div>
                              </div>
                          </div>
                      </div>
                  );
              });

        const reactionList = isEmpty(rxnList)
            ? null
            : rxnList.map((reaction, index) => {
                  let { dtTime, user, type } = reaction;
                  user = user[0];
                  dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: true,
                  });
                  if (type === 'like') type = like;
                  else if (type === 'love') type = love;
                  else if (type === 'haha') type = haha;
                  else if (type === 'amazed') type = amazed;
                  else if (type === 'sad') type = sad;
                  else if (type === 'angry') type = angry;

                  return (
                      <div className='postList__item' key={index}>
                          <div className='postList__item__user'>
                              <div className='postList__item__profilePic'>
                                  <img src={user.profilePic} alt='' />
                              </div>
                              <div className='postList__item__text'>
                                  {user.firstName} {user.lastName}
                                  <div>{dtTime}</div>
                              </div>
                              <img
                                  src={type}
                                  className='postList__item__reaction'
                                  onClick={this.reactionSubmitHandler('love')}
                              />
                          </div>
                      </div>
                  );
              });

        const commentList = isEmpty(cmtList)
            ? null
            : cmtList.map((comment, index) => {
                  let { text, dtTime, user } = comment;
                  user = user[0];
                  dtTime = new Date(dtTime).toLocaleDateString('en-UK', {
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
                      <div className='postList__item' key={index}>
                          <div className='postList__item__user'>
                              <div className='postList__item__profilePic'>
                                  <img src={user.profilePic} alt='' />
                              </div>
                              <div className='postList__item__text'>
                                  {user.firstName} {user.lastName}
                                  <div>{dtTime}</div>
                              </div>
                          </div>
                          <div className='postList__item__comment'>{text}</div>
                      </div>
                  );
              });

        const resourceSection = isEmpty(resources) ? null : (
            <section className='post__resourceSection'>
                <div id='resourceCarousel' className='carousel slide' data-ride='carousel'>
                    <ol className='carousel-indicators'>{resourceCarouselIndicators}</ol>
                    <div className='carousel-inner'>{resourceCarouselItems}</div>
                    <a
                        className='carousel-control-prev'
                        href='#resourceCarousel'
                        role='button'
                        data-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Previous</span>
                    </a>
                    <a
                        className='carousel-control-next'
                        href='#resourceCarousel'
                        role='button'
                        data-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Next</span>
                    </a>
                </div>
            </section>
        );

        const detailSection = (
            <section className='post__section'>
                <div className='postUser'>
                    <div className='postUser__profilePic'>
                        <img src={user.profilePic} alt='' />
                    </div>
                    <div className='postUser__text'>
                        {user.firstName} {user.lastName}
                        <div>{dtTime}</div>
                    </div>
                </div>
                {description}
                <div className='postSpecs'>
                    <button className='postSpecs__btn' onClick={this.viewsViewHandler}>
                        {nViews} Views
                    </button>
                    <button className='postSpecs__btn' onClick={this.reactionsViewHandler}>
                        {nReactions} Reactions
                    </button>
                    <button className='postSpecs__btn' onClick={this.commentsViewHandler}>
                        {nComments} Comments
                    </button>
                </div>
                <div className='postReactions'>
                    <img
                        src={like}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('like')}
                    />
                    <img
                        src={love}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('love')}
                    />
                    <img
                        src={haha}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('haha')}
                    />
                    <img
                        src={amazed}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('amazed')}
                    />
                    <img
                        src={sad}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('sad')}
                    />
                    <img
                        src={angry}
                        className='postReactions--item'
                        onClick={this.reactionSubmitHandler('angry')}
                    />
                </div>
                <div className='postComment'>
                    <button className='commentSend' onClick={this.commentSubmitHandler}>
                        <i className='fas fa-paper-plane'></i>
                    </button>
                    <div
                        contentEditable='true'
                        onKeyUp={this.commentChangeHandler}
                        className='postComment--text'
                        ref={this.commentDiv}></div>
                </div>
            </section>
        );

        const viewSection = (
            <section className='post__section'>
                <div className='post-group'>
                    <button className='post__backBtn' onClick={this.detailsViewHandler}>
                        <i className='fas fa-arrow-circle-left'></i>
                    </button>
                    <div className='post__section__heading'>Views:</div>
                </div>
                <div className='postList'>{viewList}</div>
            </section>
        );

        const reactionSection = (
            <section className='post__section'>
                <div className='post-group'>
                    <button className='post__backBtn' onClick={this.detailsViewHandler}>
                        <i className='fas fa-arrow-circle-left'></i>
                    </button>
                    <div className='post__section__heading'>Reactions:</div>
                </div>
                <div className='postList'>{reactionList}</div>
            </section>
        );

        const commentSection = (
            <section className='post__section'>
                <div className='post-group'>
                    <button className='post__backBtn' onClick={this.detailsViewHandler}>
                        <i className='fas fa-arrow-circle-left'></i>
                    </button>
                    <div className='post__section__heading'>Comments:</div>
                </div>
                <div className='postList'>{commentList}</div>
            </section>
        );

        let visibleSection = null;
        if (this.state.mode === 'views') visibleSection = viewSection;
        else if (this.state.mode === 'reactions') visibleSection = reactionSection;
        else if (this.state.mode === 'comments') visibleSection = commentSection;
        else visibleSection = detailSection;

        return (
            <div className='post__wrapper'>
                <div className='post'>
                    {resourceSection}
                    {visibleSection}
                </div>
                <div className='post__closeBtn' onClick={this.props.unSelectPost}>
                    &times;
                </div>
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
export default connect(mapStatesToProps, {
    unSelectPost,
    getPostViews,
    getPostReactions,
    getPostComments,
    setPostReaction,
    setPostComment,
    postsReset,
    postViewsReset,
    postReactionsReset,
    postCommentsReset,
})(withRouter(Post));
