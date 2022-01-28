var cuisine = "American"
var recipeNumber = Math.round(Math.random() * 20)
console.log(recipeNumber);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var options = {};
    // var instances = M.Carousel.init(elems, options);
})

// theMealDb API

function mealSearch () {
  fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + cuisine + "&app_id=b3dd42ee&app_key=%20722cf0bbfd82e53f97d6ac5ff393c653%09")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log(data.hits[recipeNumber].recipe.label);
    console.log(data.hits[recipeNumber].recipe.images.REGULAR.url);
    var recipeImage = $("<img>").attr("src", data.hits[recipeNumber].recipe.images.REGULAR.url).addClass("responsive-img").attr("width", "100%").attr("height", "100%");
    $(".recipe-image").append(recipeImage);

    $(".recipe-content").find("h5").text(data.hits[recipeNumber].recipe.label);

    var source = $("<a>").text(data.hits[recipeNumber].recipe.source).attr("href", data.hits[recipeNumber].recipe.url);
    $("#from").text("From: ")
    $("#link").append(source);

    var timeNum = data.hits[recipeNumber].recipe.totalTime;

    if (timeNum !== 0) {
      var time = $("<p>").text("Time: " + timeNum + " minutes");
    } else {
      var time = "Time: Unavailable"
    }
    $(".recipe-content").append(time);

    var ingredients = data.hits[recipeNumber].recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++) {
      $("<p>").text(ingredients[i].text).appendTo("#ingredients");
    }
  })
}

mealSearch();