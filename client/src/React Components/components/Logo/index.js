import React, { Component } from 'react';
import logoImg from '../../../assets/spinner3.png';

export default class Logo extends Component {
    constructor() {
        super();

        this.wrapperCSS = {};
    }

    render() {
        this.wrapperCSS = {
            height: this.props.dimension,
            width: this.props.dimension,
        };

        return (
            <div className={this.props.others}>
                <div className="logo rounded-circle" style={this.wrapperCSS}>
                    <img src={logoImg} alt="" className="logo__img" />
                </div>
            </div>
        );
    }
}
