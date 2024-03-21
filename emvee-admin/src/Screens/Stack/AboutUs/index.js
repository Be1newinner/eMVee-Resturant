import { ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";

export default function AboutUs({ navigation }) {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <TopView
          navigation={navigation}
          title="About Us"
          position="relative"
          color="black"
        />
        <Text>About Us</Text>
      </View>
    </ScrollView>
  );
}
