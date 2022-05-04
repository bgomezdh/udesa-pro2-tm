const db    = require('../database/models');
const movie = db.Movie; /* El alias que le pondre a mi modelo */

const movieController = {
    findAll : function (req, res) {
        
        movie.findAll().then((result) => {
            
            return res.send(result)
            
        }).catch((err) => {
            
            return res.send(err)
        });
    }
    
}

module.exports = movieController;