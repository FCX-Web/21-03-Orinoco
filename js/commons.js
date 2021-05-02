//===================================================================
/*variables*/

//list of product category urls
let urlList = ["http://localhost:3000/api/teddies", "http://localhost:3000/api/cameras", "http://localhost:3000/api/furniture"];
// let urlList = ["https://oc-devweb-p5-api.herokuapp.com/api/teddies", "https://oc-devweb-p5-api.herokuapp.com/api/cameras", "https://oc-devweb-p5-api.herokuapp.com/api/furniture"];

//list of product categories
let groupList = ["peluches", "photos", "meubles"];

//front-back category links
let customList = { peluches: "colors", photos: "lenses", meubles: "varnish" };

//====================================================================
/*basket*/

//display of the header basket
let basketHeader = (file) => {
    let numberOfItems = parseInt(localStorage.getItem("basketLevel"));
    if (!numberOfItems) {
        document.getElementById('buttonBasket').innerHTML = '<a class="nav-link" href="' + file + '"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-secondary">(vide)</span></a>';
    } else {
        document.getElementById('buttonBasket').innerHTML = '<a class="nav-link" href="' + file + '"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-danger">' + numberOfItems + '</span></a>';
    }
};

//update of the product quantity in the basket
let basketUpDate = () => {
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage")) || [];
    let numberOfItems = 0;
    for (let i = 0; i < basketDatas.length; i++) {
        numberOfItems += parseInt(basketDatas[i].itemQuantity, 10);
    }

    localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));
    basketHeader("../html/basket.html");
}

//===================================================================
/*request datas*/

//get datas api
function getDatas(url) {
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                const response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        request.open("GET", url);
        request.send();
    })
};

//post datas api
function postDatas(url, file) {
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                const response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        request.open("POST", url + "/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(file));
    })
};