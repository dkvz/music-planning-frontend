# music-planning-frontend
Supposed to teach me how to use Vue, but I'm going quick&dirty to release something usable as soon as possible.

I'm not always sure what I'm doing, but I'm doing it.

## Project setup
```
npm install
```

Edit `config.js` to make sure that the API URLs used for development and production are working for your environment. You should always test this app alongside the backend in development mode which is expected to be on http://localhost:8081.

Backend repo: https://github.com/dkvz/music-planning-backend

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

## Keys in v-for loops
I strived to use unique kind of identifiers but when you're browsing an array you're usually better off just using the array index as key.

Example from the code:
```html
<div class="col col-sm-12 col-lg-2 col-md-3"
  v-for="(instrumentGroup, index) in orderedPresences" 
  :key="index">
```

## Focus on autocompletes
We need to scroll the focused autocomplete element to top on mobile only.

I think I can use `document.documentElement.clientWidth` for a specific minimum size (gives out a Number) of 600.

## Dynamic import through Router
There was an example of this in router.js originally that looked like so:
```js
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
},
```

# More notes
* There's a shorthand for applying preventDefault to form submit events declaratively.

# TODO
- [x] Add the favicon
- [x] Try [transitions](https://vuejs.org/v2/guide/transitions.html) with some of the v-ifs
- [x] The "Home" view can be removed
- [x] Remove the HelloWorld component, it's imported in several places
- [x] Clicking a link doesn't close the mobile menu, I think there's a specific Bootstrap data-* argument for this
- [x] Add a refresh button for the PlanningList component
- [ ] Add a help page - make it lazy loaded
- [ ] In Planning.vue -> submitAllPresences - Add a better modal when an instrument is set to unknown. Actually create a promise based modal that can be used to remplace window.confirm everywhere I'm using it
- [ ] I should show another warning modal when someone clicked to send presences but is actually not marked present anywhere. That could be intentional but it's also a little weird.
- [ ] We're just showing a blank page when a route isn't found, that could probably be improved
- [ ] I think there's a way to format strings correctly on multiple lines, now would be a good time to just do that
- [ ] Lots of repetitive code can be refactored both in api.js and any component calling the data fetching methods from api.js
- [ ] Write a recap of interesting Vue concepts and lessons learned -  I don't know if I'm doing something wrong but there's a LOT of divs in my HTML
- [ ] A lot of duplicated code would be fixed by using returning Promises from api.js and using .finally() - See all the duplicate setting loading to false
- [x] Put a better refresh button on the Planning view, for authenticated users or not - Use a simple icon, aligned to right, right above the list of Event components - We might want to only show that one to non-authenticated users, and keep the other one for authenticated users
- [x] Autocomplete suggestions blend in too much - make them stick out somehow
- [x] Removing an instrument from an embedded field from an event while the top instrument is set doesn't save the "unknown" instrument, it forces the top one
- [ ] We could show the absent people or a way to show the absent people - Let's see if that's a requirement later on
- [ ] After deployment, check that gzip compression is active
- [x] Prevent adding an event with no name
- [x] Add a footer with the github repo link aligned to right
- [x] Adding someone manually in an event when logged in works but you have to refresh to see the new element