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

## State and stuff
I could just use the "React standard" props down events up. I've seen a few other possibilities:
* Event bus. Can be implemented by creating and exporting a new Vue object and using it for its $emit and $on functions.
* Export an object literal, store everything in it and import it in the components that require it. That object literal is usually called "store" or "state" as one might imagine.
* Just mutate props. This is almost never mentioned as React sort of imposed its standard state flow and it's not necessarily a bad thing. So I'm not going to do this. Let's leave props non-mutable.
* VueEx - The VueJS state management lib. I'm not a fan of these as I don't need the added complexity of having atomic actions, dispatchers and whatnot but it could be an interesting thing to learn about.

I' m going to use an object literal to store the authentication data. The rest can probably flow with props down and events up.

# TODO
- [ ] Add the favicon
- [ ] The "Home" view can be removed
- [ ] Remove the HelloWorld component, it's imported in several places