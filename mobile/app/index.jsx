import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen 123</Text>
      <Link href={"/about"}>About</Link>
      {/* This is how you would add an image in from a remote source
      <Image source={{uri: "https://plus.unsplash.com/premium_photo-1764536654639-8c69698fabf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"}}
      style = {{width: 100, height: 100}}></Image>*/}

      <Image
        source={require("@/assets/images/react-logo.png")}
        style = {{width: 100, height: 100}}
      />
    </View> 
  );
}
