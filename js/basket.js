//====================================================================
/*basket management*/

/*functions*/
//update of the total amount of the basket
let totalAmount = () => {
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
    let amount = 0;
    for (let i = 0; i < basketDatas.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (basketDatas[i].itemId) {
                        case elt._id:
                            amount += elt.price * parseInt(basketDatas[i].itemQuantity, 10);
                            break;
                    };
                    localStorage.setItem("amountStorage", JSON.stringify(amount));
                    if (i === basketDatas.length - 1) {
                        document.getElementById("totalAmount").innerHTML = amount / 100;
                    } else {

                    }
                }
            });
        };
    };
};

//change of basket quantities
let changeItemQuantity = (price, i, quantity) => {
    document.getElementById("totalAmount").innerHTML = JSON.parse(localStorage.getItem("amountStorage")) / 100;

    let numberOfItems = JSON.parse(localStorage.getItem("basketLevel"));
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));

    numberOfItems = numberOfItems - basketDatas[i].itemQuantity + parseInt(quantity, 10);
    basketDatas[i].itemQuantity = parseInt(quantity, 10);
    document.getElementById("quantity-" + i).setAttribute("value", parseInt(quantity, 10));
    document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * parseInt(quantity, 10)) / 100 + " €";

    localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
    localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));

    if (!numberOfItems && numberOfItems != 0) {
        document.getElementById("basket").style.display = "none";
        document.getElementById("emptybasket").style.display = "block";
        basketUpDate();
    } else {
        totalAmount();
        document.getElementById("totalAmount").innerHTML = JSON.parse(localStorage.getItem("amountStorage")) / 100;
        basketUpDate();
    }
}

//deletion of an article
let removeItem = (i) => {
    basketDatas = JSON.parse(localStorage.getItem("basketStorage"));

    if (window.confirm("Confirmez-vous la suppression de cet article ?", "", "")) {
        document.getElementById("item-" + i).remove();
        basketDatas.splice(i, 1);
        localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
        let numberOfItems = 0;
        for (let k = 0; k < basketDatas.length; k++) {
            numberOfItems += basketDatas[k].itemQuantity;
        }
        localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));

        if (!numberOfItems) {
            document.getElementById("basket").style.display = "none";
            document.getElementById("emptybasket").style.display = "block";
            basketUpDate();
        } else {
            totalAmount();
            basketUpDate();
            window.location.reload();
        }
    }
}

//list of basket items
let showBasket = () => {
    for (let i = 0; i < basketDatas.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case basketDatas[i].itemId:
                            document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketDatas[i].itemChoiceOption + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '"  class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketDatas[i].itemQuantity + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketDatas[i].itemQuantity) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

                            document.getElementById("quantity-" + i).addEventListener("change", () => {
                                changeItemQuantity(document.getElementById("eltPrice-" + i).innerHTML * 100, i, document.getElementById("quantity-" + i).value);
                            });

                            document.getElementById(i).addEventListener("click", () => {
                                removeItem(document.getElementById(i).id);
                            });

                            break;
                    };
                }
            });
        }
    };
};

//order validation form
let command = () => {
    document.getElementById("sendform").addEventListener("click", (event) => {
        event.preventDefault();
        formValidation();
    });
};

