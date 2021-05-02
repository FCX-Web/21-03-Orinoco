//====================================================================
/*order confirmation*/

//data recovery
document.getElementById("amountValidated").innerHTML = parseInt(JSON.parse(localStorage.getItem("amountStorage"))) / 100 + " €";
document.getElementById("commandNumber").innerHTML = JSON.parse(localStorage.getItem("serverDatas"));

//reinitialization of the localstorage
localStorage.clear();

//basket update
basketUpDate();