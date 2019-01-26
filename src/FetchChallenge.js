const fetch = require('node-fetch');
const helper = require('./common/Helper');
const { BASE_URL, USER_ID } = require('./common/Const');

// first get all challenges
fetch(`${BASE_URL}/challenge`, {
  method: 'get',
  headers: {
    UserID: USER_ID
  }
})
.then(response => response.json())
.then(data => {
  helper.log(data);
})
.catch(helper.error);
