var animals = ["Frog", "Snake", "Goose", "Lion", "Dog", "Seal", "Squirrel", "Deer", "Jellyfish", "Snail", "Tiger", "Elephant", "Panda", "Giraffe"];


var apiKey = "DDDoFF0b2hLE5W3fpdJMEm70cSmUeNyq";


function displayAnimalsInfo() {

var title = $(this).attr("data-name").trim();

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + apiKey + "&rating=pg&limit=10";

var newDiv = $("<div>");
newDiv.attr("id", "newDiv");
$("#animals-view").append(newDiv);

$("#newDiv").empty();

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response.data);

    var results = response.data;
    
    $("#animals-view").empty();

    for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<div>");
        //animalDiv.attr("float", "right");
        animalDiv.addClass("gifDiv");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        p.addClass("gif");
        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_width_still.url);
        animalImage.attr("data-state", "still");
        animalImage.attr("data-still", results[i].images.fixed_width_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);

        animalImage.addClass("gif");

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#animals-view").prepend(animalDiv);
      }
 
});

}

// Function for displaying Animals data
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {

    var a = $("<button>");

    a.addClass("animal btn btn-info");

    a.attr("data-name", animals[i]);

    a.text(animals[i]);

    $("#buttons-view").append(a);

  }
}

// Function for the Add Animal button
$("body").on("click", "#add-animal", function(){
  event.preventDefault();

  var animal = $("#animal-input").val().trim();
  $("#animal-input").val("");

  animals.push(animal);

  renderButtons();
})

// Generic function for displaying the AnimalsInfo
$(document).on("click", ".animal", displayAnimalsInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("body").on("click", ".gif", function() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  
});

