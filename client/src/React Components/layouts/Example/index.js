import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';

class Example extends Component {
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
            <div className="__wrapper">
                <div className="">Hi</div>
            </div>
        );
    }
}
//==========================================================================
Example.propTypes = {
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
)(withRouter(Example));
