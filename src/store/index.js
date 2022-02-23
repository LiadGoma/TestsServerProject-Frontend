import {  configureStore } from "@reduxjs/toolkit"
import authReducer from "./respondentAuth";

const store = configureStore({
    reducer: {respondentAuth:authReducer},
});
export default store;