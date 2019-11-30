import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import userImg from '../../../assets/user_purple.png';
import { setPerson } from '../../../redux/actions/Person Actions';

class FollowCard extends Component {
    constructor() {
        super();
        this.state = {
            targetUser: {},
            id: null,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => this.props.setPerson(this.state.id, this.props.history);
    //==========================================================================
    render() {
        let { dtTime, slaveUser, masterUser } = this.props.follow;

        if (this.props.mode === 'FOLLOWERS' && isEmpty(this.state.targetUser))
            this.setState({ targetUser: slaveUser[0] });
        else if (this.props.mode === 'FOLLOWING' && isEmpty(this.state.targetUser))
            this.setState({ targetUser: masterUser[0] });

        if (isEmpty(this.state.targetUser)) return null;

        const { firstName, lastName, profilePic, _id } = this.state.targetUser;
        if (isEmpty(this.state.id)) this.setState({ id: _id });
        if (isEmpty(profilePic)) profilePic = userImg;
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
            <div className='followcard' onClick={this.clickHandler}>
                <div className='followcard__profilePic'>
                    <img src={profilePic} alt='profile Pic' />
                </div>
                <div className='followcard__details'>
                    <div className='followcard__name'>
                        {firstName} {lastName}
                    </div>
                    <div className='followcard__date'>{dtTime}</div>
                </div>
            </div>
        );
    }
}
//==========================================================================
FollowCard.propTypes = {
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
export default connect(mapStatesToProps, { setPerson })(withRouter(FollowCard));
