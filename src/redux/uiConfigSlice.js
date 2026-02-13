const initialState = {
  config: {}
};

export const setUIConfig = (config) => ({
  type: "SET_UI_CONFIG",
  payload: config
});

export default function uiConfigReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_UI_CONFIG":
      return { ...state, config: action.payload };
    default:
      return state;
  }
}
