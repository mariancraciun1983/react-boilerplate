import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setString } from '../../../../core/stores/reducers/filters';
import { filtersString } from '../../../../core/selectors';

const stateToProps = (state) => ({
  string: filtersString(state),
});

const actionsToProps = (dispatch) => ({
  setSearchString: (string) => dispatch(setString(string)),
});

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { setSearchString } = this.props;
    setSearchString(event.target.value);
  }

  render() {
    const { string } = this.props;
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          value={string}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

Search.propTypes = {
  setSearchString: PropTypes.func.isRequired,
  string: PropTypes.string.isRequired,
};

export const Component = Search;
export default connect(
  stateToProps,
  actionsToProps,
)(Search);
