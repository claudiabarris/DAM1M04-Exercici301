const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuración de Handlebars y Partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); //decir donde estan las caretas
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// leer capetra public para poder leer datos estaticos como el css.
app.use(express.static(path.join(__dirname, '../public')));

// se crea la funcion de mayor o menor pero se debe configurar para que la sepa interpretar
hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});

// Función para leer JSON de forma sencilla
const getData = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', file), 'utf-8'));


// A) Página Principal
app.get('/', (req, res) => {
    const siteData = getData('site.json');
    res.render('index', siteData);
});

// B) Página de Informe
app.get('/informe', (req, res) => {
    const site = getData('site.json');
    const cities = getData('cities.json');
    const countries = getData('countries.json');

    res.render('informe', {
        title: site.title,
        cities: cities.cities,
        countryNames: countries.countries // Pasamos el diccionario 
    });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));