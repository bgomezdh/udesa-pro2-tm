const db = require("../database/models");
const movie = db.Movie; /* El alias que le pondre a mi modelo */
const op = db.Sequelize.Op;



const movieController = {

  findAll: (req, res) => {
    movie
      .findAll({
        /* where : [{awards: 1}, {length: 120}], */
        /* order : [["title", "ASC"]],
        limit : 5,
        offset: 4 */
       
      })
      .then((result) => {
        return res.render("movies", {
          listaPeliculas : result
        });
      });
  },
  show : (req, res) => {
    /* Tenemos que encontrar primero el ID que viajara por PK */
    let id = req.params.id;

    /* Usar el modelo movie */
    /* usar el moto findByPk(conElIdEncontrado) */
    movie.findByPk(id).then((result) => {
      return res.render("moviesDetails", {
        movie : result
      });
    })
    
  },
  showOne : (req, res) => {
    let busqueda = req.query.pelicula;
    movie.findOne({
      where : [ 
        /* {title : busqueda } */
        { title: {
          [op.like]: `%${busqueda}%`
        }}
      ]
    }).then((result) => {
      return res.send(result);
    })
    
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

