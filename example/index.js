var Messager = require("../lib");

const FILE = __dirname + "/test";

var server = Messager.Server(FILE);
server.on("foo", function (a, r, g, u, m, e, n, t, s) {
    console.log(a, r, g, u, m, e, n, t, s);
});

var client = Messager.Client(FILE);
client.send("foo", "a", "r", "g", "u", "m", "e", "n", "t", "s");
