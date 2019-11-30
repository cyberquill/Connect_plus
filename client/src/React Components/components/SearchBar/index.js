import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from '../../../redux/actions/Search Actions';
import isEmpty from '../../../validation/isEmpty';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //==========================================================================
    onSubmit = e => {
        e.preventDefault();
        if(isEmpty(this.state.query))   return;
        this.props.search(this.state.query, this.props.history, '/searchresults');
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        return (
            <div className='searchbar--wrapper'>
                <form noValidate className='searchbar' onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='query'
                        className='searchbar__input'
                        placeholder='Search something...'
                        value={this.state.query}
                        onChange={this.onChange}
                    />

                    <button className='searchbar__btn'>
                        <i className='fas fa-search'></i>
                    </button>
                </form>
            </div>
        );
    }
}
//==========================================================================
SearchBar.propTypes = {
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    errors: state.errors,
});
//==========================================================================
export default connect(mapStatesToProps, { search })(withRouter(SearchBar));
