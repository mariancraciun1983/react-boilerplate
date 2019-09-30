const slugify = require('slugify');

const user = require('./user');
const genresDefault = require('./genres');
const moviesDefault = require('./movies');
const cart = require('./cart');

const slugifySettings = {
  replacement: '-',    // replace spaces with replacement
  remove: /[^a-z0-9 ]/ig,        // regex to remove characters
  lower: true,         // result in lower case
};
// movies need to have some properties adjusted
const movies = moviesDefault.map(movie => ({
    ...movie,
    genre: movie.genre.split('|').map( genre => slugify(genre, slugifySettings)),
    slug: slugify(movie.title.substr(0, 30), slugifySettings)
  })
);

const  genres = [];
genresDefault.forEach(genre => {
  genres.push({
    name: genre,
    slug: slugify(genre, slugifySettings)
  })
});

module.exports = {
  user,
  genres,
  movies,
  cart
}
