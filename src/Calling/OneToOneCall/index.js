import React from "react";
import { View, StyleSheet, Text } from "react-native";
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

export default function OneToOneCalling() {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={[styles.videos, styles.localVideos]}>
          <Text>Your Video</Text>
          <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
        </View>

        <View style={[styles.videos, styles.remoteVideos]}>
          <Text>Friends Video</Text>
          {/* <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
          /> */}
        </View>
      </View>
      <Text>call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  videoContainer: {
    flex: 1,
    minHeight: 450,
  },
  videos: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",

    borderRadius: 6,
  },
  localVideos: {
    height: 100,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 400,
  },
  localVideo: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "100%",
  },
  remoteVideo: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "100%",
  },
});
