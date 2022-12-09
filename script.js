// grab zipcode and save it
// make button to go back to zipcode
// make buttons stay even if you refresh page

let usersZipCode = [];
let pastSearchZipCodes = document.querySelector(".userLastZipCode")
const text = document.querySelector('text');

addEventListener('submit', event => {
let zipCodeInput = document.querySelector("#zip-code").value.trim();
// text.textContent = number.target.value
saveZipCode(zipCodeInput);
oldZipCodes(zipCodeInput)
})

var saveZipCode = function (zipCodeInput) {
localStorage.setItem("zipCode", JSON.stringify(zipCodeInput))
}

var oldZipCodes = function(e) {
var storedZipCodes = JSON.parse(localStorage.getItem("zipCode"));
console.log(storedZipCodes)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = storedZipCodes;
    pastSearchEl.classList = "zip-code-btn";
    pastSearchEl.setAttribute("data-zipCode", storedZipCodes);
    pastSearchEl.setAttribute("type", "submit");
    pastSearchZipCodes.prepend(pastSearchEl)

}
oldZipCodes();

document.querySelector('.zip-code-btn').addEventListener("click", pastZipCodeSubmitHandler)