var cuisine = "Italian"
var recipeNumber = 0

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var options = {};
    var instances = M.Carousel.init(elems, options);
})

// Spoontacular API

// function recipeSearch () {
//   fetch("https://api.spoonacular.com/food/products/search?query=" + cuisine + "&apiKey=df79ea3a515242fe939e0d371f9aeb53")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//     recipeId = data.products[0].id;
//     console.log(recipeId);

//     fetch("https://api.spoonacular.com/recipes/" + recipeId + "/information&apiKey=df79ea3a515242fe939e0d371f9aeb53")
//       .then(function(response){
//         return response.json();
//       })
//       .then(function(data) {
//         console.log(data);
//       })
//   })
// }

// recipeSearch();

// theMealDb API

function mealSearch () {
  fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + cuisine + "&app_id=b3dd42ee&app_key=%20722cf0bbfd82e53f97d6ac5ff393c653%09")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log(data.hits[0].recipe.label);
    console.log(data.hits[0].recipe.images.REGULAR.url)
    $("#recipe-div").find("h1").text(data.hits[0].recipe.label);
    $("#recipe-div").append

    var recipeDiv = $("<div>", {id: "new-div", "class": "image-dive"});
    var recipeImage = $("<img>", {"src": data.hits[0].recipe.images.REGULAR.url, "alt": "ADD ALT"});
    $("#box").append(recipeDiv);
    $("#new-div").append(recipeImage);

    // $("#recipe-div").css("background-image", "url(" + data.hits[0].recipe.images.REGULAR.url + ")");
    
  })
}

mealSearch();

// function recipeSearch () {
//   fetch("https://api.spoonacular.com/food/products/search?query=" + cuisine + "&apiKey=df79ea3a515242fe939e0d371f9aeb53")
//   // fetch("http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
//   // fetch("https://api.edamam.com/api/nutrition-details?app_id=b3dd42ee&app_key=722cf0bbfd82e53f97d6ac5ff393c653")
//   // fetch("https://api.edamam.com/api/recipes/v2")
//   // https:api.edamam.com/api/recipes/v2
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     // recipeNumber = Math.random
//     console.log(data);
//     console.log(data.products[0]);
//     $("#recipe-div").find("h1").text(data.products[0].title);
//     // $("#recipe-div").css("background-image", "url(" + data.products[0].image + ")");
//     recipeId = data.products[0].id;
//     console.log(recipeId);

//     fetch("https://api.spoonacular.com/recipes/" + recipeId + "/information&apiKey=df79ea3a515242fe939e0d371f9aeb53")
//       .then(function(response){
//         return response.json();
//       })
//       .then(function(data) {
//         console.log(data);
//       })
//   })
// }