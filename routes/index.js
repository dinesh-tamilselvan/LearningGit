/*Routes is the entry point of the request from browser
    /home, /contest, /about are root level routers
    /users/profile,/users/edit multi level routers
*/

/* index.js (this file) is the entry point for all routing files*/

const express = require('express');
/*Not an instance is created every time, if already created anywhere in this program it is just referenced here*/
console.log('Router loaded')

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

/*for more than one routes(multi level router) can use router.use middleware
SYNTAX:router.use(/routername,require(required file))*/

router.use('/users', require('./users'));

module.exports = router;
