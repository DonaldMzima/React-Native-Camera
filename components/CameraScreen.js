// CameraComponent.js

import React, { useRef } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'

const CameraComponent = () => {
  const cameraRef = useRef(null)

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true }
      const data = await cameraRef.current.takePictureAsync(options)
      console.log(data.uri)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CameraComponent
