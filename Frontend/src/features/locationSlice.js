import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    isGuest: false,
    accessToken: "",
    refreshToken: "",
    joinCode: "",
    joinURL : "",
    group:{
    },
    messages:{

    }
};

export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        resetGroup: (state, action) => {
            state.group = {}
            state.joinCode = ""
            state.joinURL  = ""
        },
        removeUser : (state, action) => {
            
            const user = action.payload
            const {[user]: removedKey, ...newState} = state.group
            state.group = newState
            // console.log(state.group)
        },
        setMyLoc: (state, action) => {
            const obj = {
                name: state.user,
                lat: action.payload.lat,
                long: action.payload.long,
                isActive: true
            }
            // state.group.myself = obj;

            state.group[state.user] = obj
            // const keys = Object.keys(state.group)
            // console.log(keys);
        },
        setJoinCodeURL : (state, action) => {
            state.joinCode = action.payload.joinCode
            state.joinURL = action.payload.joinURL
            // console.log("joincode : ", state.joinCode, "joinURL : ", state.joinURL)
        },
        setMyName : (state, action) => {
            state.user = action.payload
        },
        setAccessAndRefreshToken: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            // console.log(state.accessToken , " " , state.refreshToken)
        },
        updateGroup: (state, action) => {
            //locationData = {
            //    name: "user",
            //    lat: 43.2343
            //    long: 23.5432
            //    isActive: true
            //}
            // console.log(action.payload)
            const name = action.payload.name
            state.group[name] = action.payload
        },
        setMessage: (state, action) => {
            const name = action.payload.name
            state.messages[name] = action.payload.message
        },
        clearMessage: (state, action) => {
            // console.log(state.messages)
            const name = action.payload.name
            state.messages[name] = ""
        },
        setGuest: (state, action) => {
            state.isGuest = true
        }
        
    }
});

export const { setMyLoc , setMyName, setAccessAndRefreshToken, updateGroup, setJoinCodeURL, resetGroup,setMessage,clearMessage,setGuest, removeUser } = locationSlice.actions;
export default locationSlice.reducer;
