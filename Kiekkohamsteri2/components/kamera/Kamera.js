import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { showImage, cameraReady } from './reducer'

const Kamera = props => (
      <View style={styles.container}>
        {props.image ?
          <View style={styles.container}>
            <Image 
              source={{ uri: `data:image/png;base64,${props.image}` }}
              style={{ height: 200, width: 200 }}
            />
          </View>
          :
          <RNCamera
            ref={ref => {
              if(ref != null && !props.isCameraReady) {
                props.cameraReady(ref)
              }
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
          /> }
        {props.isCameraReady && 
          <View style={styles.button}>
            <TouchableOpacity onPress={() => takePicture({camera: props.camera, showImage: props.showImage})} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )

const takePicture = props => {
    console.log('taking picture')
    const options = { quality: 0.5, base64: true, fixOrientation: true, doNotSave: true, orientation: "portrait", width: 100 }
    props.camera.takePictureAsync(options).then(data => props.showImage(data.base64))
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({
  camera: path(['camera', 'camera'], state),
  isCameraReady: path(['camera', 'isCameraReady'], state),
  image: path(['camera', 'image'], state)
})

const mapDispatchToProps = dispatch => ({
  showImage: base64 => dispatch(showImage({image: base64})),
  cameraReady: ref => dispatch(cameraReady({ref: ref}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Kamera)