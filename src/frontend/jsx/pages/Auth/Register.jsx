import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as Api from '../../../core/middleware/api';
import { authIsAuthenticated } from '../../../core/selectors';
import { authSet } from '../../../core/stores/reducers/auth';
import RegisterForm from './components/RegisterForm';

const stateToProps = (state) => ({
  isAuthenticated: authIsAuthenticated(state),
});

const actionsToProps = (dispatch) => ({
  redirect: (to) => dispatch(push(to)),
  authUserSet: (data) => dispatch(authSet(data)),
});

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated, redirect } = this.props;
    if (isAuthenticated) {
      redirect('/');
    }
  }

  handleSubmit(values) {
    const { authUserSet, redirect } = this.props;
    return new Promise((resolve, reject) => {
      const success = (data) => {
        if (data && data.token && data.user) {
          const { token, user } = data;
          authUserSet({ token, user });
          redirect('/');
          resolve();
        } else {
          reject(new SubmissionError({ _error: 'Failed to process the form' }));
        }
      };
      const error = () => {
        reject(new SubmissionError({ _error: 'Something went wrong' }));
      };
      Api.authRegister({ ...values })
        .then(success)
        .catch(error);
    });
  }

  render() {
    const initialValues = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-6 offset-3">
              <div className="card-header">
                <h1>Register</h1>
              </div>
              <div className="card-body">
                <RegisterForm onSubmit={this.handleSubmit} initialValues={initialValues} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Register.propTypes = {
  redirect: PropTypes.func.isRequired,
  authUserSet: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export const Component = Register;
export default connect(
  stateToProps,
  actionsToProps,
)(Register);
