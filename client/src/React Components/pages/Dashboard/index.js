import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { getPosts } from '../../../redux/actions/Post Actions';
import PostCard from '../../components/PostCard';
import Loader3 from '../../layouts/Loader3';
import SideBar from '../../layouts/SideBar';
import Post from '../Post';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {};
        //this.onChange = this.onChange.bind(this);
        this.pageBottomHandler = this.pageBottomHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {
        window.addEventListener('scroll', this.pageBottomHandler);
        this.props.getPosts(this.props.posts.pstPgCtr);
    }
    //==========================================================================
    pageBottomHandler = e => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            this.props.getPosts(this.props.posts.pstPgCtr);
        }
    };
    //==========================================================================
    //onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) {
            return <Redirect to="/login" />;
        }

        const postCards = this.props.posts.list.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
        });

        return (
            <Fragment>
                <SideBar />
                <div className="dashboard__wrapper">
                    <div className="dashboard">
                        <div className="dashboard__heading">
                            <div className="dashboard__heading--text">Dashboard</div>
                        </div>
                        <div className="postcard--wrapper">{postCards}</div>
                        <Loader3 />
                    </div>
                </div>
                {!isEmpty(this.props.posts.activePost) ? <Post /> : null }
            </Fragment>
        );
    }
    //==========================================================================
    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageBottomHandler);
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
export default connect(
    mapStatesToProps,
    { getPosts },
)(withRouter(Dashboard));
