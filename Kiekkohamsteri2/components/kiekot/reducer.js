export const GET_DISCS = 'kiekot/GET'
export const GET_DISCS_SUCCESS = 'kiekot/GET_SUCCESS'
export const GET_DISCS_FAILURE = 'kiekot/GET_FAILURE'

const initialState = {
    kiekot: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DISCS:
            return { 
                ...state,
                loading: true 
            }
        case GET_DISCS_SUCCESS:
            return {
                ...state,
                loading: false,
                kiekot: action.payload.data.content
            }
        case GET_DISCS_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Kiekkojen haku epäonnistui'
            }
        default:
            return state

    }
}

export const getDiscs = () => ({
    type: GET_DISCS,
    payload: {
        request: {
            url: '/kiekot'
        }
    }
})

export default reducer