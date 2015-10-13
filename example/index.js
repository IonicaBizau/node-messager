// Dependencies
var Messager = require("../lib");

// Constants
const FILE = __dirname + "/test.sock";

// Create the server
var server = Messager.Server(FILE);

// Listen for "foo" messages
server.on("foo", function (a, r, g, u, m, e, n, t, s) {
    console.log(a, r, g, u, m, e, n, t, s);
    server.close(function (err) {
        console.log(err || "Done.");
    });
});

// Listen until the server is ready
server.on("ready", function () {
    // This code can be in another file (which is ran by another process)
    // Create the client and send a "foo" event and some data.
    var client = Messager.Client(FILE);
    client.send("foo", "a", "r", "g", "u", "m", "e", "n", "t", "s");
});
