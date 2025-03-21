var exec = require('cordova/exec');

module.exports = function () {
  return new Promise(function (resolve, reject) {
    exec(resolve, reject, 'ResetFontSize', 'reset', []);
  });
};
