# music-planning-frontend
Supposed to teach me how to use Vue, but I'm going quick&dirty to release something usable as soon as possible.

I'm not always sure what I'm doing, but I'm doing it.

## Project setup
```
npm install
```

## Dependencies and stuff
To actually create the project I used the Vue CLI and `vue create app-name`, then I added the router using `vue add router`.

### Bootstrap
To get started fast I'm using Bootstrap:
```
npm install bootstrap jquery popper.js
```

Once that's done the two import statements in main.js should work (here using the CSS version - we could use SCSS):
```js
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```

### FontAwesome
I'm also adding FontAwesome by just following what's on this page: https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs

We should be able to just use them in components like so:
```html
<font-awesome-icon icon="coffee" />
```

**You need to import any icon you want to use manually in main.js**, which is both great and annoying.

### Modal
There's a lot of stuff to add for the Bootstrap modal to work, especially since it's also supposed to be enabled through JQuery.

So I'm using a modified modal component from here: https://vuejs.org/v2/examples/modal.html

### Spinners
I'm using the spinners from here: https://github.com/greyby/vue-spinner

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
* VueX - The VueJS state management lib. I'm not a fan of these as I don't need the added complexity of having atomic actions, dispatchers and whatnot but it could be an interesting thing to learn about.

I' m going to use an object literal to store the authentication data. The rest can probably flow with props down and events up.

I ended up storing everything in api.js (everything meaning the authentication status, pretty much) and this was a questionnable decision since I decided later on to add a navbar only present when logged in, which required me to re-emit a logged-in event in Admin.vue.

I could've avoided this using VueX or an event bus.

=> The lesson I learned is to just always use VueX unless your app is extremely simple and only gets data. Preferably in an unauthenticated manner.

# More notes
* There's a shorthand for applying preventDefault to form submit events declaratively.

# TODO
- [ ] Add the favicon
- [ ] Try [transitions](https://vuejs.org/v2/guide/transitions.html) with some of the v-ifs
- [ ] The "Home" view can be removed
- [ ] Remove the HelloWorld component, it's imported in several places
- [ ] Clicking a link doesn't close the mobile menu, I think there's a specific Bootstrap data-* argument for this
- [ ] Add a refresh button for the PlanningList component
- [ ] Lots of repetitive code can be refactored both in api.js and any component calling the data fetching methods from api.js
- [ ] Write a recap of interesting Vue concepts and lessons learned