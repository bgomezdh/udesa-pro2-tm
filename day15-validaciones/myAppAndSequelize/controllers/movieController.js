const db = require("../database/models");
const movie = db.Movie; /* El alias que le pondre a mi modelo */

const movieController = {


  findAll: (req, res) => {

    let counter = req.session.contador;
    if (counter != undefined) {
      counter +=1
    } else {
      counter = 1;
    }

    req.session.contador = counter;

    movie
      .findAll({
        /*   where: [{ awards: 1 }, { length: 120 }], */
      })
      .then((result) => {
        return res.render("movies", {
          listaPeliculas: result,
          contador : req.session.contador
        });
      });
  },
  show: (req, res) => {
    let id = req.params.id;
    movie.findByPk(id).then((result) => {
      let fi = new Date(result.release_date);
      fecha = `${fi.getDate()}-${fi.getMonth() + 1}-${fi.getFullYear()}`;
      let movie = {
        title: result.title,
        rating: result.rating,
        awards: result.awards,
        release_date: fecha,
        length: result.length,
        genre_id: result.genre_id,
      }
      return res.render("moviesDetails", {
        movie: movie,
      });
    });
  },
  showOne: (req, res) => {
    let busqueda = req.query.pelicula;
    db.Movie.findOne({
      where: [{ title: busqueda }],
    }).then((result) => {
      let fi = new Date(result.release_date);
      fecha = `${fi.getDate()}-${fi.getMonth() + 1}-${fi.getFullYear()}`;
      let movie = {
        title: result.title,
        rating: result.rating,
        awards: result.awards,
        release_date: fecha,
        length: result.length,
        genre_id: result.genre_id,
      }

      return res.render("moviesDetails", {
        movie: movie
      });
    });
  },
  create: (req, res) => {
    /* Evluo si el usuario esta en session... */

    if (req.session.user != undefined) {
         return res.render('register');
    } else {
        return res.render('login');
    }


    

  },
  store: function (req, res) {
    let info = req.body; //GUardamos los datos
    let movie = {//creamos la pelicula
      title: info.titulo,
      awards: info.premios,
      release_date: info.fecha,
      length: info.duracion,
      genre_id: info.genero
    }
    db.Movie.create(
      movie
    )
      .then((result) => {
        return res.redirect("/movies/all")
      })
  },
  edit: (req, res) => {
    let id = req.params.id;
    movie.findByPk(id)
      .then(
        (result) => {
          let fechaFormateada = new Date(result.release_date).toISOString().slice(0,10);

          let movieEdit = {
            title: result.title,
            awards: result.awards,
            rating:result.rating,
            release_date: fechaFormateada,
            length: result.length,
            genre_id: result.genre_id,
            creat_at : fechaFormateada
            id:id
          }
          return res.render('movieEdit',{movie:movieEdit})
        }
      )
  },
  update:(req,res)=>{
    let movieUpdate = req.body;
    let id = req.params.id;
    movie.update(
      {
        title: movieUpdate.titulo,
        awards: movieUpdate.premios,
        release_date: movieUpdate.fecha,
        length: movieUpdate.duracion,
        genre_id: movieUpdate.genero
      },
      {
        where:[
          {id:id}
        ]
      }
    )
    .then((result)=>{
      return res.redirect("/movies/all")
    })
  },
  destroy:(req,res)=>{
    let movieABorrar = req.params.id;
    movie.destroy(
      {
        where:[{id:movieABorrar}]
      }
    )
    .then((result)=>{
      return res.redirect("/movies/all")
    })
  }
};

module.exports = movieController;
