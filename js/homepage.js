//====================================================================
//basket

basketHeader("./html/basket.html");

//====================================================================
//categories

for (let i = 0; i < urlList.length; i++) {
    getDatas(urlList[i], groupList[i]).then((response) => {

        document.getElementById("category").insertAdjacentHTML('beforeend', '<div class="col"> <div class="card h-100"><div class="card-body"><h3 id="category_title" class="card-title text-center text-capitalize">' + groupList[i] + '</h3></div><img id="category_img" src="' + response[1].imageUrl + '" alt="' + response[1].name + '" class="card-img-top img-thumbnail"><div class="card-footer text-center"><a id="category_a" href="' + '#' + groupList[i] + 'List" class="btn btn-light stretched-link"><h4 class="font-weight-bold">Consulter</h4></a></div></div></div>');

    });
}

//====================================================================
//catalogue

for (let i = 0; i < urlList.length; i++) {
    getDatas(urlList[i], groupList[i]).then((response) => {

        document.getElementById("catalogue").insertAdjacentHTML("beforeend", '<h3 id="' + groupList[i] + 'List" class="mt-5 mb-3 text-capitalize">' + groupList[i] + '</h3><div id="' + groupList[i] + '" class="row justify-content-around">');

        for (elt of response) {
            document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '<div class="col-6-md card mb-3 mx-1" style="max-width: 550px;"><div class="row g-0"><div class="col-md-6"><img src="' + elt.imageUrl + '" class="d-block w-100 img-thumbnail" alt="..."></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' + elt.name + '</h5><h5 class="card-text">' + elt.price / 100 + ' €</h5><a href="./html/product.html?id=' + elt._id + '&category=' + groupList[i] + '" class="btn btn-primary stretched-link">En savoir +</a></div></div></div></div>');
        }

        document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '</div>');

    });
}