import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPersonas$, fetchUIConfig$} from "./service/apiService";
import { setProfiles, selectProfile, selectTab } from "./redux/personaSlice";
import { setUIConfig } from "./redux/uiConfigSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const { profiles, selectedProfile, selectedTab } = useSelector(
    (state) => state.persona
  );

  const uiConfig = useSelector((state) => state.uiConfig.config);

  useEffect(() => {
    // Subscribe to Personas API
    const personaSub = fetchPersonas$().subscribe({
      next: (data) => {
        dispatch(setProfiles(data));
      },
      error: (err) => {
        console.error("Persona API Error:", err);
      },
    });

    // Subscribe to UI Config API
    const uiConfigSub = fetchUIConfig$().subscribe({
      next: (data) => {
        dispatch(setUIConfig(data));
      },
      error: (err) => {
        console.error("UI Config API Error:", err);
      },
    });

    // Cleanup
    return () => {
      personaSub.unsubscribe();
      uiConfigSub.unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Enterprise Dashboard</h1>

      {/* Profile Dropdown */}
      <select
        value={selectedProfile?.value || ""}
        onChange={(e) => {
          const profile = profiles.find(
            (p) => p.value === e.target.value
          );
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
          {uiConfig?.[selectedProfile.value]?.[selectedTab]?.widgets?.map(
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
