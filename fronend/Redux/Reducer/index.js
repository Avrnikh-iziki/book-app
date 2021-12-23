import { combineReducers } from 'redux'
import tokenReducer from "./tokenReducer"

let reducers = combineReducers({
    tokenReducer: tokenReducer,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer