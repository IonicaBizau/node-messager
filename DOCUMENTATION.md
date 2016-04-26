## Documentation

You can see below the API reference of this module.

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

