const util = require('util');
const jwt = require('jsonwebtoken');

//* Way 1
// function sign(payload, secretOrPrivateKey, options = {}) {
//     const promise = new Promise((resolve, reject) => {
//         jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
//             if (err) {
//                 return reject(err);
//             }

//             resolve(token);
//         })
//     });

//     return promise;
// }

//* Way 2
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
};
