export const GET_DISCS = 'kiekot/GET'
export const GET_DISCS_SUCCESS = 'kiekot/GET_SUCCESS'
export const GET_DISCS_FAIL = 'kiekot/GET_FAIL'
export const NEW_DISC = 'kiekot/NEW_DISC'
export const NEW_DISC_SUCCESS = 'kiekot/NEW_DISC_SUCCESS'
export const NEW_DISC_FAIL = 'kiekot/NEW_DISC_FAIL'

const initialState = {
  kiekot: null,
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISCS:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_DISCS_SUCCESS:
      return {
        ...state,
        loading: false,
        kiekot: action.payload.data,
        error: null,
      }
    case GET_DISCS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Kiekkojen haku epäonnistui: ' + action.error.response.status,
      }
    default:
      return state
  }
}

export const getDiscs = params => ({
  type: GET_DISCS,
  payload: {
    request: {
      url:
        '/kiekot?size=1000&sort=mold.valmistaja.valmistaja,asc&sort=mold.nopeus,asc&sort=mold.kiekko,asc&sort=muovi.muovi,asc',
      headers: {
        Authorization: params.token,
      },
    },
  },
})

export const newDisc = params => ({
  type: NEW_DISC,
  payload: {
    params: params,
    request: {
      method: 'post',
      url: '/kiekot',
      data: {
        data: `data:image/jpeg;base64,${params.image}`,
        name: '',
      },
      headers: {
        Authorization: params.token,
      },
    },
  },
})

export default reducer
