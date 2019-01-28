const fetch = require('node-fetch');
const helper = require('./common/Helper');
const { BASE_URL, USER_ID } = require('./common/Const');

/**
 * function to send the total of all active products
 * @param {Array} data - all product information
 * @returns {Promise}
 */
function sendTotal(data) {
  let totalValue = 0;
  const currentDate = new Date();
  data.forEach((d) => {
    const startDate = new Date(d.startDate);
    const endDate = d.endDate ? new Date(d.endDate) : new Date();

    if (startDate <= currentDate && endDate >= currentDate) {
      totalValue += d.price;
    }
  });

  const output = { totalValue };

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
    .then(sendTotal)
    .then(helper.log)
    .catch(helper.error);
})();
