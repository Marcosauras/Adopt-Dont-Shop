let apiKey = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;
let dogCards = document.getElementById("dog-cards");
let animalSearch = document.getElementById("animal-search");
const dogForm = document.getElementById("dog-form");

// grabs zip code
function grabZipCode(){
  let zipCode = document.querySelector("#zip-code").value.trim();
  grabAnimals(zipCode)
}
// collects the animals info
function grabAnimals(usersZipCode) {
  let zipCode = usersZipCode
  console.log(zipCode);

  // grabs the access token from Pet Finders API
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials&client_id=" +
      apiKey +
      "&client_secret=" + secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      token = data.access_token;
    })
    .then(() => {
      //calls the api but this time with the token Oauth
      // TODO put user inputs into this fetch
      fetch(
        "https://api.petfinder.com/v2/animals?type=dog&location=" +
          zipCode +
          "&status=adoptable",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => showAnimals(data.animals));
      // catches the error
    })
    .catch((err) => console.error(err));
}

function showAnimals(pet) {
  console.log(pet);

  pet.forEach((pet) => {
    const div = document.createElement("div");

    div.classList.add("card", "card-body", "bg-stone-300", "bg-opacity-50", "lg:max-w-4xl", "lg:flex", "justify-center");
    div.innerHTML = `
      <div class="p-5 pet-card ">
        <div class="pet-container block contents md:flex md:justify-start">
        <img class="pet-image mb-5 mr-5 max-h-96" src="${
          pet.photos[0] ? pet.photos[0].medium : ""
        }">
          <div  class="mb-5">
            <div>
              <ul class="">
              <li class=""><strong>Name: </strong>${pet.name} (${pet.age})</li>
              <li  class="text-secondary"><strong>Breed: </strong>${pet.breeds.primary}</li>
                <li><strong>Location: </strong>${pet.contact.address.city}, ${
      pet.contact.address.state
    } ${pet.contact.address.postcode},${pet.contact.address.country} </li>
                <li class="">${pet.contact.phone
                    ? `<li class=""><strong>Phone: </strong>${pet.contact.phone}</li>`
                    : ``}</li>
                ${pet.contact.email
                    ? `<li class=""><strong>Email: </strong>${pet.contact.email}</li>`
                    : ``}
                <li class=""><strong>Shelter ID: </strong>${pet.organization_id}</li>
              </ul>
              <a class="font-extrabold" href="${pet.url}" target="_blank">Click Here For more info</a>
            </div>
            <div>
              <iframe class = "max-w-96 max-h-96" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7PriPa6496JhFyFBICpjkcjkxgyUukgM
                &q=${pet.contact.address.city}+${pet.contact.address.state}+${
      pet.contact.address.postcode
    }">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;
    dogCards.append(div);
  });
}

// listens for a submit on the webpage and will set the zipcode value for the rest of the webpage
addEventListener("submit", (event) => {
  let zipCodeInput = document.querySelector("#zip-code").value.trim();
  // text.textContent = number.target.value
  grabZipCode()
  saveZipCode(zipCodeInput);
});
// stores the zipcode
var saveZipCode = function (zipCodeInput) {
  localStorage.setItem("zipCode", JSON.stringify(zipCodeInput));
};

var oldZipCodeSubmitHandler = function (e) {
  var storedZipCodes = JSON.parse(localStorage.getItem("zipCode"));
  // forces the zipcode back into a integer
  var storedZipCodes = parseInt(storedZipCodes);
  console.log(storedZipCodes);
if (isNaN(storedZipCodes)){
  return;
} else{
  grabAnimals(storedZipCodes)
}
};

oldZipCodeSubmitHandler();