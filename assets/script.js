const url =
  "https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972";

// Your API token or credentials here
const apiPlaces = "AIzaSyCL7avHl4kUCwKaLbRkxAkClyjYjbEzq-U"
const apiToken = "ToyYqIZSbvEarVjWfZaLj1jawbX6kwF6kFKciXRV5WPK5zC9EzSvkqMQ7i36QZ9feLDODdIzqqSTqHHiGg8ZMITPktE1BGeHbVHL26ekB_CpMBTYLfGv0EJGJImdZXYx";

// Making a fetch call with an Authorization header
fetch(url, {
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

  $(".search_btn").on("click",()=>{ 
    
    console.log($(".city").val());
  });

  console.log(".city")
  
  