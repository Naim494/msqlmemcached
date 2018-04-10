const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var url = require('url');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'Abstergos2!',
    database: 'hw7',
    insecureAuth: true,
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) {
        console.log("Connected!");
    };

});

app.get('/hw7', function (req, res) {
    var q = url.parse(req.url, true).query;
    console.log("URL: " + req.url);
    console.log("CLUB: " + q.club);
    console.log("POS: " + q.pos);

    con.query(
        'SELECT player, club, pos, gs, a FROM assists WHERE club="' + q.club +
        '" AND pos="' + q.pos + '" ORDER BY a DESC, gs DESC, player LIMIT 1;' +

        'SELECT AVG(a) as avg FROM (SELECT player, club, pos, a FROM assists WHERE club="' + q.club +
        '" AND pos="' + q.pos + '") TMP'
        , [1, 2],

        function (err, result, fields) {
            if (err) throw err;
            else
            {

              console.log(result[0]);
              console.log(result[1]);

              res.status(200).json({
                  club: q.club,
                  pos: q.pos,
                  max_assists: result[0][0].a,
                  player: result[0][0].player,
                  avg_assists: result[1][0].avg
              });
            }


        });
})

module.exports = app;

