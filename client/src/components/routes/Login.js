import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import FormGroup from '../layout/formGroup';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        // Clear State
        this.setState({
            email: '',
            password: '',
            errors: {},
        });

        this.props.history.push('/');
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { email, password, errors } = this.state;
        return (
            <div className="login">
                <Particles
                    className="particles"
                    params={{
                        particles: {
                            number: {
                                value: 150,
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
                                speed: 4
                            },
                        }
                    }}
                />
                <div className="login__card">
                    <div className="login__card__pic">
                        <i className="zmdi zmdi-landscape" />
                    </div>
                    <form
                        // noValidate
                        className="login__card__form"
                        onSubmit={this.onSubmit}>
                        <FormGroup
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        <FormGroup
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                        />

                        <input type="hidden" name="_gotcha" />

                        <button className="login__card__btn">Login!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
