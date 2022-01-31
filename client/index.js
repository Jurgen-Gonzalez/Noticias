document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAllNews')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

function loadHTMLTable(data) {
    // console.log(data);
    let main = document.getElementsByClassName("main")[0];
    let news = "";
    let div = document.createElement("div");

    if (data.length === 0) {
        console.log('No hay noticias');
        news = "<p>No hay noticias</p>";
        div.innerHTML = news;
        main.appendChild(div);
        return;
    }


    data.forEach(function ({ idnota, titulo, contenido, idpersonal }) {
        let divCard = document.createElement("div");
        let divCardBody = document.createElement("div");
        let newsTitle = document.createElement("h3");
        let newsContent = document.createElement("p");

        divCard.className = "card";
        divCard.id = `${idnota}`;
        divCardBody.className = "card-body";
        divCardBody.id = `cardBody${idnota}`;
        newsTitle.className = "card-title";
        newsTitle.innerHTML = `<strong>${titulo}</strong>`;
        newsContent.className = "card-text";
        newsContent.innerHTML = `${contenido}`;

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(newsTitle);
        divCardBody.appendChild(newsContent);
        createCommentButton(idnota);

        div.appendChild(divCard);
    });

    main.appendChild(div);

}

function createCommentButton(idnota) {
    // console.log(`idnota: ${idnota}`);
    fetch(`http://localhost:3000/getComments/${idnota}`)
        .then(response => response.json())
        .then(data => loadCommentButton(data['data'], idnota));

}

function loadCommentButton(data, idnota) {
    let commentNum = data.length;
    let divComment = document.createElement("div");
    let commentButton = document.createElement("button");
    let divCardBody = document.getElementById(`cardBody${idnota}`);

    divComment.className = "boton-comentario";
    commentButton.type = "button";
    commentButton.className = "btn btn-link comentario";
    commentButton.id = `commentButton${idnota}`;

    // show 1 comentario or N comentarios
    commentButton.textContent = `${commentNum} 
                        comentario${commentNum === 1 ? '' : 's'}`;

    divComment.appendChild(commentButton);
    divCardBody.appendChild(divComment);

    commentButton.addEventListener('click', () => {
        let divCardBody = document.getElementById(`cardBody${idnota}`);
        data.forEach(function ({ idcomentario, contenido, fecha, hora, idnota, idusuario }) {

            // Do an AJAX call to show all the comments of the news
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let img = document.createElement("img");
                    let divComment = document.createElement("div");
                    let divImage = document.createElement("div");
                    let divUserTime = document.createElement("div");
                    let divUserComment = document.createElement("div");
                    let user = document.createElement("p");
                    let time = document.createElement("p");
                    let content = document.createElement("p");

                    divImage.className = "div-image horizontal-item"
                    divComment.className = "div-comment horizontal-item";
                    divUserComment.className = "horizontal-item";
                    img.src = "user.png";
                    img.alt = "Default user image";
                    img.className = "user-img";

                    time.textContent = `Enviado: ${String(fecha).substring(0, 10)} ${String(hora).substring(11, 19)}`;
                    time.className = "horizontal-item";
                    content.textContent = `${contenido}`;
                    content.className = "comment";

                    const json = JSON.parse(this.responseText);
                    const username = json.data.map(function (data) { return data.nombre });
                    user.innerHTML = `<strong>${username}</strong>`;
                    user.className = "horizontal-item";

                    divImage.appendChild(img);
                    divUserTime.appendChild(user);
                    divUserTime.appendChild(time);
                    divUserComment.appendChild(divUserTime);
                    divUserComment.appendChild(content);

                    divComment.appendChild(divImage);
                    divComment.appendChild(divUserComment);
                    divCardBody.appendChild(divComment);
                    // createUsername(idusuario);

                }
            };
            xhttp.open("GET", `http://localhost:3000/getUser/${idusuario}`, true);
            xhttp.send();
        });

    });
}

function createUsername(idusuario) {
    fetch(`http://localhost:3000/getUser/${idusuario}`)
        .then(response => response.json())
        .then(data => loadUser(data['data'], idusuario));
}