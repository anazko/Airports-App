import { configureStore } from "@reduxjs/toolkit"
import airports from "./airports-slice"
import handbook from "./handbook.slice"
import auth from "./auth.slice"

export const store = configureStore({
    reducer: {
        airports,
        handbook,
        auth
    }
})

