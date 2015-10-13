// Dependencies
var Mkdirp = require("mkdirp")
  , Net = require("net")
  , EventEmitter = require("events").EventEmitter
  , Path = require("path")
  , Sliced = require("sliced")
  , Abs = require("abs")
  ;

// Export
var Messager = module.exports = {};

/**
 * Server
 * Initializes the `Messager` server.
 *
 * @name Server
 * @function
 * @param {String} path The path where the local socket server is listening for connections.
 * @return {EventEmitter} An `EventEmitter` instance, extended with the following fields:
 *
 *  - `server` (Server): The `Net.Server` instance.
 *  - `socket` (Socket): The server socket.
 *  - `path` (String): The normalized socket path.
 *  - `close` (Function): A helper function which closes the server and the socket.
 *
 *  You can listen to the following core events:
 *
 *   - `_raw_data`: emitted when the socket receives data.
 *   - `error`: emitted when something wrong happens.
 */
Messager.Server = function Server (path) {
    var ev = new EventEmitter();
    ev.server = Net.createServer(function (socket) {
        ev.socket = socket;
        socket.on("data", function(c) {
            ev.emit("_raw_data", c.toString());
            try {
                c = JSON.parse(c);
            } catch (e) {}
            ev.emit.apply(ev, [c.event].concat(c.args));
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
        ev.server.listen(path, function () {
            ev.emit("ready");
        });
    });

    /**
     * close
     * Closes the `Messager` server.
     *
     * @name close
     * @function
     * @param {Function} callback The callback function.
     */
    ev.close = function (callback) {
        ev.server.close(callback);
        ev.socket.end();
    };
    return ev;
};


/**
 * Client
 * Creates a `Messager` client instance.
 *
 * @name Client
 * @function
 * @param {String} path The path where the local socket server is listening for connections.
 * @return {EventEmitter} An `EventEmitter` instance, extended with the following fields:
 *
 *  - `socket` (Socket): The server socket.
 *  - `path` (String): The normalized socket path.
 *  - `send` (Function): Emit events and data to the server.
 *
 *  You can listen to the following core events:
 *
 *   - `error`: emitted when something wrong happens.
 */
Messager.Client = function Client (path) {
    var ev = new EventEmitter();

    ev.path = path = Abs(path);
    ev.socket = Net.connect(ev.path);

    ev.socket.on("error", function (err) {
        ev.emit("error", err);
    });

    this.ev = ev;

    /**
     * send
     * Emits a specified event (first argument) and data (the other arguments) to the server.
     *
     * Usage: `client.emit("myEvent", { some: "data" }, 42)`
     *
     * @name send
     * @function
     */
    ev.send = function () {
        this.socket.write(JSON.stringify({
            event: arguments[0]
          , args: Sliced(arguments, 1)
        }));
    };

    return ev;
};
