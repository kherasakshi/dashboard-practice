import { createStore, combineReducers } from "redux";
import personaReducer from "./personaSlice";
import uiConfigReducer from "./uiConfigSlice";

const rootReducer = combineReducers({
  persona: personaReducer,
  uiConfig: uiConfigReducer
});

const store = createStore(rootReducer);

export default store;
