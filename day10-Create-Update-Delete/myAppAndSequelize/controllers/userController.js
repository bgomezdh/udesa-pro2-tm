const db = require("../database/models");
const user = db.User; /* El alias que le pondre a mi modelo */

/* Requerir Modulo de bcryptjs */
const bcrypt = require("bcryptjs");


const userController = {
  login: (req, res) => {
    return res.render("login");
  },
  procesarLogin: (req, res) => {
    let emailBuscado = req.body.email;
    let pass = req.body.password;
    user
      .findOne({
        where: [{ email: emailBuscado }],
      })
      .then((result) => {
        if (result != null) {
              let claveCorrecta = bcrypt.compareSync(pass, result.password);
              if (claveCorrecta) {
                return res.send("Existe el mail " + emailBuscado + " y la pass es correcta");
              } else {
                return res.send("La pass es incorrecta");
              }
        } else {
          return res.send("No existe el mail" + emailBuscado);
        }
      });
  },
  register: (req, res) => {
    return res.render("registerUser");
  },
  procesarRegister: (req, res) => {
    let info = req.body; //Guardamos los datos
    let user = {//creamos la pelicula
      name: info.name,
      email: info.email,
      password: bcrypt.hashSync(info.password, 10),
      remember_token: "fasle",
      created_at : new Date(),
      updated_at : new Date()
    }
    db.User.create(
      user
    )
      .then((result) => {
        return res.redirect("/users/login")
      })
  }
};

module.exports = userController;
