import React, { Component } from 'react';
import Logo from '../../components/Logo';

class Home extends Component {
    render() {
        return (
            <div>
                Hello!
                <Logo dimension='150px'/>
            </div>
        );
    }
}

export default Home;