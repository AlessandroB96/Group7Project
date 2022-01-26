const restaurantBtn = document.getElementById('restaurants');
const recipesBtn = document.getElementById('recipes');

$(document).ready(function() {
    fetchRestaurantPage();
    fetchRecipesPage();

});


let fetchRestaurantPage = function () {

    restaurantBtn.addEventListener('click', function() {
          document.location.href = './restaurants.html';
    });

};

let fetchRecipesPage = function () {

    recipesBtn.addEventListener('click', function () {
        document.location.href = './recipes.html';
    });
};