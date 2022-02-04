// Global vars

var cuisine = "Mexican";
var keyword = "Chicken"
var newNumber = false;
var recipeNumber = Math.round(Math.random() * 20)
var recipeNumberArr = [];
// recipeNumberArr.push(recipeNumber);


//junjieAdd~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var recipeName = [];
var recipeImageUrl = [];
var recipeUrl = [];
var recipeSource = [];
var recipeTotalTime = [];
var recipeIgredients = [];

var recipeNameGet = [];
var recipeImageUrlGet = [];
var recipeUrlGet = [];
var recipeSourceGet = [];
var recipeTotalTimeGet = [];
var recipeIgredientsGet = [];

function get() {
  recipeNameGet = JSON.parse(localStorage.getItem("Name"));
  recipeImageUrlGet = JSON.parse(localStorage.getItem("ImageUrl"));
  recipeUrlGet = JSON.parse(localStorage.getItem("Url"));
  recipeSourceGet = JSON.parse(localStorage.getItem("Source"));
  recipeTotalTimeGet = JSON.parse(localStorage.getItem("Time"));
  recipeIgredientsGet = JSON.parse(localStorage.getItem("Igredients"));
}
get()
//junjieAdd~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Functions to get random recipes without repeats
function numberReset() {
  randomNumber();
  numberCheck();
}
// Randomize recipe number
function randomNumber() {
  recipeNumber = Math.round(Math.random() * 20);
}
//Check if it's in the array, if so repeat Number Reset
function numberCheck() {
  for (var i = 0; i < recipeNumberArr.length; i++) {
    if (recipeNumber === recipeNumberArr[i]) {
      numberReset();
    }
  }
}

// theMealDb API

