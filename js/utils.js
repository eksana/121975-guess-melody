const app = document.querySelector(`.js-app`);

let node;
let oldScreen;
let newScreen;

const getNode = (string) => {
  node = document.createElement(`div`);
  node.innerHTML = string;

  return node.firstChild;
};

const showScreen = (screen) => {
  oldScreen = app.querySelector(`.js-main`);
  newScreen = screen;

  app.replaceChild(newScreen.cloneNode(true), oldScreen);
};

export {getNode, showScreen};