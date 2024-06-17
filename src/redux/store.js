import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlider.js";
import movieReducer from "./movies/movieSlider.js";

import { thunk } from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    auth: authReducer,
    movie: movieReducer,
})

const persistConfig = {
    key: "root",
    storage
}

const persistReducerRoot = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistReducerRoot ,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk),
});


export const persistor = persistStore(store)
