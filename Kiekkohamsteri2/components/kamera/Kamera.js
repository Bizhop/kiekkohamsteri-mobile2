import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { showImage } from './reducer'

const Kamera = props => (
  <View style={styles.container}>
    {props.image ? (
      <Image
        width={Dimensions.get('window').width}
        source={{ uri: `data:image/png;base64,${props.image}` }}
      />
    ) : (
      <RNCamera
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
      >
        {({ camera, status }) => {
          if (status !== 'READY') {
            return <Text>Waiting for camera...</Text>
          } else {
            return (
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => takePicture({ camera: camera, showImage: props.showImage })}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            )
          }
        }}
      </RNCamera>
    )}
  </View>
)

const takePicture = props => {
  const options = {
    quality: 0.9,
    base64: true,
    fixOrientation: true,
    doNotSave: true,
    orientation: 'portrait'
  }
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
    justifyContent: 'center',
  },
})

const mapStateToProps = state => ({
  image: path(['camera', 'image'], state),
})

const mapDispatchToProps = dispatch => ({
  showImage: base64 => dispatch(showImage({ image: base64 })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Kamera)
