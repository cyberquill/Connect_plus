import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { getFeedPosts, postsReset } from '../../../redux/actions/Post Actions';
import PostCard from '../../components/PostCard';
import Loader4 from '../../layouts/Loader4';
import SideBar from '../../layouts/SideBar';
import Post from '../../layouts/Post';
import authTokenPresent from '../../../utils/authTokenPresent';
import SearchBar from '../../components/SearchBar';

class Dashboard extends Component {
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
        if (authTokenPresent() && !isEmpty(this.props.user)) this.props.getFeedPosts();
        else setTimeout(() => this.props.getFeedPosts(), 3000);
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
            this.props.getFeedPosts();
            this.setState({ allowRequest: 0 });
        } else if (Math.abs(windowBottom - docHeight) > 500 && !this.state.allowRequest)
            this.setState({ allowRequest: 1 });
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;
        const showLoader = this.props.posts.showLoader ? <Loader4 /> : null;
        const postCards = this.props.posts.list.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
        });

        return (
            <Fragment>
                <SideBar />
                <div className='dashboard--wrapper'>
                    <div className='dashboard'>
                        <div className='dashboard__heading'>
                            <div className='dashboard__heading--text'>Dashboard</div>
                        </div>
                        <div className='postcard--wrapper mt-5 pt-5'>{postCards}</div>
                        {showLoader}
                    </div>
                    <SearchBar />
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
Dashboard.propTypes = {
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
export default connect(mapStatesToProps, { getFeedPosts, postsReset })(withRouter(Dashboard));
