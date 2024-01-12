var getReviews = async (lat, lon) => {
  console.log(lat, lon);
  const urlYelp = `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lon}`;

  // Your API token or credentials here
  const apiToken = "ToyYqIZSbvEarVjWfZaLj1jawbX6kwF6kFKciXRV5WPK5zC9EzSvkqMQ7i36QZ9feLDODdIzqqSTqHHiGg8ZMITPktE1BGeHbVHL26ekB_CpMBTYLfGv0EJGJImdZXYx";

  // Making a fetch call with an Authorization header

  await fetch(urlYelp, {
    method: "GET", // or 'POST' if required
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
      console.log(data)

      data.businesses.forEach(element => {
        if (element.image_url) {
          let card = $(`
            <div class="col s3 m3">
              <div class="card">
                <div class="card-image">
                  <img width="500" height="400" src="${element.image_url}">
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

        } else {
          
        }
      });
    })
    .catch((error) =>
      console.error("There has been a problem with your fetch operation:", error)
    );
}

var getLocation = async () => {
  const apiPlaces = "AIzaSyCL7avHl4kUCwKaLbRkxAkClyjYjbEzq-U"
  var cityState = ($(".city").val());
  // const baseURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query${cityState}`;
  const baseURL = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityState}&key=${apiPlaces}`;
  // const query = `${city}, ${state}`;

  // url.searchParams.append(‘query’, query);\
  // url.searchParams.append(‘key’, apiKey);
  // Make the API request using the fetch API
  fetch(baseURL, {
    method: "GET", // or 'POST' if required
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiPlaces
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      // Process and use the results as needed
      // console.log(data.results[0].geometry.location);
      let latitude = data.results[0].geometry.location.lat
      let longitude = data.results[0].geometry.location.lng
      getReviews(latitude, longitude);
    })
    .catch((error) => {
      console.error(`There was a problem with the fetch operation:`, error);
    });
}

$(".search_btn").on("click", () => {
  $(".restaurants").empty();
  getLocation();
  console.log($(".city").val());
});




// // Define the city and state for your search
// const city = ‘New York’;
// const state = ‘New York’;
// // Create the API request URL
// const baseUrl = ‘https://maps.googleapis.com/maps/api/place/textsearch/json’;