import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import Loader4 from '../../layouts/Loader4';
import SideBar from '../../layouts/SideBar';
import FollowCard from '../../components/FollowCard';
import SearchBar from '../../components/SearchBar';
import {
    getPersonFollowers,
    getPersonFollowings,
    resetFollow,
} from '../../../redux/actions/Person Actions';

class Follow extends Component {
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
            if (this.props.person.mode === 'FOLLOWERS')
                this.props.getPersonFollowers(this.props.person._id);
            else this.props.getPersonFollowings(this.props.person._id);
            this.setState({ allowRequest: 0 });
        } else if (Math.abs(windowBottom - docHeight) > 500 && !this.state.allowRequest)
            this.setState({ allowRequest: 1 });
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) return <Redirect to='/login' />;
        if (isEmpty(this.props.person._id) || isEmpty(this.props.person.mode))
            return <Redirect to='/dashboard' />;

        const showLoader = this.props.person.showLoader ? <Loader4 /> : null;
        let followCards = this.props.person.follows.map((follow, index) => {
            return (
                <FollowCard
                    follow={follow}
                    mode={this.props.person.mode}
                    index={index}
                    key={index}
                />
            );
        });

        return (
            <Fragment>
                <SideBar />
                <div className='follow--wrapper'>
                    <SearchBar />
                    <div className='follow'>
                        <div className='follow__heading'>
                            <div className='follow__heading--text'>
                                {this.props.person.mode === 'FOLLOWERS' ? 'Followers' : 'Following'}
                            </div>
                        </div>
                        <div className='followcard--wrapper mt-5 pt-5'>{followCards}</div>
                        {showLoader}
                    </div>
                </div>
            </Fragment>
        );
    }
    //==========================================================================
    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageBottomHandler);
        this.props.resetFollow();
    }
}
//==========================================================================
Follow.propTypes = {
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
export default connect(mapStatesToProps, {
    getPersonFollowers,
    getPersonFollowings,
    resetFollow,
})(withRouter(Follow));
