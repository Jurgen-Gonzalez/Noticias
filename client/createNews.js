// var request = require('request');
document.addEventListener('DOMContentLoaded', function () {
    fetch(`http://localhost:3000/getPersonnel`)
        .then(response => response.json())
        .then(data => loadPersonnel(data));
});

function loadPersonnel(data) {
    let personnel = `${data['data'][0].nombre}`;
    let idperson = `${data['data'][0].idpersonal}`;
    let userSubmit = document.getElementById('user-submit');
    let submitBtn = document.getElementById('submit-news');

    console.log(`idperson: ${idperson}`);
    userSubmit.innerHTML = `Enviar como: <strong>${personnel}</strong>`;
    submitBtn.addEventListener('click', () => {
        let newsTitle = document.getElementsByName("title")[0];
        let newsContent = document.getElementsByName("content")[0];

        console.log(`Titulo: ${newsTitle.value}`);
        console.log(`Valor titulo: ${newsTitle.value}`);
        // console.log(`Titulo: ${newsTitle}`);
        console.log(newsContent.value);
        console.log(idperson);
        // insertNews(newsTitle.value, newsContent.value,
        //     idperson);
    });
}

// function updateClient(postData) {
//     var clientServerOptions = {
//         uri: `http://localhost:3000/insertNews/${titulo}`,
//         body: JSON.stringify(postData),
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     request(clientServerOptions, function (error, response) {
//         console.log(error, response.body);
//         return;
//     });
// }


function insertNews(titulo) {
    // function insertNews(titulo, contenido, idpersonal) {
    fetch(`http://localhost:3000/insertNews/${titulo}`, {
        // fetch(`http://localhost:3000/insertNews/${titulo}&${contenido}&${idpersonal}`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            titulo: titulo,
            // contenido: contenido,
            // idpersonal: idpersonal,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Inserted in Database');
            alert('Noticia guardada exitosamente');
        });
}

