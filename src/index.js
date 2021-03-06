// @flow

import React from "react";
import ReactDOM from "react-dom";
import {createStore, compose} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import persistState from "redux-localstorage";
import {mapObjIndexed} from "ramda";
import immutable from "immutable";

import App from "./components/App";
import reducer from "./reducers";
import {initialState, typeConversions} from "./constants";

const localStorageDeserializer = (state: string) => {
  if (state) {
    const jsState = JSON.parse(state);
    mapObjIndexed((modeState, mode) => {
      mapObjIndexed((type, variable) => {
        jsState[mode][variable] = immutable[type](jsState[mode][variable]);
      }, typeConversions[mode]);
    }, typeConversions);

    return jsState;
  }
};

const enchancer = compose(
  persistState(undefined, {deserialize: localStorageDeserializer}),
);

const store = createStore(
  reducer,
  initialState,
  enchancer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/*" component={App} />
      </Router>
    </Provider>,
    document.getElementById("root"),
  );
};

render();
store.subscribe(render);
