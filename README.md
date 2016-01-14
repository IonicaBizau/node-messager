[![messager](http://i.imgur.com/jfmnDtz.png)](#)

# messager [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/messager.svg)](https://www.npmjs.com/package/messager) [![Downloads](https://img.shields.io/npm/dt/messager.svg)](https://www.npmjs.com/package/messager) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Inter-process communication made simple.

## Installation

```sh
$ npm i --save messager
```

## Example

```js
// Dependencies
var Messager = require("messager");

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
```

## Documentation

### `Server(path)`
Initializes the `Messager` server.

#### Params
- **String** `path`: The path where the local socket server is listening for connections.

#### Return
- **EventEmitter** An `EventEmitter` instance, extended with the following fields:
 - `server` (Server): The `Net.Server` instance.
 - `socket` (Socket): The server socket.
 - `path` (String): The normalized socket path.
 - `close` (Function): A helper function which closes the server and the socket.

 You can listen to the following core events:

  - `_raw_data`: emitted when the socket receives data.
  - `error`: emitted when something wrong happens.

### `close(callback)`
Closes the `Messager` server.

#### Params
- **Function** `callback`: The callback function.

### `Client(path)`
Creates a `Messager` client instance.

#### Params
- **String** `path`: The path where the local socket server is listening for connections.

#### Return
- **EventEmitter** An `EventEmitter` instance, extended with the following fields:
 - `socket` (Socket): The server socket.
 - `path` (String): The normalized socket path.
 - `send` (Function): Emit events and data to the server.

 You can listen to the following core events:

  - `error`: emitted when something wrong happens.

### `send()`
Emits a specified event (first argument) and data (the other arguments) to the server.

Usage: `client.emit("myEvent", { some: "data" }, 42)`

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md