//order validation form datas
let formValidation = () => {
    let firstName = document.getElementById("prenom").value;
    let lastName = document.getElementById("nom").value;
    let address = document.getElementById("adresse").value;
    let city = document.getElementById("ville").value;
    let email = document.getElementById("email").value;
    let cp = document.getElementById("codepostal").value;
    let tel = document.getElementById("tel").value;

    let checkLength = 20;
    let checkNumber = /[0-9]/;
    let checkSpecialChar = /^-|[&"#{([|\@)\]=}+"£$%*?,.;/!]/;
    let checkCp = /^[0-9]{5}$/;
    let checkEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    let checkTel = /^0[1-9]([-. ]?[0-9]{2}){4}$/;

    if (!firstName || !lastName || !address || !city || !email || !cp || !tel) {
        alert("Un ou plusieurs champs n'ont pas été remplis.\n\nMerci de rectifier");
    } else if (firstName.length > checkLength || lastName.length > checkLength || address.length > checkLength || city.length > checkLength) {
        alert("Les champs Prénom, Nom et Ville sont limités à 20 caractères\n\nMerci de rectifier");
    } else if (checkNumber.test(firstName) || checkNumber.test(lastName) || checkNumber.test(city)) {
        alert("Les champs Prénom, Nom et Ville n'acceptent pas les chiffres, mais uniquement les lettres et caractères accentués");
    } else if (checkSpecialChar.test(firstName) || checkSpecialChar.test(lastName) || checkSpecialChar.test(city)) {
        alert("Les champs Prénom, Nom et Ville n'acceptent pas les caractères spéciaux, mais uniquement les lettres et caractères accentués\n\nSeul le tiret '\-' est accepté, sauf en premier caractère");
    } else if (checkSpecialChar.test(address)) {
        alert("Le champs Adresse n'accepte pas les caractères spéciaux, mais uniquement les lettres, les nombres et caractères accentués");
    } else if (!checkCp.test(cp)) {
        alert("Le format du code postal n'est pas valide\n\nMerci de rectifier");
    } else if (!checkEmail.test(email)) {
        alert("Le format de votre adresse email n'est pas valide\n\nIl doit être de la forme : monemail@pasta.com\n\nMerci de rectifier");
    } else if (!checkTel.test(tel)) {
        alert("Le format de votre numéro de téléphone n'est pas valide\n\nIl doit être de la forme : 0617799331, 06 17 79 93 31, 06.17.79.93.31 ou 06-17-79-93-31\n\nMerci de rectifier");
    } else if (!document.getElementById("cgu").checked) {
        alert("Merci d'accepter les conditions générales d'utilisation et de vente");
    } else {
        if (window.confirm("Merci de vérifier vos informations avant de valider : \n\n" + firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.toUpperCase() + "\n" + address + "\n" + cp + " " + city + "\nEmail : " + email + "\nTél : " + tel, "", "")) {
            let products = [];
            let contact = { firstName, lastName, address, city, email };
            // for (let elt of basketDatas) {
            //     products.push(elt.itemId);
            // }
            products.push(basketDatas[0].itemId);
            let dataTransfer = { contact, products };

            for (let url of urlList) {
                postDatas(url, dataTransfer).then((response) => {
                    localStorage.setItem("serverDatas", JSON.stringify(response.orderId));
                    document.location.href = "./purchase.html";
                });
            }
        }
    }
};

//================================================================//
/*main*/

let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
let basketTotalItems = JSON.parse(localStorage.getItem("basketLevel"));

basketUpDate();

if (!basketTotalItems) {
    document.getElementById("orderform").style.display = "none";
} else {
    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<h2 class="d-flex justify-content-lg-center mb-3">Détail de votre commande</h2> <div> <div id="basketCollection">');

    showBasket();

    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<div class="row"> <div class="col-12 d-flex mb-5 justify-content-end"> <h3 class="text-danger text-italic mt-3"> <span>Montant total de votre panier: </span> <span id="totalAmount"></span> <span> €</span></h3> </div> </div> <div class="d-flex justify-content-center mb-5"> <a href="../index.html" class="btn btn-primary mr-3">Continuer mes achats</a> <a href="#" id="vider" class="btn btn-warning mr-3">Vider mon panier</a> <a href="#" id="validation" class="btn btn-success">Valider ma commande</a> </div>');

    document.getElementById("orderform").style.display = "none";
    document.getElementById("emptybasket").style.display = "none";

    totalAmount();

    document.getElementById("validation").addEventListener("click", () => {
        document.getElementById("basket").style.display = "none";
        document.getElementById("orderform").style.display = "block";
        command();
    });

    document.getElementById("vider").addEventListener("click", () => {
        if (window.confirm("Confirmez-vous la suppression de tous les articles du panier ?", "", "")) {
            localStorage.clear();
            document.getElementById("basket").style.display = "none";
            document.getElementById("emptybasket").style.display = "block";
            basketUpDate();
        }
    });
}