import app from './src/app.js';

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



app.get('/', async (request, response) => {
  renderPage(response, 'index');
});

app.get('/aboutUs', async (request, response) => {
  renderPage(response, 'aboutUs');
});

app.get('/movies', async (request, response) =>{
  renderPage(response, 'movies');
});

app.listen(5080);