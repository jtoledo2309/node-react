# Aclaraciones para la practica de Redux:

Parte testing:

Los test se han hecho en el fichero de actions, reducers y selectors.
Para los componentes se han hecho en los componentes de LoginPage(snapshot y mock) y Header(snapshot)

Parte redux:
Para la obtencion de los 4 tags disponibles que nos da el API, anteriormente se usaba el estado [etiquetas, setEtiquetas], que es el que ahora usa redux para obtenerlos y mostrarlos tanto en los filtros de la pagina inicial como en la pagina para subir un nuvo anuncio. NO CONFUNDIR CON EL ESTADO [tags, setTags] referente al tema del filtrado y preparar la query para llamar al API.

La manera de obtener adverts, creacion y eliminacion se ha cambiado y ahora se despachan en redux estas acciones

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Iniciar el proyecto con npm start

Debemos conectarlo con sparrest (nodepop-api-main)
