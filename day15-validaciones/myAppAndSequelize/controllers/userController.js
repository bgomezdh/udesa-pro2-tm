
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

        let errors = {};

        if (info.email == "") {
            errors.message = "El input de email esta vacio";
            res.locals.errors = errors;
            return res.render("login");
            
        } else if (info.password == ""){
            errors.message = "El input de password esta vacio";
            res.locals.errors = errors;
            return res.render('login')

        }  else {
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
                        /* Este paso se ejecuta por cada validacion que queramos */
                        errors.message = "La clave es incorrecta"
                        res.locals.errors = errors;
                        return res.render('login');
                    }
                    
                } else {
                    /* Este paso se ejecuta por cada validacion que queramos */
                    errors.message = "No existe el email " + info.email
                    res.locals.errors = errors;
                    return res.render('login');
                }
            });
        }

        

        





    },
    register : (req, res) => {
        return res.render("registerUser",);
    },
    procesarRegister : (req, res) => {
        let info = req.body;
        /* validaciones del form */
        let errors = {};

        if (info.name == "") {
            errors.message = "El input de nombre esta vacio";
            res.locals.errors = errors;
            return res.render('registerUser')
            
        } else if (info.email == ""){
            errors.message = "El input de email esta vacio";
            res.locals.errors = errors;
            return res.render('registerUser')

        }  else if (info.password == ""){
            errors.message = "El input de password esta vacio";
            res.locals.errors = errors;
            return res.render('registerUser')

        } else {

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
            });
            
        }

    }

}

module.exports = userController;