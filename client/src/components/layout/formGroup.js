import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const formGroup = ({ name, value, placeholder, type, onChange, error }) => {
    return (
        <div className="form-group mt-5">
            <input
                type={type}
                name={name}
                className={classnames('form__input form-control', {
                    'is-invalid': error,
                })}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            <label htmlFor={name} className="form__label">
                {placeholder}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

formGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

formGroup.defaultProps = {
    type: 'text',
};

export default formGroup;
