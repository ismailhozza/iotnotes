import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import noteReducer from "./noteReducer"
import App from "./App"

ReactDOM.render(
  <Provider store={createStore(noteReducer)}>
    <App />
  </Provider>, document.getElementById("root"))

