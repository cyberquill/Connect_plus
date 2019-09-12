import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';

class ImagePreview extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //Parent   ----->   clickHandler = (index, e) => {};
    //Child    ----->   onClick={this.clickHandler.bind(this, index)}
    //==========================================================================
    render() {
        const inputPreviews = this.props.inputURLs.map((URL, index) => {
            if (URL === '' || URL === null) return null;

            return (
                <div className="preview" key={index}>
                    <img src={URL} alt="" className="preview--img" />
                    <button
                        onClick={this.props.inputRemoveHandler(index)}
                        className="preview--btn ">
                        <i className="fas fa-times-circle"></i>
                    </button>
                </div>
            );
        });

        const uploadPreviews = this.props.uploadURLs.map((URL, index) => {
            if (URL === '' || URL === null) return null;

            return (
                <div className="preview" key={index}>
                    <img src={URL} alt="" className="preview--img" />
                    <button
                        onClick={this.props.uploadRemoveHandler(index)}
                        className="preview--btn">
                        <i className="fas fa-times-circle"></i>
                    </button>
                </div>
            );
        });

        return (
            <div className="preview--wrapper">
                {inputPreviews}
                {uploadPreviews}
            </div>
        );
    }
}
//==========================================================================
ImagePreview.propTypes = {
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
)(withRouter(ImagePreview));
