const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get('/post', (request, response) => {
app.get('/insertNews/:titulo/:contenido/:idpersonal', (request, response) => {
    // app.post('/insertNews', (request, response) => {
    const titulo = request.params.titulo;
    const contenido = request.params.contenido;
    const idpersonal = request.params.idpersonal;
    console.log(`${titulo}, ${contenido}, ${idpersonal}`);
    const db = dbService.getDbServiceInstance();

    const result = db.insertNews(titulo, contenido, idpersonal);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// create
app.post('/insertNews/:titulo', (request, response) => {
    // app.post('/insertNews/:titulo&:contenido&:idpersonal', (request, response) => {
    console.log('titulo');
    const { titulo } = request.body;
    // const { titulo, contenido, idpersonal } = request.body;
    // console.log(`${titulo}, ${contenido}, ${idpersonal}`);
    const db = dbService.getDbServiceInstance();

    const result = db.insertNews(titulo);
    // const result = db.insertNews(titulo, contenido, idpersonal);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// read
app.get('/getAllNews', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllNews();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/getComments/:idnota', (request, response) => {
    const { idnota } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getComments(idnota);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/getPersonnel', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getPersonnel();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/getUser/:idusuario', (request, response) => {
    const { idusuario } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getUser(idusuario);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/searchComment/:comentario', (request, response) => {
    const { comentario } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByComment(comentario);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/searchResponse/:respuesta', (request, response) => {
    const { respuesta } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByResponse(respuesta);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));