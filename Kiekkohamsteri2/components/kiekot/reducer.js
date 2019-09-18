export const GET_DISCS = 'kiekot/GET'
export const GET_DISCS_SUCCESS = 'kiekot/GET_SUCCESS'
export const GET_DISCS_FAIL = 'kiekot/GET_FAIL'

const initialState = {
    kiekot: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DISCS:
            return { 
                ...state,
                loading: true,
                error: null
            }
        case GET_DISCS_SUCCESS:
            return {
                ...state,
                loading: false,
                kiekot: action.payload.data,
                error: null
            }
        case GET_DISCS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Kiekkojen haku epäonnistui'
            }
        default:
            return state

    }
}

export const getDiscs = token => ({
    type: GET_DISCS,
    payload: {
        request: {
            url: '/kiekot?size=1000&sort=mold.valmistaja.valmistaja,asc&sort=mold.nopeus,asc&sort=mold.kiekko,asc&sort=muovi.muovi,asc',
            headers: {
                'Authorization': token
            }
        }
    }
})

export default reducer