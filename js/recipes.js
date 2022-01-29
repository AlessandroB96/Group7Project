var cuisine = "Mexican";
var keyword = "Chicken"
var newNumber = false;
var recipeNumber = Math.round(Math.random() * 20)
var recipeNumberArr = [];
recipeNumberArr.push(recipeNumber);

console.log(recipeNumber);


function numberReset () {
  randomNumber();
  numberCheck();
}

function randomNumber () {
   recipeNumber = Math.round(Math.random() * 20);
}

function numberCheck () {
  for (var i = 0; i < recipeNumberArr.length; i++) {
    if (recipeNumber === recipeNumberArr[i]) {
      numberReset();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var options = {};
    // var instances = M.Carousel.init(elems, options);
})

// theMealDb API

function mealSearch () {

  // FETCH based on keyword and cuisine
  fetch("https://api.edamam.com/api/recipes/v2?type=public" + keyword + "&app_id=b3dd42ee&app_key=%20722cf0bbfd82e53f97d6ac5ff393c653%09" + cuisine)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    // console.log(data.hits[recipeNumber].recipe.label);
    // console.log(data.hits[recipeNumber].recipe.images.REGULAR.url);

    // APPEND Recipe Image
    $(".responsive-img").remove();
    var recipeImage = $("<img>").attr("src", data.hits[recipeNumber].recipe.images.REGULAR.url).addClass("responsive-img").attr("width", "100%").attr("height", "100%");
    $(".recipe-image").append(recipeImage);

    // APPEND Next Button
    $(".nextBtn").remove();
    $("<button>").text("Next").addClass("btn blue-grey darken-3 nextBtn").attr("id", "next-button").appendTo(".recipe-image");
    $("#next-button").on("click", function() {
      numberReset();
      recipeNumberArr.push(recipeNumber);
      mealSearch();
    })

    // REPLACE header with Recipe Name
    $(".recipe-content").find("h5").text(data.hits[recipeNumber].recipe.label);

    // APPEND Recipe Source and Link
    $(".source-link").remove();
    var source = $("<a>").text(data.hits[recipeNumber].recipe.source).addClass("source-link").attr("href", data.hits[recipeNumber].recipe.url);
    $("#from").text("From: ")
    $("#link").append(source);

    // APPEND Recipe Time
    $(".recipe-time").remove();
    var timeNum = data.hits[recipeNumber].recipe.totalTime;
    if (timeNum !== 0) {
      var time = $("<p>").text("Time: " + timeNum + " minutes").addClass("recipe-time");
      $(".recipe-content").append(time);
    } 

    // Append Ingredients
    $(".ingredient-list").remove();
    var ingredients = data.hits[recipeNumber].recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++) {
      $("<p>").text(ingredients[i].text).addClass("ingredient-list").appendTo("#ingredients");
    }
  })
}

// mealSearch();

$("#cuisine-input").val().toLowerCase().replace(/\ /g, "%20")

$("#search").on("click", function() {
  // error when entries are blank, If statement to remove extra API call before input value
  cuisine = "&cuisineType=" + $("#cuisine-input").val().toLowerCase().replace(/\ /g, "%20");
  keyword = "&q=" + $("#keyword-input").val().toLowerCase().replace(/\ /g, "%20");

  mealSearch();
});