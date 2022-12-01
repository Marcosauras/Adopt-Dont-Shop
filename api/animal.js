
let key = "sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU";
let secret = "QvbeKf6Pg5ylYKSPPZEtvZp4nJL5iaxlFv49mN5w";
let token;

let dogForm = document.getElementById("dog-form")

console.log(fetch(`http://api.petfinder.com/pet.find?format=json&key=sbkQE4y07LmiClHOWA7HTgN4YohDfEx44m5DOUc4DVEQjbQoQU=dogs`))