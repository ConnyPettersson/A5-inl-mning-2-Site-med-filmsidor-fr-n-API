/* import express from "express";
import fs from "fs/promises";

const app = express();

app.get('/', async (request, response) => {             
  const buf = await fs.readFile("./static/index.html");


  const html = buf.toString();
  response.send(html);
});

app.get('/pages/aboutUs.html', async (request, response) => {             
  const buf = await fs.readFile("./static/pages/aboutUs.html");


  const html = buf.toString();
  response.send(html);
});

app.get('/pages/movies.html', async (request, response) => {             
  const buf = await fs.readFile("./static/pages/movies.html");


  const html = buf.toString();
  response.send(html);
});

app.use("/static", express.static("./static")); 
app.listen(3080); */

import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs/promises";

const app = express();
app.engine('handlebars', engine());

// inställning för vilken motor vi vill använda som output
app.set('view engine', 'handlebars');

//inställning för var våra views är
app.set('views', './templates');

//Med menuItems ska vi konvertera varje objekt i arrayen till en HTML-sträng för varje objekt
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



//byter ut kod från ex static och anger vilken view vi ska använda (about, contact eller index)
//så vi använder vår variabel page
async function renderPage(response, page) {
  const currentPath = (page == 'index') ? '/' : `/${page}`;

  //Skickar in hela arrayen ovan som vår template kan göra html av
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

//3 stycken routes som kör funktionen renderPage ovan vid en HTTP-request
//Två parametrar, request och response. Efter en request ska det skrivas till responsen
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
app.listen(3080);