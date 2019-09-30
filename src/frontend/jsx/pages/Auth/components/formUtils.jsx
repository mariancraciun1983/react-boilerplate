/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import className from 'classnames';

const getComponentToRender = (type, params = {}) => {
  if (type === 'textarea') {
    return <textarea {...params} />;
  }
  return <input {...params} type={type} />;
};

export const renderField = (dt) => {
  const {
    input,
    autoComplete,
    label,
    type,
    meta: { touched, error },
  } = dt;
  const hasError = touched && error;
  const hasSuccess = touched && !error;
  const params = {
    ...input,
    className: className({ 'form-control': true, 'is-valid': hasSuccess, 'is-invalid': hasError }),
    placeholder: label,
  };
  if (autoComplete) params.autoComplete = autoComplete;
  return (
    <div>
      <div className="form-group">
        {label ? <label htmlFor={params.name}>{label}</label> : null}
        {getComponentToRender(type, params)}
        {hasError ? <div className="invalid-feedback">{error}</div> : null}
      </div>
    </div>
  );
};

export const onSubmitFail = (errors) => {
  const key = Object.keys(errors)
    .reduce((k, l) => {
      if (document.getElementsByName(k)[0].offsetTop < document.getElementsByName(l)[0].offsetTop) {
        return k;
      }
      return l;
    });
  if (document.getEleentsByName(key).length) {
    document.getElementsByName(key)[0].focus();
  }
};
