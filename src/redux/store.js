import { configureStore } from "@reduxjs/toolkit";

import { shazamCoreApi } from "./services/sharamCore";
import playerReducer from "./features/playerSlice";

/*
    * Redux middleware: Là 1 cơ chế hoạt động của redux cho phép can thiệt vào cái flow hoạt động của redux (Sau khi dispatch 1 action và trước khi cái action đó đến reducer).
    * We often use redux-middleware to xử lí asynchronous code. Vì cơ chế của redux ko cho phép action và reducer có logic side effect code.

*/

export const store = configureStore({ // * Khi config cái store bằng configureStore thì mặc định redux-toolkit có thêm sẵn các middleware vào rồi, trong đó có redux-thunk.

    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware), // * adding some middlewares (Thêm các middlewares cho store ngoài các middleware mặc định)
    // middleware: (getDefaultMiddleware) => getDefaultMiddle() => Mặc định thì middleware của redux-toolkit là result của hàm get... luôn.
    // Nếu ko muốn dùng các middleware mặc định thì => middleware: [shazamCoreApi.middleware]
});
