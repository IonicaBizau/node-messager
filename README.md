
[![messager](http://i.imgur.com/jfmnDtz.png)](#)

# messager

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/messager.svg)](https://www.npmjs.com/package/messager) [![Downloads](https://img.shields.io/npm/dt/messager.svg)](https://www.npmjs.com/package/messager)

> Inter-process communication made simple.

## :cloud: Installation

```sh
$ npm i --save messager
```


## :clipboard: Example



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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
