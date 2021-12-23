
let tokenReducer = (state = { token: '', login: false }, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                login: action.payload,
                token: action.payload
            }
        case "LOGOUT":
            return {
                login: action.payload,
                token: action.payload
            }
        default:
            return state
    }
}

export default tokenReducer