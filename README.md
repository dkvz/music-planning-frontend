# music-planning-frontend

## Project setup
```
npm install
```

## Dependencies and stuff
To actually create the project I used the Vue CLI and `vue create app-name`, then I added the router using `vue add router`.

To get started fast I'm using Bootstrap:
```
npm install bootstrap jquery popper.js
```

Once that's done the two import statements in main.js should work (here using the CSS version - we could use SCSS):
```js
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Project notes
I can use these "navigation guards" to setup confirmation messages when leaving the planning view without having hit the save button: https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards

# TODO
- [ ] Add the favicon
- [ ] The "Home" view can be removed
- [ ] Remove the HelloWorld component, it's imported in several places