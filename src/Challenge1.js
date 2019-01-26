const fetch = require('node-fetch');
const helper = require('./common/Helper');
const { BASE_URL, USER_ID } = require('./common/Const');

function sendProductCount(data) {
  const output = { count: data.length };

  return fetch(`${BASE_URL}/challenge/output`, {
    method: 'post',
    body: JSON.stringify({ output }),
    headers: {
      UserID: USER_ID
    }
  })
  .then(response => response.json())
  .then(data => data)
  .catch(helper.error);
}

// get the input data and post count of all products
fetch(`${BASE_URL}/challenge/input`, {
  method: 'get',
  headers: {
    UserID: USER_ID
  }
})
.then(response => response.json())
.then(sendProductCount)
.then(data => {
  helper.log(data);
})
.catch(helper.error);
