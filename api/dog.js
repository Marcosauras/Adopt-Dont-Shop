
let apiKey = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;
let dogCards = document.getElementById("dog-cards")

addEventListener('load', grabAnimals)


function grabAnimals(e){
    e.preventDefault();

    // grabs the access token from Petfinders API
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then((res) => res.json())
.then((data) => {
	console.log('token', data);
	//calls the api but this time with the token Oauth
    // TODO put user inputs into this fetch
	return fetch('https://api.petfinder.com/v2/animals?type=dog&status=adoptable', {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

}).then(function (resp) {
	return resp.json();
}).then(function (data) {
	console.log(data);

   // catches the error
}).catch(function (err) {
	console.log(err);
});
}

for(i=0; i < data.animals.length; i++){
    let dogName = document.createElement('div');
    dogName.textContent = data[i].animals.name
    dogCards.append(dogName)
}


// }).then(function (resp) {
// 	return resp.json();

// }).then(function (data) {
// 	console.log('token', data);