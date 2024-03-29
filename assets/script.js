// Displays restaurant reviews from Yelp API
var getReviews = async (lat, lon) => {
  const urlYelp = `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lon}`;
  const apiToken =
    "ToyYqIZSbvEarVjWfZaLj1jawbX6kwF6kFKciXRV5WPK5zC9EzSvkqMQ7i36QZ9feLDODdIzqqSTqHHiGg8ZMITPktE1BGeHbVHL26ekB_CpMBTYLfGv0EJGJImdZXYx";

  // Making a fetch call with an Authorization header
  await fetch(urlYelp, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // we only get here if there is no error
    })
    .then((data) => {
      // Displays restaurant results in image cards
      data.businesses.forEach((element) => {
        if (element.image_url) {
          let card = $(`
            <div class="col s12 m6 l4 xl3">
              <div class="card">
                <div class="card-image">
                  <img width=300 height=300 src="${element.image_url}">
                  <span class="card-title">${element.name}</span>
                </div>
                <div class="card-content">
                  <p>Cuisine: ${element.categories[0].title}</p>
                  <p>Rating: ${element.rating}</p>
                  <p>Reviews: ${element.review_count}</p>
                </div>
                <div class="card-action">
                  <a href="${element.url}">More Info</a>
                </div>
              </div>
            </div>
            `);

          $(".restaurants").append(card);

          // Omits result if there is no image
        } else {
        }
      });
    })
    .catch((error) =>
      console.error(
        "There has been a problem with your fetch operation:",
        error
      )
    );
};

// Gets the latitude and longitude of the city you search for
var getLocation = async () => {
  const apiPlaces = "AIzaSyCL7avHl4kUCwKaLbRkxAkClyjYjbEzq-U";
  var cityState = $(".city").val();
  const baseURL = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityState}&key=${apiPlaces}`;

  // Make the API request using the fetch API
  fetch(baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiPlaces,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      // Process and use the results as needed
      let latitude = data.results[0].geometry.location.lat;
      let longitude = data.results[0].geometry.location.lng;
      getReviews(latitude, longitude);
    })
    .catch((error) => {
      console.error(`There was a problem with the fetch operation:`, error);
    });
};

// Gets city location and nearby restaurant reviews on click
var reviewHeader = $(`<h2>Best restaurants in your area</h2>`)
$(".search_btn").on("click", () => {
  $(".restaurants").empty();
  $(".restaurants").append(reviewHeader);
  getLocation();
});


