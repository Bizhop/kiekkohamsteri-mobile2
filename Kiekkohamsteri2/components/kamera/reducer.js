export const CAMERA_INIT = 'kamera/CAMERA_INIT'
export const SHOW_IMAGE = 'kamera/SHOW_IMAGE'

const initialState = {
    image: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAMERA_INIT:
            return {
                ...state,
                image: null
            }
        case SHOW_IMAGE:
            return {
                ...state,
                image: action.params.image
            }
        default:
            return state
    }
}

export const cameraInit = () => ({
    type: CAMERA_INIT
})

export const showImage = params => ({
    type: SHOW_IMAGE,
    params
})

export default reducer
