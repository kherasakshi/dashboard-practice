import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import personaData from "./mock/personaList.json";
import uiConfigData from "./mock/uiConfig.json";
import { setProfiles, selectProfile, selectTab } from "./redux/personaSlice";
import { setUIConfig } from "./redux/uiConfigSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.persona.profiles);
  const selectedProfile = useSelector((state) => state.persona.selectedProfile);
  const selectedTab = useSelector((state) => state.persona.selectedTab);
  const uiConfig = useSelector((state) => state.uiConfig.config);

  useEffect(() => {
    // Mock API delay
    setTimeout(() => {
      dispatch(setProfiles(personaData));
    }, 500);

    dispatch(setUIConfig(uiConfigData));
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Enterprise Dashboard Mock</h1>

      {/* Profile Dropdown */}
      <select
        onChange={(e) => {
          const profile = profiles.find((p) => p.value === e.target.value);
          dispatch(selectProfile(profile));
        }}
      >
        <option value="">Select Profile</option>
        {profiles.map((profile) => (
          <option key={profile.value} value={profile.value}>
            {profile.label}
          </option>
        ))}
      </select>

      {/* Tabs */}
      {selectedProfile && (
        <div className="tabs">
          {selectedProfile.entitledDashboards.map((tab) => (
            <button
              key={tab}
              onClick={() => dispatch(selectTab(tab))}
              className={selectedTab === tab ? "active-tab" : ""}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Widgets */}
      {selectedProfile && selectedTab && (
        <div className="widgets">
          {uiConfig[selectedProfile.value]?.[selectedTab]?.widgets?.map(
            (widget) => (
              <div className="card" key={widget}>
                {widget}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
