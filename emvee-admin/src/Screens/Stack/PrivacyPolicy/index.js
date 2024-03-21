import { ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";

export default function PrivacyPolicy({ navigation }) {
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
          title="Privacy Policy"
          position="relative"
          color="black"
        />
        <Text>PrivacyPolicy</Text>
      </View>
    </ScrollView>
  );
}
