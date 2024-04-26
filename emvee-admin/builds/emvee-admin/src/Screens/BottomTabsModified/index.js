import BottomTabNavigation from "../../Infrastructure/BottomTabScreen";
import { NewOrderNotification } from "../../Components/Modals/NewOrderNotification";

export default function BottomTabsModified({ navigation }) {
  return (
    <>
      <NewOrderNotification navigation={navigation} />
      <BottomTabNavigation navigation={navigation} />
    </>
  );
}
