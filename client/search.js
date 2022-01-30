document.addEventListener('DOMContentLoaded', function () {
    let searchBtn = document.getElementById('search-button');

    searchBtn.addEventListener('click', () => {
        let searchInput = document.getElementById("search-input");

        if (searchInput.value === '')
            return;

        let searchForComment = choiceOfSearch();

        if (searchForComment)
            searchComment(searchInput.value);
        else
            searchResponse(searchInput.value);
    });
});


function choiceOfSearch() {
    let searchChoice = document.querySelectorAll("input[name='search-choice']");
    let searchForComment = true;
    searchChoice.forEach(choice => {
        if (choice.checked) {
            if (choice.value === 'comment') searchForComment = true;
            else if (choice.checked && choice.value === 'response') searchForComment = false;
        }
    });
    return searchForComment;
}

function searchResponse(searchInput) {
    fetch(`http://localhost:3000/searchResponse/${searchInput}`)
        .then(response => response.json())
        .then(data => loadResponse(data['data'], searchInput));
}

function searchComment(searchInput) {
    fetch(`http://localhost:3000/searchComment/${searchInput}`)
        .then(response => response.json())
        .then(data => loadComments(data['data'], searchInput));
}

// function getUsername(commentData, idusuario) {
//     console.log('i am in username');
//     fetch(`http://localhost:3000/getUser/${idusuario}`)
//         .then(response => response.json())
//         .then(data => loadUser(commentData, data['data']));
// }


function loadComments(data, searchInput) {
    if (!noResults(data))
        return;

    // clean the content of results before every result display
    let divResults = document.getElementsByClassName('results')[0];
    divResults.innerHTML = "";

    data.forEach(function ({ idcomentario, contenido, fecha, hora, idnota, idusuario }) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText);
                const username = json.data.map(function (data) { return data.nombre });

                let card = document.createElement("div");
                let divCardBody = document.createElement("div");

                let img = document.createElement("img");
                let divComment = document.createElement("div");
                let divImage = document.createElement("div");
                let divUserTime = document.createElement("div");
                let divUserComment = document.createElement("div");
                let user = document.createElement("p");
                let time = document.createElement("p");
                let content = document.createElement("p");

                card.className = "card";
                divImage.className = "div-image horizontal-item"
                divComment.className = "div-comment horizontal-item";
                divUserComment.className = "horizontal-item";
                img.src = "user.png";
                img.alt = "Default user image";
                img.className = "user-img";

                time.textContent = `Enviado: ${String(fecha).substring(0, 10)} 
                                        ${String(hora).substring(11, 19)}`;
                time.className = "horizontal-item";

                content.innerHTML = createContentHighlighted(searchInput, contenido);
                content.className = "comment";

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
                card.appendChild(divCardBody);
                divResults.appendChild(card);


            };
        };
        xhttp.open("GET", `http://localhost:3000/getUser/${idusuario}`, true);
        xhttp.send();
    });
}

function loadResponse(data, searchInput) {
    if (!noResults(data))
        return;

    // clean the content of results before every result display
    let divResults = document.getElementsByClassName('results')[0];
    divResults.innerHTML = "";

    data.forEach(function ({ idrespuesta, contenido, fecha, hora, idcomentario, idusuario }) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText);
                const username = json.data.map(function (data) { return data.nombre });

                let card = document.createElement("div");
                let divCardBody = document.createElement("div");

                let img = document.createElement("img");
                let divComment = document.createElement("div");
                let divImage = document.createElement("div");
                let divUserTime = document.createElement("div");
                let divUserComment = document.createElement("div");
                let user = document.createElement("p");
                let time = document.createElement("p");
                let content = document.createElement("p");

                card.className = "card";
                divImage.className = "div-image horizontal-item"
                divComment.className = "div-comment horizontal-item";
                divUserComment.className = "horizontal-item";
                img.src = "user.png";
                img.alt = "Default user image";
                img.className = "user-img";

                time.textContent = `Enviado: ${String(fecha).substring(0, 10)} 
                                        ${String(hora).substring(11, 19)}`;
                time.className = "horizontal-item";

                content.innerHTML = createContentHighlighted(searchInput, contenido);
                content.className = "comment";

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
                card.appendChild(divCardBody);
                divResults.appendChild(card);


            };
        };
        xhttp.open("GET", `http://localhost:3000/getUser/${idusuario}`, true);
        xhttp.send();
    });
}

function createContentHighlighted(searchInput, contenido) {
    let result, indexes = [];
    let regex = new RegExp(`${searchInput}`, 'gi');

    while ((result = regex.exec(contenido))) {
        indexes.push(result.index);
    }

    //indexes is the array of the index number where the occurence starts
    if (indexes.length == 0) {
        return contenido;
    }
    else {
        let lastIndex = 0, newContent = '';
        for (let index = 0; index < indexes.length; index++) {
            newContent += contenido.substring(lastIndex, indexes[index]);
            lastIndex = indexes[index];

            // the occurence is highlighted (can't use <mark> because it adds extra padding)
            newContent += '<span class="highlight">' + contenido.substring(lastIndex, lastIndex
                + searchInput.length) + '</span>';
            lastIndex += searchInput.length;
        }
        newContent += contenido.substring(lastIndex);
        // console.log(`New Content: ${newContent}`);

        return newContent;
    }
}

function noResults(data) {
    if (data.length === 0) {
        let divResults = document.getElementsByClassName('results')[0];
        let noresults = document.createElement("p");
        let card = document.createElement("div");

        noresults.className = "centered";
        noresults.textContent = "No se encuentran ocurrencias";
        divResults.innerHTML = "";
        card.className = "card";

        card.appendChild(noresults);
        divResults.appendChild(card);
        return false;
    }
    else return true;

}