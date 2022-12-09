let apiKey = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;
let dogCards = document.getElementById("dog-cards")
let animalSearch = document.getElementById("animal-search")
const dogForm = document.getElementById("dog-form")


addEventListener('submit', grabAnimals)



function grabAnimals(e){
    e.preventDefault();
    let zipCode = document.querySelector("#zip-code").value.trim();
    console.log(zipCode)

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
    fetch('https://api.petfinder.com/v2/animals?type=rabbit&location='+ zipCode + '&status=adoptable', {
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

        div.classList.add("card", "card-body", "bg-blue-300");
        div.innerHTML = `
      <div class=" display-flex">
        <div class="pet-container p-5">
        <img class="rounded-md" src="${
          pet.photos[0] ? pet.photos[0].medium : ""
        }">
        
          <h4>${pet.name} (${pet.age})</h4>
          <p class="text-secondary">${pet.breeds.primary}</p>
          <p>${pet.contact.address.city}, ${pet.contact.address.state} ${
      pet.contact.address.postcode},${pet.contact.address.country}</p>
          <ul class="">
            <li class="">${
              pet.contact.phone
                ? `<li class="">Phone: ${pet.contact.phone}</li>`
                : ``}</li>
            ${
              pet.contact.email
                ? `<li class="">Email: ${pet.contact.email}</li>`
                : ``
            }
            <li class="">Shelter ID: ${pet.organization_id}</li>
          </ul>
        </div>
        <iframe
         width="600"
         height="450"
         style="border:0"
         loading="lazy"
         allowfullscreen
         referrerpolicy="no-referrer-when-downgrade"
         src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7PriPa6496JhFyFBICpjkcjkxgyUukgM
         &q=Space+Needle,${pet.contact.address.city}+${pet.contact.address.state}">
        </iframe>
      </div>
    `;
        dogCards.append(div)
        
    });

}

