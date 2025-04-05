// websocketMiddleware.js
const websocketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    switch (action.type) {
      case 'websocket/connect':
        if (socket !== null) {
          socket.close();
        }
        console.log(action.payload.url)
        socket = new WebSocket(action.payload.url);

        socket.onopen = () => {
          console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          Object.keys(data).forEach((crypto) => {
            store.dispatch({
              type: 'websocket/updatePrice',
              payload: { id: crypto, price: data[crypto] },
            });
          });
        };

        socket.onclose = () => {
          console.log('WebSocket disconnected');
        };

        break;

      case 'websocket/disconnect':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('WebSocket disconnected');
        break;

      default:
        return next(action);
    }
  };
};

export default websocketMiddleware;
