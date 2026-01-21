

const searchbox = document.getElementById("search");
const inputbox= document.getElementById("input");
const searchcontent = document.querySelector(".searchlist");



async function loadMovies(movie_name) {

  searchcontent.innerHTML = ``;
  const loader = document.getElementById("loading");
  loader.style.display = "block";

  const url = `http://localhost/movieapi_for_small_project/fetch_movies.php?q=${movie_name}`;

try{
  const res = await fetch(url)
  const data = await res.json()
console.log(data)

loader.style.display= "None";

 let movies;
  if (Array.isArray(data)) {

    movies = data;
  } 
  
  else if (data) {
    movies = [data];
  } 
  
  else {
    movies = [];
  }

if (!movies || movies.length === 0) {
          throw new Error("No Movies Found")
        }

movies.forEach(movie => {

  const div = document.createElement("div");
  div.className = "outputbox";
  div.innerHTML = `
  <div>
 <img src="${movie.Poster}" id="poster" alt="Movie Poster"> 
 </div>

  <h1 class="info">Title:&nbsp;&nbsp;&nbsp;${movie.Title} </h1>
    <h1 class="info">Genre:&nbsp;&nbsp;&nbsp;${movie.Genre} </h1>
    <h1 class="info">Director:&nbsp;&nbsp;&nbsp;${movie.Director} </h1>
    <h1 class="info">Actors:&nbsp;&nbsp;&nbsp;${movie.Actors} </h1>
     <h1 class="info">IMDB Rating:&nbsp;&nbsp;&nbsp;${movie.imdbRating} </h1>
     <input type="button" value="Save" data-movie="${encodeURIComponent(JSON.stringify(movie))}" class="save-data">`;

     searchcontent.appendChild(div);
});

 }

 catch(e){
  console.error("Error:",e.message)
  loader.style.display = "None";
    searchcontent.innerHTML = '<div class="invalid">No movies found</div>';
  
 }
}


searchbox.addEventListener("click", () => {
  const text = inputbox.value
  loadMovies(text);
});

inputbox.addEventListener("keydown", function(event) {
  if (event.key=='Enter'){
    event.preventDefault()
    const text = inputbox.value;
  loadMovies(text);
  }
});

searchcontent.addEventListener("click", async (event) => {

  button = event.target.closest(".save-data");
if (!button){
  return;
}
if (button.classList.contains("clicked")) return;

  const MovieData = JSON.parse(decodeURIComponent(event.target.dataset.movie));
  console.log(MovieData);

  const res = await fetch("save_movie.php",{
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(MovieData)
  });

button.value = "Saved";
button.classList.add("clicked");


console.log("Saved Data into Database!")
});
