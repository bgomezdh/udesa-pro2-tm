const alumnos = require('../db/alumnos');


const alumnoController = {
    index : function (req, res) {
        return res.send(alumnos.lista);
    },

    show : function (req, res) {
        let alumnosAprobados= [];
        for(let i = 0; i < alumnos.lista.length; i++){
            if(alumnos.lista[i].puntos >= 6){
                alumnosAprobados.push(alumnos.lista[i])
            }
        }
    
        return res.send(alumnosAprobados);  
    }
}

module.exports = alumnoController;