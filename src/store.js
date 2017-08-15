import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import galleryReducer from "./reducers/gallery-reducer";
import workshopReducer from "./reducers/workshops-reducer";
import countdownReducer from "./reducers/countdown-reducer";


const app = combineReducers({
	gallery: galleryReducer,
	workshops: workshopReducer,
	countdowns: countdownReducer
});

const middleware = applyMiddleware(thunk);

const store = createStore(app, {}, composeWithDevTools(middleware));

export default store;
