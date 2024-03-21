import { ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";

export default function TermsCondition({ navigation }) {
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
          title="Terms and Condition"
          position="relative"
          color="black"
        />
        <Text>TermsCondition</Text>
      </View>
    </ScrollView>
  );
}
