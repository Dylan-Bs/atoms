const stream = new EventSource('http://localhost:8080/stream');

stream.onmessage = ({data, lastEventId}) => {
  const message = JSON.parse(data);
  listeners.forEach(listener => listener({message, id: lastEventId}));
};

let listeners = [];

export const register = listener => listeners = [...listeners, listener];

export const unregister = listener => listeners.filter(l => l !== listener);
