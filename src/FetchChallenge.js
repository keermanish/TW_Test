const fetch = require('node-fetch');
const helper = require('./common/Helper');
const { BASE_URL, USER_ID } = require('./common/Const');

/**
 * function to fetch latest challenge
 * @returns {Promise}
 */
function fetchLatestChallenge() {
  return fetch(`${BASE_URL}/challenge`, {
    method: 'get',
    headers: {
      UserID: USER_ID
    }
  })
  .then(response => response.json())
  .then(helper.log)
  .catch(helper.error);
}

(function() {
  fetchLatestChallenge();
})();
