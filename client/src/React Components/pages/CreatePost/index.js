import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import ImagePreview from '../../components/ImagePreview';
import {
    uploadFiles,
    filesCollected,
} from '../../../redux/actions/Upload Actions';
import { createPost } from '../../../redux/actions/Post Actions';
import Loader1 from '../../layouts/Loader1';
import Loader2 from '../../layouts/Loader2';

class CreatePost extends Component {
    constructor() {
        super();

        this.state = {
            desc: '',
            uploadURLs: [],
            inputURLs: [''],
            access: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.descHandler = this.descHandler.bind(this);
        this.uploadRemoveHandler = this.uploadRemoveHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.uploads.urls)) {
            this.props.filesCollected();
            this.setState(prevState => ({
                uploadURLs: [...prevState.uploadURLs, ...this.props.uploads.urls],
            }));
        }
    }
    //==========================================================================
    onSubmit = e => {
        e.preventDefault();
        const newPost = {};
        newPost.desc = this.state.desc;
        this.state.inputURLs = this.state.inputURLs.filter(s => s !== '' && s !== null);
        this.state.uploadURLs = this.state.uploadURLs.filter(s => s !== '' && s !== null);
        newPost.resources = [...this.state.inputURLs, ...this.state.uploadURLs];
        newPost.access = isEmpty(this.state.access) ? 'Public' : this.state.access;
        this.props.createPost(newPost, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    descHandler = e => this.setState({ [e.target.id]: e.target.innerText });
    //==========================================================================
    uploadRemoveHandler = uid => () => {
        console.log('upload-index: ', uid);
        this.setState({
            uploadURLs: this.state.uploadURLs.filter((s, suid) => uid !== suid),
        });
    };
    //==========================================================================
    fileUploadHandler = e => {
        e.preventDefault();
        this.props.uploadFiles(e.target.files);
        e.target.value = '';
    };
    //==========================================================================
    handleAddInputURL = () => {
        this.setState({
            inputURLs: this.state.inputURLs.concat(['']),
        });
    };
    //==========================================================================
    handleRemoveInputURL = uid => () => {
        console.log('input-index: ', uid);
        this.setState({
            inputURLs: this.state.inputURLs.filter((s, suid) => uid !== suid),
        });
    };
    //==========================================================================
    handleInputURLNameChange = uid => evt => {
        const newInputURLs = this.state.inputURLs.map((inputURL, suid) => {
            if (uid !== suid) return inputURL;
            return evt.target.value;
        });
        this.setState({ inputURLs: newInputURLs });
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) {
            return <Redirect to="/login" />;
        }
        const { inputURLs, uploadURLs } = this.state;
        const showPostLoader = this.props.posts.showLoader ? <Loader1 /> : null;
        const showUploadLoader = this.props.uploads.isLoading ? <Loader2 /> : null;
        const previewList = (
            <ImagePreview
                inputURLs={inputURLs}
                uploadURLs={uploadURLs}
                inputRemoveHandler={this.handleRemoveInputURL}
                uploadRemoveHandler={this.uploadRemoveHandler}
            />
        );

        return (
            <Fragment>
                {showPostLoader}
                <div className="createpost__wrapper">
                    <div className="createpost">
                        <div className="createpost__card">
                            <form onSubmit={this.onSubmit} className="createpost__card__form">
                                <label
                                    htmlFor="desc"
                                    className="createpost__card__form__desc--label">
                                    Say something Incredible!🤟😉💖
                                </label>
                                <div
                                    contentEditable="true"
                                    id="desc"
                                    onKeyUp={this.descHandler}
                                    className="createpost__card__form__desc"></div>
                                <div className="createpost__card__form--radio">
                                    <div className="postForm-radioGroup">
                                        <input
                                            type="radio"
                                            className="postForm-radioGroup__input"
                                            id="public"
                                            name="access"
                                            value="Public"
                                            onChange={this.onChange}
                                        />
                                        <label
                                            htmlFor="public"
                                            className="postForm-radioGroup__label">
                                            <span className="postForm-radioGroup__button" />
                                            Public: Visible to everyone
                                        </label>
                                    </div>
                                    <div className="postForm-radioGroup">
                                        <input
                                            type="radio"
                                            className="postForm-radioGroup__input"
                                            id="private"
                                            name="access"
                                            value="Private"
                                            onChange={this.onChange}
                                        />
                                        <label
                                            htmlFor="private"
                                            className="postForm-radioGroup__label">
                                            <span className="postForm-radioGroup__button" />
                                            Private: Visible only to followers
                                        </label>
                                    </div>
                                </div>
                                <div className="createpost__card__form__urlsection">
                                    <button
                                        type="button"
                                        onClick={this.handleAddInputURL}
                                        className="createpost__card__form__urlsection--add">
                                        <i className="fas fa-plus-circle"></i>&emsp;Add URL
                                    </button>
                                    <div className="createpost__card__form__urlsection--list">
                                        {inputURLs.map((inputURL, uid) => (
                                            <div
                                                key={uid}
                                                className="createpost__card__form__urlsection--grp">
                                                <input
                                                    type="text"
                                                    placeholder={`URL #${uid + 1}`}
                                                    value={inputURL}
                                                    className="createpost__card__form__urlsection--input"
                                                    onChange={this.handleInputURLNameChange(uid)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={this.handleRemoveInputURL(uid)}
                                                    className="createpost__card__form__urlsection--rm">
                                                    <i className="fas fa-minus-circle"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={this.onSubmit}
                                    className="fancy-button bg-gradient1 pop-onhover createpost__btn"
                                    disabled={this.props.uploads.isLoading}>
                                    <span>
                                        <i className="fas fa-plus-circle"></i>Create Post
                                    </span>
                                </button>
                            </form>
                        </div>

                        <div className="createpost__preview">
                            {showUploadLoader}
                            <div className="fileUpload">
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="file-upload"
                                    className="fileUpload__input"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={this.fileUploadHandler}
                                    ref={fileInput => (this.fileInput = fileInput)}
                                    multiple
                                />
                                <button
                                    href="#"
                                    className="form__submitBtn"
                                    onClick={() => this.fileInput.click()}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Pick Files to Upload
                                </button>
                            </div>
                            {previewList}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
//==========================================================================
CreatePost.propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    uploads: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    posts: state.posts,
    uploads: state.uploads,
    errors: state.errors,
});
//==========================================================================
export default connect(
    mapStatesToProps,
    { uploadFiles, filesCollected, createPost },
)(withRouter(CreatePost));
