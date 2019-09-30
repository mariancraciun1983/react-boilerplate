import React from 'react';
import PropTypes from 'prop-types';
import {
  Field, reduxForm, getFormValues, submit,
} from 'redux-form';
import { connect } from 'react-redux';
import { onSubmitFail, renderField } from './formUtils';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,30}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const formStateToProps = (state) => ({
  formValues: getFormValues('loginForm')(state),
});
const formActionsToProps = (dispatch) => ({
  attemptSubmit: () => dispatch(submit('loginForm')),
});
class LoginForm extends React.PureComponent {
  isSubmitDisabled() {
    const { pristine, submitting, initialValues } = this.props;
    if (submitting) return true;
    if (initialValues.email && initialValues.password) return false;
    if (pristine) return true;
    return false;
  }

  render() {
    const { handleSubmit, error, submitSucceeded } = this.props;
    return (
      <div>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {submitSucceeded ? (
          <div className="alert alert-success">Login successful</div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            label="Email"
            component={renderField}
            type="email"
            autoComplete="email"
          />
          <Field
            name="password"
            label="Password"
            component={renderField}
            type="password"
            autoComplete="current-password"
          />
          <div className=" ">
            <button
              type="submit"
              disabled={this.isSubmitDisabled()}
              className="btn btn-success btn-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}


LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any,
  initialValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};
LoginForm.defaultProps = {
  initialValues: { email: '', password: '' },
  error: null,
};

const LoginWithReduxForm = reduxForm({
  form: 'loginForm',
  validate,
  onSubmitFail,
})(LoginForm);
export const Component = LoginForm;
export default connect(
  formStateToProps,
  formActionsToProps,
)(LoginWithReduxForm);
