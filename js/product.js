//====================================================================
/*product card*/

//extraction of data from the url
let urlParams = new URLSearchParams(document.location.search.substring(1));
let itemId = urlParams.get("id");
let itemCategory = urlParams.get("category");
let itemIndex = groupList.indexOf(itemCategory);

//determination of the product category
let custom = customList[itemCategory];

//update of the header basket
basketHeader("../html/basket.html");

//data collection and insertion
getDatas(urlList[itemIndex]).then((response) => {
    for (elt of response) {
        switch (elt._id) {
            case itemId:
                document.getElementById("productImage").setAttribute("src", elt.imageUrl);
                document.getElementById("productName").innerHTML = elt.name;
                document.getElementById("productDescription").innerHTML = elt.description;

                for (let i = 0; i < elt[custom].length; i++) {
                    document.getElementById("productCustom").insertAdjacentHTML("beforeend", '<option value="' + elt[custom][i] + '">' + elt[custom][i] + "</option>");
                }

                document.getElementById("productPrice").innerHTML = elt.price / 100;
                document.getElementById("productId").innerHTML = elt._id;
                break;
        };
    }
});

//validation of the choices and saving in localstorage
let sendToBasket = () => {

    if (document.getElementById("productCustom").value === "Faites votre choix") {
        alert("Merci de choisir une option de personnalisation");
    } else if (!document.getElementById("idQuantity").value) {
        alert("Merci de saisir une quantité");
    } else {
        if (window.confirm("Voulez vous ajouter cette référence au panier ?", "", "")) {
            let itemChoiceOption = document.getElementById("productCustom").value;
            let itemQuantity = parseInt(document.getElementById("idQuantity").value, 10);
            let itemDatas = { itemId, itemChoiceOption, itemQuantity };
            let basketDatas = JSON.parse(localStorage.getItem("basketStorage")) || [];

            let k = 0;
            for (let elt of basketDatas) {
                switch (itemId) {
                    case elt.itemId:
                        if (elt.itemChoiceOption == itemChoiceOption) {
                            elt.itemQuantity = elt.itemQuantity + itemQuantity;
                            k++;
                        }
                        break;
                }
            }
            if (k === 0) {
                basketDatas.push(itemDatas);
            }
            basketDatas = localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
            basketUpDate();
        }
    }
};

document.getElementById("addItem").addEventListener("click", () => {
    sendToBasket()
});