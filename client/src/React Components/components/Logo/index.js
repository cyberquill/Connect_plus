import React from 'react';
import logoImg from '../../../assets/spinner3.png';

export default function Logo({ others }) {
    return (
        <div className={`logo ${others}`}>
            <img src={logoImg} alt='' className='logo__img' />
        </div>
    );
}

