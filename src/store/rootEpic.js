// For now we don’t have real epics.
// So create empty epic setup:

import { combineEpics } from "redux-observable";
import { EMPTY } from "rxjs";

const dummyEpic = () => EMPTY;

const rootEpic = combineEpics(dummyEpic);

export default rootEpic;
