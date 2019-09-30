import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as Api from '../../../core/middleware/api';
import { authIsAuthenticated } from '../../../core/selectors';
import { authSet } from '../../../core/stores/reducers/auth';
import LoginForm from './components/LoginForm';

const stateToProps = (state) => ({
  isAuthenticated: authIsAuthenticated(state),
});

const actionsToProps = (dispatch) => ({
  redirect: (to) => dispatch(push(to)),
  authDataSet: (data) => dispatch(authSet(data)),
});

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { redirect, isAuthenticated } = this.props;
    if (isAuthenticated) {
      redirect('/');
    }
  }

  handleSubmit(values) {
    const { authDataSet, redirect } = this.props;
    return new Promise((resolve, reject) => {
      const success = (data) => {
        if (data && data.token && data.user) {
          const { token, user } = data;
          authDataSet({ token, user });
          redirect('/');
          resolve();
        } else {
          reject(new SubmissionError({ _error: 'Failed to process the form' }));
        }
      };
      const error = () => {
        reject(new SubmissionError({ _error: 'Something went wrong' }));
      };
      Api.authLogin({ ...values })
        .then(success)
        .catch(error);
    });
  }

  render() {
    const initialValues = { email: 'john@example.com', password: 'password' };
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-6 offset-3">
              <div className="card-header">
                <h1>Login</h1>
              </div>
              <div className="card-body">
                <LoginForm onSubmit={this.handleSubmit} initialValues={initialValues} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


Login.propTypes = {
  redirect: PropTypes.func.isRequired,
  authDataSet: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export const Component = Login;
export default connect(
  stateToProps,
  actionsToProps,
)(Login);
