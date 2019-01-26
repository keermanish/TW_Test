/**
 * function to print o/p
 * @param {*} msg - any value that needs to printed
 * @returns {undefined}
 */
function log(msg) {
  return console.log(JSON.stringify(msg || '', null, 2));
}

/**
 * function to print o/p
 * @param {*} err - any err that needs to printed
 * @returns {undefined}
 */
function error(err) {
  return console.log(JSON.stringify(err || '', null, 2));
}

module.exports = {
  log,
  error
};