function mealSearch() {
  numberReset();
  recipeNumberArr.push(recipeNumber);
  // FETCH based on keyword and cuisine
  fetch("https://api.edamam.com/api/recipes/v2?type=public" + keyword + "&app_id=b3dd42ee&app_key=%20722cf0bbfd82e53f97d6ac5ff393c653%09" + cuisine)

    .then(function (response) {
      if (response.ok === false) {
        numberReset();
        return mealSearch();
      }
      return response.json();
    })
    .then(function (data) {

      console.log(recipeNumber);
      console.log(data);

      // if no results found, display "Sorry, No Results!"
      if (data.hits.length === 0) {
        $(".recipe-img").remove();
        $(".nextBtn").remove();
        $(".saveBtn").remove();
        $("#from").text("")
        $(".source-link").remove();
        $(".recipe-time").remove();
        $(".ingredient-list").remove();
        $(".recipe-content").find("h5").text("Sorry, No Results!");
      } else {

      // APPEND Recipe Image
      $(".recipe-img").remove();
      
        var recipeImage = $("<img>").attr("src", data.hits[recipeNumber].recipe.images.REGULAR.url).addClass("recipe-img z-depth-2 center-align").attr("width", "100%").attr("height", "100%");
        
        if (recipeImage !== "") {
          $(".recipe-image").append(recipeImage);
        } else {
          recipeImage = $("<img>").attr("src", "https://cdn.pixabay.com/photo/2017/09/22/21/43/table-2777180_1280.jpg").addClass("recipe-img z-depth-2 center-align").attr("width", "100%").attr("height", "100%");
          $(".recipe-image").append(recipeImage);
        }

      // APPEND Next Button
      $(".nextBtn").remove();
      $("<button>").text("Next").addClass("btn blue-grey darken-3 nextBtn").attr("id", "next-button").appendTo(".recipe-image");
      $("#next-button").on("click", function () {
        numberReset();
        recipeNumberArr.push(recipeNumber);
        mealSearch();
      })

      // APPEND Save Button
      $(".saveBtn").remove();
      $("<button>").text("⭐️ Favorite").addClass("btn blue-grey darken-3 nextBtn").attr("id", "save-button").appendTo(".recipe-image");
      $("#save-button").on("click", function () {

        //When Favorite Button clicked, add Local Storage
        recipeName.push(data.hits[recipeNumber].recipe.label)
    
        localStorage.setItem('Name', JSON.stringify(recipeName))

        recipeImageUrl.push(data.hits[recipeNumber].recipe.images.REGULAR.url)
        
        localStorage.setItem('ImageUrl', JSON.stringify(recipeImageUrl))

        recipeUrl.push(data.hits[recipeNumber].recipe.url)
        
        localStorage.setItem('Url', JSON.stringify(recipeUrl))

        recipeSource.push(data.hits[recipeNumber].recipe.source)
       
        localStorage.setItem('Source', JSON.stringify(recipeSource))

        recipeTotalTime.push(data.hits[recipeNumber].recipe.totalTime)
        
        localStorage.setItem('Time', JSON.stringify(recipeTotalTime))

        recipeIgredients.push(ingredients)
        
        localStorage.setItem('Igredients', JSON.stringify(recipeIgredients))
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
        var time = $("#time").text("Time: " + timeNum + " minutes").addClass("recipe-time flow-text");
      }

      // Append Ingredients
      $(".ingredient-list").remove();
      var ingredients = data.hits[recipeNumber].recipe.ingredients;
      for (var i = 0; i < ingredients.length; i++) {
        $("<p>").text(ingredients[i].text).addClass("ingredient-list flow-text").appendTo("#ingredients");
      }
    }})
    .catch(err => function() {
      recipeImage = $("<img>").attr("src", "https://cdn.pixabay.com/photo/2017/09/22/21/43/table-2777180_1280.jpg").addClass("recipe-img z-depth-2 center-align").attr("width", "100%").attr("height", "100%");
      $(".recipe-image").append(recipeImage);
    });
}

// Calls mealSearch with Search Click
$("#search").on("click", function () {

  var cuisineInput = $("#cuisine-input").val().toLowerCase().replace(/\ /g, "%20");
  if (cuisineInput !== "") {
    cuisine = "&cuisineType=" + $("#cuisine-input").val().toLowerCase().replace(/\ /g, "%20");
  } else {
    cuisine = "";
  }

  var keywordInput = $("#keyword-input").val().toLowerCase().replace(/\ /g, "%20");
  if (keywordInput !== "") {
    keyword = "&q=" + $("#keyword-input").val().toLowerCase().replace(/\ /g, "%20");
  } else {
    keyword = "";
  }

  if (cuisine !== "" || keyword !== "") {
    mealSearch();
  }
});

// Materialize Autocomplete
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {
    data: {
      "American": null,
      "Asian": null,
      "British": null,
      "Caribbean": null,
      "Central Europe": null,
      "Chinese": null,
      "Eastern Europe": null,
      "French": null,
      "Indian": null,
      "Italian": null,
      "Japanese": null,
      "Kosher": null,
      "Mediterranean": null,
      "Mexican": null,
      "Middle Eastern": null,
      "Nordic": null,
      "South American": null,
      "South East Asian": null
    },
    limit: 2
  });
});

// Append Favorited Recipe on page launch
function show() {
  if (recipeNameGet === null) {
    return;
  }

  var j = recipeNameGet.length - 1;

  // APPEND Recipe Image
  $(".recipe-img").remove();
  var recipeImage = $("<img>").attr("src", recipeImageUrlGet[j]).addClass("recipe-img z-depth-2 center-align").attr("width", "100%").attr("height", "100%");
  $(".recipe-image").append(recipeImage);

  // REPLACE header with Recipe Name
  $(".recipe-content").find("h5").text(recipeNameGet[j]);


  // APPEND Recipe Source and Link

  $(".source-link").remove();
  var source = $("<a>").text(recipeSourceGet[j]).addClass("source-link").attr("href", recipeUrlGet[j]);
  $("#from").text("From: ")
  $("#link").append(source);


  // APPEND Recipe Time
  $(".recipe-time").remove();
  var timeNum = recipeTotalTimeGet[j]
  if (timeNum !== 0) {
    var time = $("#time").text("Time: " + timeNum + " minutes").addClass("recipe-time flow-text");
  }

  // Append Ingredients
  $(".ingredient-list").remove();
  var ingredients = recipeIgredientsGet[0]
  for (var i = 0; i < ingredients.length; i++) {
    $("<p>").text(ingredients[i].text).addClass("ingredient-list flow-text").appendTo("#ingredients");
  }
}
show()