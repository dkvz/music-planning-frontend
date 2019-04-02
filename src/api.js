import axios from 'axios';

// At this time the backend doesn't even return the 
// username.
// Even the token is supposed to be added to request
// as a cookie with no action needed.

// TODO The object is full of stuff that can be refactored.
// We need generic functions to post, for instance.

export default {
  apiUrl: 'http://localhost:8081',
  apiSuffix: '',
  authenticated: false,
  username: '',
  cookieName: 'token',
  axiosOptions: { withCredentials: true },
  postLogin: function (username, password, isToken, successCallback, errorCallback) {
    const body = {
      username
    };
    if (isToken) {
      body.token = password;
    } else {
      body.password = password;
    }
    axios.post(this.apiUrl + this.apiSuffix + '/login', body, this.axiosOptions)
      .then(res => {
        if (res.status >= 200) {
          // We should have the token sent back as a
          // cookie.
          successCallback && successCallback(res);
        } else {
          successCallback && successCallback(null);
        }
      })
      .catch(res => {
        errorCallback && errorCallback(res.response.status);
      });
  },
  getPlannings: function(successCallback, errorCallback) {
    axios.get(this.apiUrl + this.apiSuffix + '/plannings', this.axiosOptions)
      .then(res => {
        successCallback && successCallback(res.data);
      })
      .catch(res => {
        errorCallback && errorCallback(res.response.status);
      });
  },
  postPlanning: function(name, successCallback, errorCallback) {
    axios.post(this.apiUrl + this.apiSuffix + '/plannings', {name}, this.axiosOptions)
      .then(res => {
        successCallback && successCallback(res.data);
      })
      .catch(res => {
        errorCallback && errorCallback(res.response.status);
      });
  },
  postEvent: function(evt, successCallback, errorCallback) {
    axios.post(this.apiUrl + this.apiSuffix + '/events', evt, this.axiosOptions)
      .then(res => {
        successCallback && successCallback(res.data);
      })
      .catch(res => {
        errorCallback && errorCallback(res.response.status);
      });
  },
  deletePlanning: function(planningId, successCallback, errorCallback) {
    axios.delete(
      `${this.apiUrl}${this.apiSuffix}/plannings/${planningId}`, 
      this.axiosOptions
    ).then(() => {
      successCallback && successCallback();
    })
    .catch(res => {
      errorCallback && errorCallback(res.response.status);
    });
  },
  getFullPlanning: function(planningId, successCallback, errorCallback) {
    axios.get(
      `${this.apiUrl}${this.apiSuffix}/plannings/${planningId}`,
      this.axiosOptions
    ).then((res) => {
      successCallback && successCallback(res.data);
    })
    .catch(res => errorCallback && errorCallback(res.response.status));
  },
  getTokenFromCookie: function (document) {
    return this._getCookie(this.cookieName, document);
  },
  // Don't remember where I stole this from, copied
  // from another one of my projects.
  _getCookie: function(cname, document) { 
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie); 
    const ca = decodedCookie.split(';'); 
    for (let i = 0; i < ca.length; i++) { 
      let c = ca[i]; 
      while (c.charAt(0) == ' ') { 
        c = c.substring(1); 
      } 
      if (c.indexOf(name) == 0) { 
        return c.substring(name.length, c.length); 
      } 
    } return ''; 
  },
  logout: function(document) {
    // Destroy the cookie: 
    document.cookie = `${this.cookieName}=;path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    this.authenticated = false;
    this.username = '';
  }
};