import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "DancingScript-Bold": require("../assets/fonts/DancingScript-Bold.ttf"),
  });
