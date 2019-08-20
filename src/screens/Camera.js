
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { RNCamera } from "react-native-camera";
// import SvgUri from 'react-native-svg-uri';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        barcodeFinderVisible: true
      },
      flashMode: RNCamera.Constants.FlashMode.off,
      flashOn: false
    };
  }

  async togleFlash() {
    await this.setState({ flashOn: !this.state.flashOn });
    if (this.state.flashOn) {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
    } else {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
    }
  }

  onBarCodeRead(scanResult) {
    if (scanResult.data != null) {
      console.warn({data:scanResult.data})
      this.props.navigation.navigate('Detail',{ScanDetail:scanResult.data})
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgreen",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }
  render() {
    const { height, width } = Dimensions.get("window");
    const maskRowHeight = Math.round((height - 200) / 20);
    const maskColWidth = (width - 250) / 2;

    return (
      <View style={styles.container}>
        {/* <View style={styles.cameraView}> */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
          barcodeFinderWidth={280}
          barcodeFinderHeight={220}
          // barcodeFinderBorderColor="white"
          // barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          flashMode={this.state.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          style={styles.cameraView}
          type={this.state.camera.type}
        >
          {/* <View style={styles.maskOutter}>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
          </View> */}
        </RNCamera>
        <Image style={{position:'absolute'}} height={'100%'} width={'100%'} source={require('../assets/img/camera.png')} resizeMode={'stretch'} />
        <View
          style={{
            flex: 1,
            position: "absolute",
            alignItems: "center",
            flexDirection: "row",
            margin: 40
          }}
        >
          <View
            elevation={20}
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Roboto-Medium"
              }}
            >
              Position the QR code within the frame
            </Text>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: "90%",
            // backgroundColor: "red",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          <View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                bottom: "50%"
                // backgroundColor: "red"
              }}
            >
              <TouchableOpacity style={{backgroundColor:'red'}} onPress={() => this.togleFlash()}>
                {/* <Icon
                  name={
                    this.state.flashOn === true
                      ? "flashlight"
                      : "flashlight-off"
                  }
                  style={[
                    this.state.flashOn === true
                      ? { color: "blue" }
                      : { color: "black" },
                    { fontSize: 30 }
                  ]}
                /> */}
                <Text>Flash</Text>
              </TouchableOpacity>
            </View>
            <View
              elevation={20}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                margin: 40,
                marginTop: 0,
                marginBottom: 0
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto-Medium"
                }}
              >
                Problem Scanning? Tap on the torch icon
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraView: {
    flex: 1,
    justifyContent: "flex-start"
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: 250,
    backgroundColor: "transparent"
    // borderColor: "white",
    // borderWidth: 1
  },
  maskFrame: {
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" }
});

export default Camera;