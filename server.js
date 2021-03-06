var express = require("express");
var path = require("path");
var cors = require("cors");

var app = express();
var PORT = process.env.PORT || 3000;
//hand data parsing 
app.use(express.static("app/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Directs all relative paths to start at this folder.


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});