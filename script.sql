    
CREATE TABLE usuario(
	idusuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('interno','externo')
);

CREATE TABLE personal(
	idpersonal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apematerno VARCHAR(20) NOT NULL,
    apepaterno VARCHAR(20) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    fechaingreso DATE NOT NULL,
    idusuario INT,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);

CREATE TABLE cliente(
	idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    idusuario INT,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
    
CREATE TABLE nota(
	idnota INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    contenido VARCHAR(400) NOT NULL,
    idpersonal INT, 
    FOREIGN KEY (idpersonal) REFERENCES personal(idpersonal)
);

CREATE TABLE comentario(
	idcomentario INT AUTO_INCREMENT PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora TIMESTAMP NOT NULL,
    idnota INT, 
    idusuario INT, 
    FOREIGN KEY (idnota) REFERENCES nota(idnota),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);

CREATE TABLE respuesta(
	idrespuesta INT AUTO_INCREMENT PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora TIMESTAMP NOT NULL,
    idcomentario INT, 
    idusuario INT, 
    FOREIGN KEY (idcomentario) REFERENCES comentario(idcomentario),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);

INSERT INTO usuario (tipo) values ('interno');
INSERT INTO personal (nombre, apematerno, apepaterno, direccion, 
						fechaingreso, idusuario) 
VALUES ('Luisa Renatta', 'Garcia', 'Perez', 
		'AQUILES SERDAN 573, LA ARMONIA, 28020', 
        CURDATE(),LAST_INSERT_ID());
        
INSERT INTO usuario (tipo) values ('interno');
INSERT INTO personal (nombre, apematerno, apepaterno, direccion, 
						fechaingreso, idusuario) 
VALUES ('Enrique Raul', 'Herrera', 'Gonzalez', 
		'AROMA NO. 801, ANDRADE, 37370', 
        CURDATE(),LAST_INSERT_ID());
        
INSERT INTO usuario (tipo) values ('externo');
INSERT INTO cliente (nombre, idusuario) 
VALUES ('Jonathan Javier', LAST_INSERT_ID());

INSERT INTO usuario (tipo) values ('externo');
INSERT INTO cliente (nombre, idusuario) 
VALUES ('Alexis Gustavo', LAST_INSERT_ID());
        
INSERT INTO usuario (tipo) values ('externo');
INSERT INTO cliente (nombre, idusuario) 
VALUES ('Maria Estefania', LAST_INSERT_ID());

INSERT INTO nota (titulo,contenido,idpersonal)
VALUES ('Filtraron riña callejera entre Alfredo Adame y una mujer',
		'Sin conocerse más detalles al momento, se le puede ver 
        al actor forcejeando con una mujer y reclamándole que le 
        devuelva su celular', 1);
        
INSERT INTO nota (titulo,contenido,idpersonal)
VALUES ('México suma 44 mil 902 nuevos casos de covid y 475 muertes 
		en 24 horas',
		'Hasta el día de hoy, se tienen 13 mil 873 muertes 
        sospechosas por coronavirus, que incluyen las pendientes 
        por laboratorio (3 mil 124) y las que están en proceso de 
        dictaminación epidemiológica en el Sisver (10 mil 749).', 2);

INSERT INTO comentario (contenido, fecha, hora, idnota, idusuario)
VALUES ('Espero se resuelva la situacion', curdate(), curtime(), 1,3);

INSERT INTO comentario (contenido, fecha, hora, idnota, idusuario)
VALUES ('Es muy lamentable ese numero', curdate(), curtime(),2,4);

INSERT INTO comentario (contenido, fecha, hora, idnota, idusuario)
VALUES ('Ojala y se acabe rapido esto', curdate(), curtime(),2,1);

INSERT INTO respuesta (contenido, fecha, hora, idcomentario, idusuario)
VALUES ('Si, ya somos demasiados', curdate(), curtime(), 2,5);

INSERT INTO respuesta (contenido, fecha, hora, idcomentario, idusuario)
VALUES ('Tengo el presentimiento que esto va a durar otro año', curdate(), curtime(), 3,2);

