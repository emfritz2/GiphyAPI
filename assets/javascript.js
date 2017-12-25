    
    $(document).ready(function() {

      // array of tv shows
      var tvShows = ["The Office", "How I Met Your Mother", "Always Sunny", "Arrested Development", "Full House", "Scrubs", "Parks and Rec", "Seinfeld", "The Big Bang Theory", "Modern Family"];

     
       // function to display the gifs and the rating

      function displayGifs() {

        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

        // AJAX call for the button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // empties the div when a new button is clicked
          $("#gif-holder").empty();

          // putting the gifs into gif-holder
          var gifDiv = $("#gif-holder");

           // Retrieving the URL for the image
          var gif = response["data"];

          // for loop to get all 10 images
          for (var i=0; i<response["data"].length; i++) {

          // Creating an image element to put the gifs
          var image = $("<img>");

          image.addClass("gif-margin");

          // path to get the images from it's API
          image.attr("src", gif[i]["images"]["fixed_height"]["url"]);

          // gets the still image - click function doesnt work
          // image.attr("data-still", gif[i]["images"]["fixed_height_still"]["url"]);

          // gets the animated image - click function doesnt work
          // image.attr("data-animate", gif[i]["images"]["fixed_height"]["url"]);


          image.attr("still");

          // apending the 10 images to each other
          gifDiv.append(image);


          }

        });

      }


// Javascript for creating and adding buttons  

      // start function for buttons
      function renderButtons() {

        // emptying the div so there arent repeat buttons
        $("#button-holder").empty();

        // for loop through the array
        for (var i = 0; i < tvShows.length; i++) {

          // creates the button from what the user types
          var a = $("<button>");

          // Adding a class of shows and the button design
          a.addClass("shows");
          a.addClass("btn btn-primary");

          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", tvShows[i]);

          // Providing the button's text with a value of the movie at index i
          a.text(tvShows[i]);

          // Adding the button to the HTML
          $("#button-holder").append(a);

          // clears the form when you hit enter or submit
          $("#gif-form")[0].reset();

        }
      }

      // This function handles events where one button is clicked
      
      $("#add-gif").on("click", function(event) {

        event.preventDefault();

        // This line will grab the text from the input box
        var newTvShow = $("#gif-input").val().trim();

        // The movie from the textbox is then added to our array
        tvShows.push(newTvShow);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });


      $(document).on("click", ".shows", displayGifs);

      renderButtons();

      // if else statement for animating - doesn't work

      // var dataState = attr("still")

      // if dataState = "still" {

      //   $(document).on("click", "data-animate")

      // }else{

      //   $(document).on("click", "data-still")

      // }

});
