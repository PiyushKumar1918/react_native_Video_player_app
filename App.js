//react-native video package

//npm install --save react-native-video

//eske bs 2 chezz or add krna hoga

//include ':react-native-video'
// project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android')

//esko add kre

//import Video from "react-native-video"; //phir import bhe kr le

//<Video source={{uri:'background'}}
// ref={(ref)=>{
//   this.player = ref
// }}

// onBuffer={this.onBuffer}
// onError={this.onError}
// style ={styles.background} />

// </View>///view component mei paste kr de esko

//jp volume wala slider hota hai ya movie ko agee badhnae wala slider hota hai usko import krne ke liye
//react-native comumity slider mei jaake
//npm i @react-native-community/slider  //esko install kre

//phir import bhe kr le

//import Slider from '@react-native-community/slider';

//phir esko chipka do slide ka jaha use krna hai

//<Slider
// style={{width: 200, height: 40}}
// minimumValue={0}
// maximumValue={1}
// minimumTrackTintColor="#FFFFFF"
// maximumTrackTintColor="#000000"
// />

//full screen krne ke liye istall kre
//npm i react-native-orientation-locker
//full screen ko use krne ke liye sbse phle import kre
//import Orientation from 'react-native-orientation-locker';

//icons sab flticon se download kr skte hai

import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video'
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';


const App = () => {
  const [clicked, setClicked] = useState(false);
  const [progress, setProgress] = useState(null);
  const [paused, setPaused] = useState(false); //pause krne le liye
  const[fullScreen,setFullScreen]= useState(false)
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{width: '100%', height: fullScreen ?'100%': 200}}
        onPress={() => {
          setClicked(true);
        }}>
        <Video
          paused={paused}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          ref={ref}
          onProgress={x => {
            setProgress(x);
          }}
          // ref={(ref)=>{
          //   this.player = ref
          // }}

          // onBuffer={this.onBuffer}
          // onError={this.onError}
          // muted
          style={{width: '100%', height:fullScreen?'100%' : 200}}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(progress.currentTime - 10);
                }}>
                <Image
                  source={require('./src/backward.png')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}>
                <Image
                  source={
                    paused
                      ? require('./src/play-button.png')
                      : require('./src/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(progress.currentTime + 10);
                }}>
                <Image
                  source={require('./src/forward.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems:'center'
              }}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fffff"
                onValueChange={(x)=>{
                  ref.current.seek(parseInt(x));

                }}  
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
              <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems:'center'
              }}>
             
             <TouchableOpacity onPress={()=>{
              if(fullScreen){
                Orientation.lockToPortrait();
            } else{
                Orientation.lockToLandscape();
            }
            setFullScreen(!fullScreen)
            }}>
              <Image source={fullScreen?require('./src/minimize.png'):require('./src/full-size.png')}

              style={{
                    width: 24,
                    height: 24,
                    tintColor: 'white'
                  }}
              
              />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default App;
