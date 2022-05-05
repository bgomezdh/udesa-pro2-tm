USE catalogo;

CREATE TABLE usuario (
/*	nombreColumna		tipoDato		Restricciones*/
	id	INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre 			VARCHAR(50)			NOT NULL,
    apellido 		VARCHAR(50)			NOT NULL,
    email 			VARCHAR(50)			NOT NULL,
    usuario 		VARCHAR(50)			NOT NULL,
    constrasenia 	VARCHAR(50)			NOT NULL,
    fechaNacimiento	DATE 				NOT NULL,
    numeroDocumento	INT 				NOT NULL,
    foto			VARCHAR(300)		
);

CREATE TABLE `catalogo`.`producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(45) NULL,
  `nombre_producto` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));