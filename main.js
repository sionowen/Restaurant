//=================================================
// FoodItem class
// base class
//=================================================

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree) {
    this.name = name || "No Food";
    this.calories = calories || 0;
    this.vegan = vegan || false;
    this.glutenFree = glutenFree || false;
    this.citrusFree = citrusFree || false; 
};

// FoodItem toString() method
// return a string includes all fooditem's properties
FoodItem.prototype.toString = function() {
    return this.name + " " 
        + this.calories + " "
        + this.vegan + " "  
        + this.glutenFree + " "
        + this.citrusFree;
};

FoodItem.prototype.Display = function() {
   
    var ingredients = this.name + ":    " + 
            ' calories: ' + this.calories;
    var dietary = "";
    if(this.vegan){
        dietary += " vegan ";
    }
    if(this.glutenFree){
        dietary += " gluten free ";
    }
    if(this.citrusFree){
        dietary += " citrus free ";
    }
            
            
    this.$el = $('<div>')
    .addClass('ingredients');
    return this.$el.append(ingredients).append(dietary);

        
};
// var cheeseBurger = new FoodItem("cheeseburger", 500, false, false, true);
// console.log(cheeseBurger.toString());


// var fruitSalad = new FoodItem("fruit salad", 300, true, true, false);
// console.log(fruitSalad.toString());

// var hummus = new FoodItem("hummus", 150, true, true, true);
// console.log(hummus.toString());

//=================================================
// Drink class
//=================================================

var Drink = function(name, description, price, ingredients) {
    this.name = name || "No Drink";
    this.description = description || "No Description";
    this.price = price || 0;
    this.ingredients = ingredients || [] ;
};

// Drink toString() method
// return a string includes all drink's properties
Drink.prototype.toString = function() {
    var stringIngredients = "";
    for (var i =0; i < this.ingredients.length; i++) {
        stringIngredients += this.ingredients[i].toString();
    }

    return this.name + " " 
        + this.description + " "
        + this.price + " "  
        + stringIngredients;
};
 
// drink: rum coke
var rum = new FoodItem("rum", 200, false, false, false);
var tequila = new FoodItem("tequila", 70, true, true, false);
var coke = new FoodItem("coke", 200, false, false, false);
var margaritaMix = new FoodItem("Margarita Mix", 300, true, true, false);
var rumCoke = new Drink("rumCoke", "rum+coke", 3, [rum, coke]);

var margarita = new Drink("Margarita", "citrus Margarita", 7, [tequila, margaritaMix]);
//console.log(margarita.toString());


//console.log(rumCoke.toString());

//=================================================
// Plate class
//=================================================
var Plate = function(name, description, price, ingredients) {
    this.name = name || "No Plate";
    this.description = description || "No Description";
    this.price = price || 0;
    this.ingredients = ingredients || [] ;
};

// Plate toString() method
// return a string includes all plate's properties
Plate.prototype.toString = function() {
    var stringIngredients = "";
    for (var i =0; i < this.ingredients.length; i++) {
        stringIngredients += this.ingredients[i].toString();
    }

    return this.name + " " 
        + this.description + " "
        + this.price + " "  
        + stringIngredients;
}

// Plate isVegan() method
// Check whether the plate is vegan or not
// return true if vegan plate
// return false if not
Plate.prototype.isVegan = function() {
    for (var i = 0; i < this.ingredients.length; i++){
        if (!this.ingredients[i].vegan) {
            return false;
        }
    }
    return true;
};
// Plate isGlutenFree() method
// Check whether the plate is gluten or not
// return true if gluten plate
// return false if not
Plate.prototype.isGlutenFree = function() {
    for (var i = 0; i < this.ingredients.length; i++){
        if (!this.ingredients[i].glutenFree) {
            return false;
        }
    }
    return true;
};

// Plate isCitrusFree() method
// Check whether the plate is vegan or not
// return true if plate includes citrus
// return false if not
Plate.prototype.isCitrusFree = function () {
    for (var i = 0; i < this.ingredients.length; i++){
        if (!this.ingredients[i].citrusFree) {
            return false;
        }
    }
    return true;
};

// burrito
var bean = new FoodItem("bean", 200, true, false, true);
var tortilla = new FoodItem("tortilla", 100, true, false, true);
var cheese = new FoodItem("cheese", 50, false, false, true);
var burrito = new Plate("burrito", "the best burrito", 7, [bean, tortilla, cheese]);

// guacamole
var avocado = new FoodItem("avocado", 100, true, true, true);
var tomato = new FoodItem('tomato', 20, true,true,true);
var guacamole = new Plate("guacamole", "the best guacamole", 5, [avocado, tomato]);

//console.log(burrito.toString());
//console.log(burrito.isVegan());
//console.log(guacamole.isVegan());
//console.log(guacamole.isGlutenFree());


//=================================================
// Order class
//=================================================
var Order = function(plates) {
    this.plates = plates || [];
};
var customer1 = new Order([burrito, guacamole]);

//console.log(customer1);

//=================================================
// Menu class
// Menu is a child of Plate
// It is able to access toString() method in Plate
//=================================================
var Menu = function(food) {
    this.food = food || [];
    Plate.call(this, food);
};

Menu.prototype = new Plate();
Menu.prototype.constructor = Menu;

var cjsionsmenu = new Menu([rumCoke, margarita, burrito, guacamole]);
//console.log(cjsionsmenu.toString());


//=================================================
// Restaurant class
//=================================================
var Restaurant = function(name, description, menu) {
    this.name = name;
    this.description = description;
    this.menu = menu;
};

var cjsioncantina = new Restaurant("cj sion cantina", "the best restaurant", cjsionsmenu);
//console.log(cjsioncantina)

//this prints all of the details of our menu
Restaurant.prototype.toString = function() {
    for (var i = 0; i< cjsionsmenu.food.length; i++){
        console.log(cjsionsmenu.food[i].name);
        console.log(cjsionsmenu.food[i].description);
        console.log(cjsionsmenu.food[i].price);
        for(var j = 0; j < cjsionsmenu.food[i].ingredients.length; j++ ){
             console.log(cjsionsmenu.food[i].ingredients[j].name);
             console.log(cjsionsmenu.food[i].ingredients[j].calories);
             console.log(cjsionsmenu.food[i].ingredients[j].vegan);
             console.log(cjsionsmenu.food[i].ingredients[j].glutenFree);
             console.log(cjsionsmenu.food[i].ingredients[j].citrusFree);
        };

    };


};
//console.log(cjsionsmenu.food.length)
cjsioncantina.toString();

//=================================================
// Customer class
//=================================================
var Customer = function(dietaryPreference) {
    this.dietaryPreference = dietaryPreference;
};

$(document).on('ready', function(){
$(".menu").append(tomato.Display());

});


