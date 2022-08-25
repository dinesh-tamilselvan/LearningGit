/*Group of actions in a file is called controller
app.get('routes',action())
*/

module.exports.home = function (req, res) {
    //return res.end("<h1>Express is up for Codial</h1>");
    //console.log(req.cookies);
    return res.render('home', {
        title: "Home"
    });
}

