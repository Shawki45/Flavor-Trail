var getData = async()=>{
  var lat = null
  var lon = null
  const urlYelp = `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&${lat}&${lon}`;
  const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
  // Your API token or credentials here
  const apiToken = "ToyYqIZSbvEarVjWfZaLj1jawbX6kwF6kFKciXRV5WPK5zC9EzSvkqMQ7i36QZ9feLDODdIzqqSTqHHiGg8ZMITPktE1BGeHbVHL26ekB_CpMBTYLfGv0EJGJImdZXYx";
  const apiPlaces = "AIzaSyCL7avHl4kUCwKaLbRkxAkClyjYjbEzq-U"
  // Making a fetch call with an Authorization header
 
  fetch(urlYelp, {
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
    .then((data) => console.log(data))
    .catch((error) =>
      console.error("There has been a problem with your fetch operation:", error)
    );
}

$(".search_btn").on("click",()=>{
  getData();
  console.log($(".city").val());
});



// // const apiKey = ‘YOUR_API_KEY’;
// // Define the city and state for your search
// const city = ‘New York’;
// const state = ‘New York’;
// // Create the API request URL
// const baseUrl = ‘https://maps.googleapis.com/maps/api/place/textsearch/json’;
// const query = `${city}, ${state}`;
// const url = new URL(baseUrl);
// url.searchParams.append(‘query’, query);
// url.searchParams.append(‘key’, apiKey);
// // Make the API request using the fetch API
// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Network response was not ok (${response.status})`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     // Process and use the results as needed
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(‘There was a problem with the fetch operation:’, error);
//   });