const data = {
  usuario: {
                id_usuario: 1,
                nombre: "Brian",
                apellido: "Gomez",
                email: "bgomez@gmail.com",
                usuario: "esBrian182",
                constrasenia: "12345",
                fechaNacimiento: "1993-03-12",
                numeroDocumento: 28740858,
                foto: "/images/users/brianGomez.png"
  },

  productos: [
                {
                img: "/images/products/jaguarXj.jpg",
                nombre: "Jaguar XJ",
                descripcion:"El Lexus RZ 2023  el Subaru Solterra",
                anio: 2022,
                id: 6,
                comentarios: "Comentarios: 29",
                },
            ],

  comentarios: [
                    {
                    nombre: "Martín",
                    comentario:"Es un auto con un motor muy potente ideal para los viajes largos",
                    imagen: "/images/users/user1.jpg",
                    },
                ],
};

module.exports = data;
