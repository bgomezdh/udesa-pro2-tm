const db = require("../database/models");
const movie = db.Movie; /* El alias que le pondre a mi modelo */



const movieController = {

  findAll: (req, res) => {
    movie
      .findAll()
      .then((result) => {
        return res.send(result);
      });
  }


};

module.exports = movieController;


































  /* Clase Larga */

  /* , 
  create: (req, res) => {
    return res.render("register");
  },
  store: (req, res) => {
    let info = req.body;

    db.Movie.create({
      title: info.titulo,
      rating: info.valuacion,
      awards: info.premios,
      release_date: info.fecha,
      length: info.duracion,
      genre_id: info.genero,
    }).then((result) => {
      return res.redirect("/movies/all");
    });
  },
  edit: (req, res) => {
    let id = req.params.id;
    movie.findByPk(id).then((result) => {

      return res.render("movieEdit", {
        movie: result,
      });
    });
  }  */

