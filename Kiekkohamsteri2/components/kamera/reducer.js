export const CAMERA_INIT = 'kamera/CAMERA_INIT'
export const CAMERA_READY = 'kamera/CAMERA_READY'
export const SHOW_IMAGE = 'kamera/SHOW_IMAGE'

const initialState = {
    isCameraReady: false,
    camera: null,
    image: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAMERA_INIT:
            return {
                ...state,
                image: null,
                camera: null,
                isCameraReady: false
            }
        case CAMERA_READY:
            return {
                ...state,
                image: null,
                camera: action.params.ref,
                isCameraReady: true
            }
        case SHOW_IMAGE:
            return {
                ...state,
                camera: null,
                isCameraReady: false,
                image: action.params.image
            }
        default:
            return state
    }
}

export const cameraInit = () => ({
    type: CAMERA_INIT
})

export const cameraReady = params => ({
    type: CAMERA_READY,
    params
})

export const showImage = params => ({
    type: SHOW_IMAGE,
    params
})

export default reducer
