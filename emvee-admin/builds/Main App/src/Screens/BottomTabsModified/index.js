import BottomTabNavigation from "../../Infrastructure/BottomTabScreen";
import { NewOrderNotification } from "../../Components/NewOrderNotification";

export default function BottomTabsModified({ navigation }) {
  return (
    <>
      <NewOrderNotification navigation={navigation} />
      <BottomTabNavigation navigation={navigation} />
    </>
  );
}
