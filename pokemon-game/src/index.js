import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import store from "./store";

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

reactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
