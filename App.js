import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    )
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync()
      console.log(uri) // You can use this URI for further processing
    }
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
})
