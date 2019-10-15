let listeners = [];
let id = 0;

const notify = message => {
  const idLine = `id: ${id}\n`;
  const dataLine = `data: ${JSON.stringify(message)}\n\n`;
  listeners.forEach(res => {
    res.write(idLine);
    res.write(dataLine);
  });
  id++;
};

const register = res => listeners = [...listeners, res];

const unregister = res => listeners.filter(listener => listener !== res);

module.exports = {notify, register, unregister};
