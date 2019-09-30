import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
  getFormValues,
  submit,
} from 'redux-form';
import { connect } from 'react-redux';
import { onSubmitFail, renderField } from './formUtils';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (!values.email) {
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
  formValues: getFormValues('registerForm')(state),
});
const formActionsToProps = (dispatch) => ({
  attemptSubmit: () => dispatch(submit('registerForm')),
});
class RegisterForm extends React.PureComponent {
  isSubmitDisabled() {
    const { pristine, submitting, initialValues } = this.props;
    if (submitting) return true;
    if (initialValues.email && initialValues.password && initialValues.name) return false;
    if (pristine) return true;
    return false;
  }

  render() {
    const {
      handleSubmit,
      error,
      submitSucceeded,
    } = this.props;
    return (
      <div>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {submitSucceeded ? <div className="alert alert-success">Register successful</div> : null}
        <form onSubmit={handleSubmit}>
          <Field name="name" label="Name" component={renderField} type="name" autoComplete="name" />
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
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any,
  initialValues: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
};
RegisterForm.defaultProps = {
  initialValues: { email: '', password: '', name: '' },
  error: null,
};

export const Component = RegisterForm;
const RegisterWithReduxForm = reduxForm({
  form: 'registerForm',
  validate,
  onSubmitFail,
})(RegisterForm);
export default connect(
  formStateToProps,
  formActionsToProps,
)(RegisterWithReduxForm);
