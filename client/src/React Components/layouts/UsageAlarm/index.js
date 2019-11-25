import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';

class UsageAlarm extends Component {
    constructor() {
        super();
        this.state = {
            render: false,
            delay: 1,
        };
        this.usageBtnHandler = this.usageBtnHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {
        setTimeout(
            () => this.setState({ render: true }),
            this.state.delay * 60 * 1000,
        );
    }
    //==========================================================================
    usageBtnHandler = response => () => {
        if (response === 'Yes') {
            this.setState({ render: false });
        } else {
            this.setState({ render: false });
            this.props.history.push('/');
        }
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) {
            return null;
        }

        if (!this.state.render) {
            return null;
        }

        return null;

        return (
            <div className="usagealarm__wrapper">
                <div className="usagealarm">
                    <div className="usagealarm__text">
                        You have been exploring Connect<sup>+</sup> for the last
                        {' ' + this.state.delay +
                            (this.state.delay === 1 ? ' minute.' : ' minutes.')}
                        <br />
                        Do you wish to continue?
                    </div>
                    <div className="usagealarm__btngrp">
                        <button
                            className="usagealarm__btngrp__btn"
                            onClick={this.usageBtnHandler('Yes')}>
                            Yes
                        </button>
                        <button
                            className="usagealarm__btngrp__btn"
                            onClick={this.usageBtnHandler('No')}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
UsageAlarm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    errors: state.errors,
});
//==========================================================================
export default connect(
    mapStatesToProps,
    {},
)(withRouter(UsageAlarm));
