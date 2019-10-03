import SyncStorage from 'sync-storage'
import { dissoc } from 'ramda'

export const LOGIN = 'home/LOGIN'
export const LOGIN_SUCCESS = 'home/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'home/LOGIN_FAIL'
export const LOGOUT = 'home/LOGOUT'

const initialState = {
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: null,
                error: null
            }
        case LOGIN_SUCCESS:
            SyncStorage.set('token', action.payload.data.jwt)
            return {
                ...state,
                user: dissoc('jwt', action.payload.data),
                error: null
            }
        case LOGIN_FAIL:
            SyncStorage.remove('token')
            return {
                ...state,
                user: null,
                error: 'Kirjautuminen epäonnistui: ' + action.error.response.status
            }
        case LOGOUT:
            SyncStorage.remove('token')
            return {
                ...state,
                user: null,
                error: null
            }
        default: return state
    }
}

export const login = userInfo => ({
    type: LOGIN,
    payload: {
        request: {
            url: '/auth/login',
            headers: {
                'Authorization': userInfo.idToken
            }
        }
    }
})

export const logout = () => ({
    type: LOGOUT,
    payload: {}
})

export default reducer