
import express from "express";
import { engine } from 'express-handlebars';
import {loadMovie, loadMovies} from "./movies.js";

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.get("/", async (request, response) => {
  const movies = await loadMovies();
  response.render("home", {movies});
});

app.get("/movies/:movieId", async (request, response) => {
  const movie = await loadMovie(request.params.movieId);
  response.render("movie", {movie});
});


app.use("/static", express.static("./static"));

export default app;