
let apiKey = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;

// grabs the access token from Petfinders API
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {
	// makes the response a JSON response
	return resp.json();
}).then(function (data) {
	//logs the data into the console
	console.log('token', data);
	//calls the api but this time with the token
	return fetch('https://api.petfinder.com/v2/animals?&status=adoptable', {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();
}).then(function (data) {
	// Log the pet data
	console.log('pets', data);
}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});