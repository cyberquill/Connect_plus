import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import FormGroup from '../layout/formGroup';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            pwd1: '',
            pwd2: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, pwd1, pwd2 } = this.state;

        const newUser = {
            name,
            email,
            pwd1,
            pwd2,
        };

        this.props.createUser(newUser);

        // Clear State
        this.setState({
            name: '',
            email: '',
            pwd1: '',
            pwd2: '',
            errors: {},
        });

        this.props.history.push('/');
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, email, pwd1, pwd2, errors } = this.state;
        return (
            <div className="signup">
                <Particles
                    className="particles"
                    params={{
                        particles: {
                            number: {
                                value: 200,
                            },
                            color: {
                                value: '#222',
                            },
                            size: {
                                value: 5,
                            },
                            line_linked: {
                                color: '#000',
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 4,
                            },
                        },
                    }}
                />
                <div className="signup__card">
                    <div className="signup__card__pic">
                        <i className="zmdi zmdi-landscape" />
                    </div>
                    <form
                        // noValidate
                        className="signup__card__form"
                        onSubmit={this.onSubmit}>
                        <FormGroup
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={this.onChange}
                            error={errors.name}
                        />
                        <FormGroup
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        <FormGroup
                            name="pwd1"
                            type="password"
                            placeholder="Password"
                            value={pwd1}
                            onChange={this.onChange}
                            error={errors.pwd1}
                        />
                        <FormGroup
                            name="pwd2"
                            type="password"
                            placeholder="Confirm Password"
                            value={pwd2}
                            onChange={this.onChange}
                            error={errors.pwd2}
                        />

                        <input type="hidden" name="_gotcha" />

                        <button className="signup__card__btn">Sign Up!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
