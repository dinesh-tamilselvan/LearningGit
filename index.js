const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); //install
const db = require("./config/mongoose");

const bodyParser = require("body-parser");
//app.use(express.urlencoded()); //deprecated
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);

//extractstyle ands cripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static("assets/"));
//use express router
app.use('/', require('./routes/index'));//By default it fetches index

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server: ", err);
    }

    console.log(`Server is running on port: ${port}`);
});



