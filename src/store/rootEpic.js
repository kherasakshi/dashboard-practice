// For now we don’t have real epics.
// So create empty epic setup:

import { combineEpics, ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { fetchPersonas$, fetchUIConfig$ } from "../services/apiService";
import { setProfiles } from "./personaSlice";
import { setUIConfig } from "./uiConfigSlice";

const loadPersonasEpic = (action$) =>
  action$.pipe(
    ofType("LOAD_PERSONAS"),
    mergeMap(() =>
      fetchPersonas$().pipe(map((data) => setProfiles(data)))
    )
  );

const loadUIConfigEpic = (action$) =>
  action$.pipe(
    ofType("LOAD_UI_CONFIG"),
    mergeMap(() =>
      fetchUIConfig$().pipe(map((data) => setUIConfig(data)))
    )
  );

export default combineEpics(loadPersonasEpic, loadUIConfigEpic);
