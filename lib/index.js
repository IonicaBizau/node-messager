var Mkdirp = require("mkdirp")
  , Net = require("net")
  , EventEmitter = require("events").EventEmitter
  , Path = require("path")
  , Sliced = require("sliced")
  ;

var Messager = module.exports = {};

Messager.Server = function Server (path) {
    var ev = new EventEmitter();
    ev.server = net.createServer(function (stream) {
        stream.on("data", function(c) {
            ev.emit("_raw_data", c.toString());
            try {
                c = JSON.stringify(c);
            } catch (e) {}
            ev.apply(ev, [c.event].concat(c.args));
        });
    });

    ev.server.on("error", function (err) {
        ev.emit("error", err);
    });

    ev.path = path = Abs(path);
    Mkdirp(Path.dirname(path), function (err) {
        if (err) {
            return ev.emit("error", err);
        }
        ev.server.listen(path);
    });

    return ev;
};


Messager.Client = function Client (path) {
    var ev = new EventEmitter();
    ev.path = path = Abs(path);
    ev.stream = Net.connect(ev.path);
    ev.stream.on("error", function (err) {
        ev.emit("error", err);
    });
    this.ev = ev;
    return ev;
};

Messager.client.prototype.send = function () {
    this.ev.stream.write(JSON.stringify({
        event: arguments[0]
      , args: Sliced(arguments, 1)
    }));
};
