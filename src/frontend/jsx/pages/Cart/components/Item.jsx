/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../../core/utils/formatter';

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onUpdateMovie = this.onUpdateMovie.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onUpdateMovie(e) {
    const { onUpdate, movie: { id } } = this.props;
    onUpdate(id, parseInt(e.target.value));
  }

  onDelete() {
    const { onUpdate, movie: { id } } = this.props;
    onUpdate(id, 0);
  }

  render() {
    const { quantity, movie } = this.props;
    return (
      <div className="d-flex mb-3 pb-3 border-bottom">
        <div className="mr-auto d-inline-flex">
          <img src={movie.image} alt="Movie" />
          <div className="p-3">
            <strong>{movie.title}</strong>
            <br />
            <span>{`Price: ${formatPrice(movie.price)}$`}</span>
          </div>
        </div>
        <div className="">
          Quantity:
          <input
            className="form-control"
            type="number"
            value={quantity}
            min={1}
            onChange={this.onUpdateMovie}
          />
        </div>
        <div className="pt-4 pl-4">
          <button className="btn btn-dark" type="button" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};
export const Component = Item;
export default Item;
