import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

import personaMock from "../mock/personaList.json";
import uiConfigMock from "../mock/uiConfig.json";

export const fetchPersonas$ = () =>
  ajax.getJSON("http://localhost:3001/personas").pipe(
    catchError(() => of(personaMock))
  );

export const fetchUIConfig$ = () =>
  ajax.getJSON("http://localhost:3001/uiConfig").pipe(
    catchError(() => of(uiConfigMock))
  );
