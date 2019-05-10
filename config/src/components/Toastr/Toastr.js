import React from 'react';
import PropTypes from 'prop-types';

const Toastr = ({ isShow = false, title, body, type = 'content' }) => {
  return (
    isShow &&
    <div className="toastr">
      <div className={`alert top-content-bar top-content-bar--${type}`} role="alert">
        <div className="top-content-bar-message">
          <strong>{title}</strong> {body}
        </div>
      </div>
    </div>
  );
};

Toastr.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  type: PropTypes.string
};

export default Toastr;
