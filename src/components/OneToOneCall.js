import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// 서버 : "http://kitcapstone.codns.com"
// PC  : "http://localhost"
// 로컬 : "http://192.168.0.9"
// 승형PC : "aitta.iptime.org"

const SERVER_DOMAIN = "http://123.213.225.243";
const SERVER_PORT = "3000";

let socket;
let realRoomName;

export default function OneToOneCall({ navigation }) {
  const iconSize = 60;
  let tmpStream;
  const [localStream, setLocalStream] = useState({ toURL: () => null });
  const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
  const [isFront, setIsFront] = useState(false);
  const [onMic, setOnMic] = useState(false);
  const [onVideo, setOnVideo] = useState(true);

  const [myPeerConnection, setMyPeerConnection] = useState(
    //change the config as you need
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "stun:stun1.l.google.com:19302",
        },
        {
          urls: "stun:stun2.l.google.com:19302",
        },
      ],
    })
  );

  const toggleMic = () => {
    setOnMic(!onMic);
  };

  const toggleVideo = () => {
    setOnVideo(!onVideo);
  };

  const disconnect = () => {
    /* 피어간 연결 종료 로직 */
    navigation.navigate("Calling");
    console.log("socket disconnect");
    // socket.disconnect();
  };

  useEffect(async () => {
    console.log("-----------------useEffect----------------");

    await initSocket();
    await initCall();

    console.log("End initCall method");
    console.log("matched start");

    // RTC Code
    myPeerConnection.onicecandidate = (data) => {
      console.log("sent candidate");
      console.log(realRoomName);
      socket.emit("ice", data.candidate, realRoomName);
    };

    myPeerConnection.onaddstream = async (data) => {
      console.log("On Add Stream");
      await setRemoteStream(data.stream);
      setTimeout(() => setLocalStream(tmpStream), 1000);
    };
  }, []);

  const initSocket = async () => {
    console.log("initSocket");

    // 서버 연결
    socket = await io(SERVER_DOMAIN + ":" + SERVER_PORT, {
      cors: { origin: "*" },
    });

    // Socket Code
    socket.on("matched", async (roomName) => {
      realRoomName = roomName;
      //룸네임이 본인의 아이디로 시작하면 본인이 시그널링 주도
      if (roomName.match(new RegExp(`^${socket.id}`))) {
        // 방장 역할

        console.log("나는 방장입니다.");
        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        console.log("sent the offer");
        socket.emit("offer", offer, realRoomName);
      } else {
        // 방장이 아닌 역할
        console.log("나는 방장이 아닙니다.");
      }
    });

    socket.on("offer", async (offer) => {
      console.log("received the offer");
      await myPeerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);

      socket.emit("answer", answer, realRoomName);
      console.log("sent the answer");
    });

    socket.on("answer", async (answer) => {
      console.log("received the answer");
      await myPeerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socket.on("ice", (ice) => {
      console.log("received candidate");
      myPeerConnection.addIceCandidate(ice);
    });
  };

  const initCall = async () => {
    console.log("initCall");

    socket.emit("random_one_to_one");
    console.log("sent random_one_to_one");

    await getMedia();
    //await getCamera();
    connectPeer();
  };

  const connectPeer = () => {
    console.log("connectPeer");
  };

  const getCamera = async () => {
    console.log("getCamera Start");
    const devices = await mediaDevices.enumerateDevices();
    // mediaDevices.enumerateDevices().then(source => {
    // console.log(source);
    // });
    // console.log("devices : ", devices);
    const camera = devices.filter((device) => {
      device.kind === "videoinput" && device.facing === "front";
    });
    // console.log("camera : ", camera);
    // videoSourceId = sourceInfo.deviceId;
  };

  const getMedia = async () => {
    console.log("getMedia start");
    const myStream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode: "user",
        // optional: videoSourceId ? expo start --localhost --android[{ sourceId: videoSourceId }] : [],
      },
    });
    console.log("get mystream");

    // Got stream!room
    // setLocalStream(myStream);
    tmpStream = myStream;

    // setup stream listening
    myPeerConnection.addStream(myStream);
  };

  const handleDisconnectBtn = () => {
    /* 피어간 연결 종료 로직 */
    console.log("socket disconnect");
    // console.log(socket);
    if (socket !== undefined && socket !== null && socket.connected) {
      socket.emit("discon", realRoomName);
      //socket.disconnect();
      myPeerConnection.close();
    } else {
      console.log("socket is undifined");
    }
    socket = null;
    navigation.navigate("Calling");
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.remoteVideos}>
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
          />
        </View>
        <View style={styles.localVideos}>
          <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
        </View>
      </View>
      <View style={styles.callSetting}>
        <TouchableOpacity onPress={toggleMic}>
          <MaterialCommunityIcons
            name={onMic ? "volume-mute" : "volume-source"}
            size={iconSize}
            color={onMic ? "grey" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleVideo}>
          <MaterialIcons
            name={onVideo ? "videocam" : "videocam-off"}
            size={iconSize}
            color={onVideo ? "#05ff05" : "red"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDisconnectBtn}>
          <MaterialCommunityIcons
            name="phone-off"
            size={iconSize}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff00",
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "row",
  },
  videoContainer: {
    flex: 1,
    position: "relative",
  },
  localVideos: {
    flex: 1,
    bottom: 0,
    right: 0,
    position: "absolute",
    overflow: "hidden",
    borderRadius: 6,
    height: "20%",
    width: "25%",
    // marginBottom: 10,
    backgroundColor: "#ffff00",
    zIndex: 1,
  },
  remoteVideos: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 6,
    height: 400,
    // borderColor: "#111111",
    // borderWidth: 4,
  },
  localVideo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#009999",
    zIndex: 999,
  },
  remoteVideo: {
    // flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
    zIndex: -1,
  },
  callSetting: {
    backgroundColor: "#fff0ff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopColor: "#aaaaaa",
    borderTopWidth: 0.5,
  },
});
