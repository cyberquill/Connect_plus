import React, { Component } from 'react';
import authArt from '../../../assets/authArt.png';
import Logo from '../Logo';

export default class AuthWrapper extends Component {
    render() {
        return (
            <div className='auth__back'>
                <div className='auth'>
                    <div className='auth__card'>{this.props.children}</div>
                    <div className='auth__display'>
                        <div className='auth__display__art'>
                            <img src={authArt} alt='' className='auth__display__art--img' />
                        </div>
                        <div className='auth__display__text'>
                            <div className='auth__display__heading'>
                                Connect&nbsp;
                                <strong>
                                    <sup>+</sup>
                                </strong>
                                <Logo others='auth__display__logo' />
                            </div>
                            <div className='auth__display__desc'>
                                <i>It's not just a social-network, It's an Adventure!</i>
                            </div>
                            <div className='auth__display__footer'>
                                <i class='fas fa-info-circle'></i>
                                Need Any Help/Assistance?
                                <span className='auth__display__contact'>Contact</span>
                                <div className='auth__display__footer--icons'>
                                    <i class='fab fa-facebook'></i> |<i class='fab fa-twitter'></i>{' '}
                                    |<i class='fab fa-instagram'></i> |
                                    <i class='fas fa-share-alt'></i> |<i class='fas fa-hashtag'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
