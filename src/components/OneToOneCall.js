import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";
import { io } from "socket.io-client"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
const socket = io("http://localhost:8000"
  , { cors: { origin: "*" } });

export default function OneToOneCall({ navigation }) {
  const iconSize = 30;
  const [localStream, setLocalStream] = useState({ toURL: () => null });
  const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
  const [myPeerConnection, setMyPeerConnection] = useState(
    //change the config as you need
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        }, {
          urls: 'stun:stun1.l.google.com:19302',
        }, {
          urls: 'stun:stun2.l.google.com:19302',
        }

      ],
    }),
  );

  const disconnect = () => {
    /* 피어간 연결 종료 로직 */
    navigation.navigate("Calling");
    console.log("disconnect");
  };

  useEffect(() => {

    connectPeer();

    // Socket Code
    socket.on("matched", (roomName) => {
      //룸네임이 본인의 아이디로 시작하면 본인이 시그널링 주도
      if (roomName.match(new RegExp(`^${socket.id}`))) {
        // 방장 역할
        console.log("나는 방장입니다.");
        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        console.log("sent the offer");
        socket.emit("offer", offer, roomName);
      } else {
        // 방장이 아닌 역할
        console.log("나는 방장이 아닙니다.");
      }
    });

    socket.on("offer", async (offer) => {
      console.log("received the offer");
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
      console.log("sent the answer");
    });

    socket.on("answer", (answer) => {
      console.log("received the answer");
      myPeerConnection.setRemoteDescription(answer);
    });

    socket.on("ice", (ice) => {
      console.log("received candidate");
      myPeerConnection.addIceCandidate(ice);
    });

    // getUserMedia + addStream
    initCall();

    // RTC Code
    myPeerConnection.onicecandidate((data) => {
      console.log("sent candidate");
      socket.emit("ice", data.candidate, roomName);
    })

    myPeerConnection.onaddstream((data) => {
      console.log('On Add Stream');
      setRemoteStream(data.stream);
    })
  }
    , []);
  const connectPeer = async () => {
    try {
      console.log("inside connectPeer method");

      const socket = io(URL);
      socket.emit("random_one_to_one");
    } catch (e) {
      console.log(e);
    }
  };
  const initCall = async () => {
    await getCamera();
    getMedia();
  }

  const getCamera = async () => {
    let isFront = false;
    const devices = await mediaDevices.enumerateDevices();
    const camera = devices.filter((device) => device.kind === "videoinput" && device.facing === (isFront ? 'front' : 'environment'));
    console.log(camera);
    // videoSourceId = sourceInfo.deviceId;
  }

  const getMedia = async (deviceId) => {
    const myStream = await mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
        },
      })
    // Got stream!
    setLocalStream(myStream);

    // setup stream listening
    myPeerConnection.addStream(mystream);
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.localVideos}>
          <Text>My Video</Text>
          {/* 아래의 View를 RTCView로 변경해야함 */}
          <View style={styles.localVideo}></View>
        </View>

        <View style={styles.remoteVideos}>
          <Text>Friends Video</Text>
          {/* 아래의 View를 RTCView로 변경해야함 */}
          <View style={styles.remoteVideo}></View>
        </View>

        <View style={styles.callSetting}>
          <TouchableOpacity style={styles.muteBtn} >
            <Octicons name="mute" size={iconSize} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoOffBtn} >
            <Feather name="video" size={iconSize} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.disconnectBtn} >
            <Feather name="x-circle" size={iconSize} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff00",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  videoContainer: {
    flex: 1,
  },
  localVideos: {
    flex: 1,
    position: "absolute",
    overflow: "hidden",
    borderRadius: 6,
    height: "20%",
    width: "25%",
    marginBottom: 10,
    backgroundColor: "#aaaaaa",
    zIndex: 1,
  },
  remoteVideos: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 6,
    height: 400,
  },
  localVideo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#009999",
  },
  remoteVideo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ff0000",
  },
  callSetting: {
    backgroundColor: "#ff00ff",
    flex: 0.2,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  muteBtn: { backgroundColor: "#ff0000" },
  videoOffBtn: { backgroundColor: "#00ff00" },
  disconnectBtn: { backgroundColor: "#0000ff" },
});

/*
const muteSound = () => {
    Alert.alert("mute sound?", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
      },
    ]);
  };
  const videoOff = () => {
    Alert.alert("video off?", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
      },
    ]);
  };
*/