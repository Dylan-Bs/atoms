const stream = new EventSource('http://localhost:8080/stream');

stream.onmessage = message => {
  const data = JSON.parse(message.data);
  listeners.forEach(listener => listener(data));
};

let listeners = [];

export const register = listener => listeners = [...listeners, listener];

export const unregister = listener => listeners.filter(l => l !== listener);
