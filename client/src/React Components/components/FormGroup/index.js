import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const formGroup = ({ name, value, thumb, placeholder, type, onChange, error, others }) => {
    return (
        <div className={others}>
            <div className="form-group">
                <input
                    type={type === 'email' ? 'text' : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-group__input"
                    required
                    pattern="\S+.*"
                />
                <label htmlFor={name} className="form-group__label">
                    {placeholder}
                </label>
                {error && <span className="form-group__invalidMsg">{error}</span>}
                <span
                    className={classnames('form-group__bar', {
                        'form-group__bar--invalid': error,
                    })}></span>
            </div>
        </div>
    );
};

formGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    others: PropTypes.string,
};

formGroup.defaultProps = {
    type: 'text',
};

export default formGroup;
