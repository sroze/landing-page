var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || '0.0.0.0',
    port = parseInt(process.env.PORT, 10) || 80,
    publicDir = process.argv[2] || __dirname + '/public',
    message = process.env.MESSAGE || "Please be patient. We're crafting something for you.";

app.get("/", function (req, res) {
  res.status(200).send(
      "<!doctype html>"+
      "<html class=\"no-js\">"+
      "<head>"+
      "    <meta charset=\"utf-8\">"+
      "    <base href=\"/\">"+
      "    <title>"+message+"</title>"+
      "    <meta name=\"description\" content=\"\">"+
      "    <meta name=\"viewport\" content=\"width=device-width\">"+
      "    <link rel=\"stylesheet\" href=\"styles/main.css\">"+
      "    <link href=\"https://fonts.googleapis.com/css?family=Roboto:400,500,700\" rel=\"stylesheet\" type=\"text/css\">"+
      "</head>"+
      "<body>"+
      "  <div class=\"message\">"+message+"</div>"+
      "</body>"+
      "</html>"
    );
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
