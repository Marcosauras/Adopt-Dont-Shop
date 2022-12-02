
let apiKey = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;
let dogCards = document.getElementById("dog-cards")

addEventListener('load', grabAnimals)


function grabAnimals(e){
    e.preventDefault();

    // grabs the access token from Pet Finders API
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then((res) => res.json())
.then((data) => {
    token = data.access_token
})
.then(() =>{
    //calls the api but this time with the token Oauth
    // TODO put user inputs into this fetch
    fetch('https://api.petfinder.com/v2/animals?type=dog&status=adoptable', {
    headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
).then((res) => res.json())
.then((data) => showAnimals(data.animals));
   // catches the error
}).catch((err) => console.error(err));
}

function showAnimals(pet) {
  console.log(pet)
    // clear results first
    dogCards.innerHTML = "";

    pet.forEach(pet => {
        const div = document.createElement("div");
        div.classList.add("card", "card-body", "mb-3");
        div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
          <p class="text-secondary">${pet.breeds.primary}</p>
          <p>${pet.contact.address.city}, ${pet.contact.address.state} ${
      pet.contact.address.postcode
    }</p>
          <ul class="list-group">
            <li class="list-group-item">${
              pet.contact.phone
                ? `<li class="list-group-item">Phone: ${pet.contact.phone}</li>`
                : ``}</li>
            ${
              pet.contact.email
                ? `<li class="list-group-item">Email: ${pet.contact.email}</li>`
                : ``
            }
            <li class="list-group-item">Shelter ID: ${pet.organization_id}</li>
          </ul>
        </div>
        <div class="col-sm-6">
        <img class="img-fluid rounded-circle mt-2" src="${
          pet.photos[0] ? pet.photos[0].medium : ""
        }">
        </div>
      </div>
    `;
        dogCards.append(div)
        
    });

}