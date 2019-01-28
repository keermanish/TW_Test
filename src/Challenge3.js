const fetch = require('node-fetch');
const helper = require('./common/Helper');
const { BASE_URL, USER_ID } = require('./common/Const');

/**
 * function to filter and send all active products
 * @param {Array} data - all product information
 * @returns {Promise}
 */
function sendActiveProductsWithCategory(data) {
  const output = {};
  const currentDate = new Date();

  data.forEach(d => {
    const startDate = new Date(d.startDate);
    const endDate = d.endDate ? new Date(d.endDate) : new Date();

    if (startDate <= currentDate && endDate >= currentDate) {
      output[d.category] = output[d.category] ? output[d.category] + 1 : 1;
    }
  });

  return fetch(`${BASE_URL}/challenge/output`, {
    method: 'post',
    body: JSON.stringify({ output }),
    headers: {
      UserID: USER_ID,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(helper.error);
}

/**
 * function to fetch all products
 * @returns {Promise} - list of all products
 */
function getAllProducts() {
  return fetch(`${BASE_URL}/challenge/input`, {
    method: 'get',
    headers: {
      UserID: USER_ID
    }
  })
    .then(response => response.json())
    .catch(helper.error);
}

/* init, get all products and start process */
(function() {
  getAllProducts()
    .then(sendActiveProductsWithCategory)
    .then(helper.log)
    .catch(helper.error);
})();
