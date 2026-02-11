import { combineReducers } from 'redux';

const initialState = {
    message: "Redux is working!"
}

const dummyReducer = (state = initialState, action) => {
   switch(action.type) {
         default:
            return state;
   }
}

const rootReducer = combineReducers({
    dummy: dummyReducer
})

export default rootReducer;