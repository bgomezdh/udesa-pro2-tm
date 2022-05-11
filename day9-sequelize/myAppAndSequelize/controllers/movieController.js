const db = require("../database/models");
const movie = db.Movie; /* El alias que le pondre a mi modelo */

const movieController = {
  findAll: (req, res) => {
    movie
      .findAll({
        /*   where: [{ awards: 1 }, { length: 120 }], */
      })
      .then((result) => {
        return res.render("movies", {
          listaPeliculas: result,
        });
      });
  },
  show: (req, res) => {
    let id = req.params.id;
    movie.findByPk(id).then((result) => {
      return res.render("moviesDetails", {
        movie: result,
      });
    });
  },
  showOne: (req, res) => {
    let busqueda = req.query.pelicula;
    db.Movie.findOne({
      where: [{ title: busqueda }],
    }).then((result) => {
      return res.render("moviesDetails", {
        movie: result,
      });
    });
  },
  create: (req, res) => {
    return res.render("register");
  },
  store: (req, res) => {
    let info = req.body;

    db.Movie.create({
      title: info.titulo,
      awards: info.premios,
      release_date: info.fecha,
      length: info.duracion,
      genre_id: info.genero,
    }).then((result) => {
      return res.redirect("/movies/all");
    });
  },
};

module.exports = movieController;
