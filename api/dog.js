
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
    fetch('https://api.petfinder.com/v2/animals?type=dog&location='+ zipCode + '&status=adoptable', {
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

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.606110, lng: -121.457497},
    zoom: 7,
  //   styles: [
  //     {
  //         "featureType": "landscape",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "hue": "#6600ff"
  //             },
  //             {
  //                 "saturation": "-16"
  //             },
  //             {
  //                 "visibility": "on"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "landscape.man_made",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "visibility": "on"
  //             },
  //             {
  //                 "saturation": "0"
  //             },
  //             {
  //                 "gamma": "0.7"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "landscape.man_made",
  //         "elementType": "labels",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "landscape.man_made",
  //         "elementType": "labels.text",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "landscape.man_made",
  //         "elementType": "labels.icon",
  //         "stylers": [
  //             {
  //                 "visibility": "on"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "27"
  //             },
  //             {
  //                 "hue": "#3200ff"
  //             },
  //             {
  //                 "lightness": "3"
  //             },
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "geometry",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "geometry.stroke",
  //         "stylers": [
  //             {
  //                 "visibility": "on"
  //             },
  //             {
  //                 "weight": "1.00"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "labels",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "labels.text.stroke",
  //         "stylers": [
  //             {
  //                 "weight": "0.01"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi",
  //         "elementType": "labels.icon",
  //         "stylers": [
  //             {
  //                 "weight": "0.01"
  //             },
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.attraction",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             },
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-31"
  //             },
  //             {
  //                 "lightness": "7"
  //             },
  //             {
  //                 "visibility": "on"
  //             },
  //             {
  //                 "gamma": "1"
  //             },
  //             {
  //                 "weight": "0.01"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "geometry",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             },
  //             {
  //                 "gamma": "1"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "geometry.fill",
  //         "stylers": [
  //             {
  //                 "gamma": "1"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "geometry.stroke",
  //         "stylers": [
  //             {
  //                 "weight": "1"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "labels.text.stroke",
  //         "stylers": [
  //             {
  //                 "weight": "0.01"
  //             },
  //             {
  //                 "gamma": "1"
  //             },
  //             {
  //                 "lightness": "0"
  //             },
  //             {
  //                 "saturation": "0"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.business",
  //         "elementType": "labels.icon",
  //         "stylers": [
  //             {
  //                 "visibility": "on"
  //             },
  //             {
  //                 "weight": "0.01"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.government",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             },
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.medical",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.park",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "visibility": "on"
  //             },
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.place_of_worship",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.school",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "poi.sports_complex",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": "-58"
  //             },
  //             {
  //                 "lightness": "28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "hue": "#6600ff"
  //             },
  //             {
  //                 "saturation": "-57"
  //             },
  //             {
  //                 "lightness": "-28"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road",
  //         "elementType": "labels.text",
  //         "stylers": [
  //             {
  //                 "lightness": "-100"
  //             },
  //             {
  //                 "saturation": "10"
  //             },
  //             {
  //                 "color": "#ffffff"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road",
  //         "elementType": "labels.text.fill",
  //         "stylers": [
  //             {
  //                 "saturation": "0"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road",
  //         "elementType": "labels.text.stroke",
  //         "stylers": [
  //             {
  //                 "lightness": "100"
  //             },
  //             {
  //                 "saturation": "100"
  //             },
  //             {
  //                 "weight": "0.01"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road.arterial",
  //         "elementType": "labels.icon",
  //         "stylers": [
  //             {
  //                 "visibility": "off"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "road.local",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "lightness": "-45"
  //             },
  //             {
  //                 "weight": 1.3
  //             },
  //             {
  //                 "color": "#6600ff"
  //             },
  //             {
  //                 "saturation": "-57"
  //             },
  //             {
  //                 "gamma": "2.35"
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "transit",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "visibility": "simplified"
  //             },
  //             {
  //                 "hue": "#5e00ff"
  //             },
  //             {
  //                 "saturation": -16
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "transit.line",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": -72
  //             }
  //         ]
  //     },
  //     {
  //         "featureType": "water",
  //         "elementType": "all",
  //         "stylers": [
  //             {
  //                 "saturation": -65
  //             },
  //             {
  //                 "hue": "#1900ff"
  //             },
  //             {
  //                 "lightness": 8
  //             }
  //         ]
  //     }
  // ]
  });

  var marker = new google.maps.Marker({
    position:{ lat: 41.4226, lng: -122.3861},
    map:map,
    
  });
  
  
}



window.initMap = initMap;

function showAnimals(pet) {
  console.log(pet)
    // clear results first
    dogCards.innerHTML = "";

    pet.forEach(pet => {
        const div = document.createElement("div");

        div.classList.add("card", "card-body", "bg-blue-300");
        div.innerHTML = `
      <div class="display-flex">
        <div class="pet-container p-5">
        <img class="pet-image" src="${
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



