import axios from 'axios';

export default {
  apiUrl: 'http://localhost:8081',
  apiSuffix: '',
  postLogin: function(username, password, isToken, successCallback, errorCallback) {
    const body = {
      username
    };
    if (isToken) {
      body.token = password;
    } else {
      body.password = password;
    }
    axios.post(apiUrl + apiSuffix + '/login', body)
      .then(res => {
        if (res.status >= 200) {
          // We should have the token sent back as a
          // cookie.
          console.log(res);
          successCallback && successCallback(res);
        } else {
          successCallback && successCallback(null);
        }
      })
      .catch(res => {
        errorCallback && errorCallback(res.data);
      });
  }
};