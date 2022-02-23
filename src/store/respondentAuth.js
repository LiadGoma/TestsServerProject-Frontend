import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    isAuthenticated: false,
    respondentId: "",
};

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.respondentId = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.respondentId = "";
        }
    }
})

export const respondentAuthActions = authSlice.actions

export default authSlice.reducer;