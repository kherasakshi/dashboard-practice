const initialState = {
  profiles: [],
  selectedProfile: null,
  selectedTab: null
};

export const setProfiles = (profiles) => ({
  type: "SET_PROFILES",
  payload: profiles
});

export const selectProfile = (profile) => ({
  type: "SELECT_PROFILE",
  payload: profile
});

export const selectTab = (tab) => ({
  type: "SELECT_TAB",
  payload: tab
});

export default function personaReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PROFILES":
      return { ...state, profiles: action.payload };
    case "SELECT_PROFILE":
      return { ...state, selectedProfile: action.payload, selectedTab: null };
    case "SELECT_TAB":
      return { ...state, selectedTab: action.payload };
    default:
      return state;
  }
}
