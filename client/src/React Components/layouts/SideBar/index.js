import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';

class SideBar extends Component {
    constructor() {
        super();
        this.state = {};
        this.pageBottomHandler = this.pageBottomHandler.bind(this);
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    pageBottomHandler = e => {};
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="sidebar__wrapper">
                <div className="sidebar">Hi</div>
            </div>
        );
    }
}
//==========================================================================
SideBar.propTypes = {
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
)(withRouter(SideBar));
