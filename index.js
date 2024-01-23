import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs/promises";
import {loadMovie, loadMovies} from "./src/movies.js";
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

const MENU = [
  {
    label: 'Home page',
    link: '/',
  },
  {
    label: 'About us',
    link: '/aboutUs',
  },
  {
    label: 'Movies',
    link: '/movies',
  }, 
];


async function renderPage(response, page) {
  const currentPath = (page == 'index') ? '/' : `/${page}`;

  response.render(page, {
    menuItems: MENU.map(item => {
      return {
        active: currentPath == item.link,
        label: item.label,
        link: item.link,
      };
    }) 
  });
}

app.get("/", async (request, response) => {
  const movies = await loadMovies();
  response.render("home", {movies});
});

app.get("/movies/:movieId", async (request, response) => {
  const movie = await  loadMovie(request.params.movieId);
  response.render("movie", {movie});
});

app.get('/', async (request, response) => {
  renderPage(response, 'index');
});

app.get('/aboutUs', async (request, response) => {
  renderPage(response, 'aboutUs');
});

app.get('/movies', async (request, response) =>{
  renderPage(response, 'movies');
});

app.use("/static", express.static("./static"));
app.listen(5080);