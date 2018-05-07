import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageEditor,
  ImageStore,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { uploadImage } from './Actions/uploadActions';

type Props = {
  uploaded: boolean,
  success: boolean,
  error: object,
};
class App extends Component<Props> {
  constructor() {
    super();
    
    this.state = {
      modalVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.uploaded && nextProps.uploaded) {
      this.setState({ modalVisible: true });
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, width: 200, };
      const data = await this.camera.takePictureAsync(options)
      const { width, height } = data;

      ImageEditor.cropImage(data.uri, {
        offset: { x: 0, y: 0 },
        size: { width, height },
        displaySize: { width: 200, height: 200 },
      }, (res) => {
        ImageStore.getBase64ForTag(res, (base64Data) => {
          this.props.uploadImage(base64Data);
        }, () => { alert('resizing failure!'); });
      }, (err) => {
        alert(err);
      });
    }
  };

  render() {
    const { success, error } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"} 
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=>{}}
        >
          <View style={styles.modalContent}>
            <Text>{success ? 'Successfully uploaded!' : error}</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible });
              }}
              style={styles.button}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.auto}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  }
});

const mapStateToProps = state => {
  return {
    uploaded: state.upload.uploaded,
    success: state.upload.success,
    error: state.upload.error,
  };
 }
 
 const mapDispatchToProps = dispatch => ({
  uploadImage (payload) {
    dispatch(uploadImage(payload))
  }
 })
 
 export default connect(mapStateToProps, mapDispatchToProps)(App);
