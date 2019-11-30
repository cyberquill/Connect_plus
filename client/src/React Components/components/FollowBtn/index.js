import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { followPerson, unfollowPerson } from '../../../redux/actions/Person Actions';

class FollowBtn extends Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => {
        e.stopPropagation();
        if(this.props.disable)  return;

        if (!this.props.isFollowed) this.props.followPerson(this.props.id);
        else this.props.unfollowPerson(this.props.id);
    }
    //==========================================================================
    render() {
        let cls = 'followbtn ';
        cls += this.props.isFollowed ? 'followbtn--followed ' : '';
        cls += this.props.others+' ';
        cls += this.props.disable ? 'followbtn--disabled' : '';
        return (
            <div className={cls} onClick={this.clickHandler}>
                {this.props.isFollowed ? 'Following' : 'Follow'}
            </div>
        );
    }
}
//==========================================================================
FollowBtn.propTypes = {
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    errors: state.errors,
});
//==========================================================================
export default connect(mapStatesToProps, { followPerson, unfollowPerson })(withRouter(FollowBtn));
