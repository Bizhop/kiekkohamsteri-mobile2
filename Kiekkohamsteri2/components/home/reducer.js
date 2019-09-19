export const SETUP_GOOGLE_SIGNIN = 'home/SETUP_GOOGLE_SIGNIN'
export const LOGIN = 'home/LOGIN'
export const LOGIN_SUCCESS = 'home/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'home/LOGIN_FAIL'

const initialState = {
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.userInfo == null ? null : action.userInfo.user,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.data.user,
                error: null
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user:null,
                error: 'Kirjautuminen epäonnistui: ' + action.error.response.status
            }
        default: return state
    }
}

export const login = userInfo => ({
    type: LOGIN,
    userInfo
})

export default reducer