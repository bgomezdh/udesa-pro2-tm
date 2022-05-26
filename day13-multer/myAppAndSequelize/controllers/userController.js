
const db = require("../database/models");
const user = db.User;

/* Requiriendo el modulo de bcryptjs .. */
const bcryptjs = require("bcryptjs");

const userController = {
    login : (req, res) => {
        return res.render("login");
    },
    precesarLogin : (req, res) => {
       
        let info = req.body;

        user.findOne({
            where : [{ email :  info.email}]
        }).then((result) => {
            if (result != null) {
                let claveCorrecta = bcryptjs.compareSync(info.password  , result.password )
                if (claveCorrecta) {
                    req.session.user = result.dataValues;

                    /* Evaluar si el checkbox esta en true o existe */

                    if (req.body.remember != undefined) {
                        res.cookie('userId', req.session.user.id, { maxAge : 1000 * 60 * 5})
                    }
                   
                    return res.redirect("/movies/all")
                } else {
                    return res.send("Existe el mail " + result.email + " pero la clave es incorrecta")
                }
                
            } else {
                return res.send("No xiste el mail " + info.email) 
            }
        });

        





    },
    register : (req, res) => {
        return res.render("registerUser",);
    },
    procesarRegister : (req, res) => {
        let info = req.body;
        let passEncriptada = bcryptjs.hashSync(info.password, 10);
        let imgPerfil = req.file.filename;

        let userParaGuardar = {
            name : info.name,
            email : info.email,
            password : passEncriptada,
            remember_token: "false",
            created_at : new Date(),
            updated_at : new Date(),
            img : imgPerfil
        }

        user.create(userParaGuardar)
        .then((result) => {
            return res.redirect("/users/login")
        })
        
    }

}

module.exports = userController;