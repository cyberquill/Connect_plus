import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import SideBar from '../../layouts/SideBar';
import SearchBar from '../../components/SearchBar';
import PostCard from '../../components/PostCard';
import UserCard from '../../components/UserCard';
import Loader1 from '../../layouts/Loader1';
import Post from '../../layouts/Post';
import { resetSearch } from '../../../redux/actions/Search Actions';

class SearchResults extends Component {
    constructor() {
        super();
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;
        if (isEmpty(this.props.search.query)) return <Redirect to='/dashboard' />;

        const showLoader = this.props.search.showLoader ? <Loader1 /> : null;
        const userCards = this.props.search.users.map((user, index) => {
            return <UserCard user={user} index={index} key={index} />;
        });
        const postCards = this.props.search.posts.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
        });

        return (
            <Fragment>
                <SideBar />
                <div className='searchresults--wrapper'>
                    <SearchBar />
                    <div className='searchresults__heading'>
                        <div className='searchresults__heading--text'>Search Results</div>
                    </div>
                    <hr className='searchresults__rule' data-content='Users' />
                    <div className='usercard--wrapper'>{userCards}</div>
                    <hr className='searchresults__rule' data-content='Posts' />
                    <div className='postcard--wrapper'>{postCards}</div>
                </div>
                {showLoader}
                {!isEmpty(this.props.posts.activePost) ? <Post /> : null}
            </Fragment>
        );
    }
    //==========================================================================
    componentWillUnmount() {
        this.props.resetSearch();
    }
}
//==========================================================================
SearchResults.propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStateToProps = state => ({
    user: state.user,
    posts: state.posts,
    search: state.search,
    errors: state.errors,
});

export default connect(mapStateToProps, { resetSearch })(withRouter(SearchResults));
