import {
  Button,
  Card,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Dimensions, View } from "react-native";
import { GlobalColors } from "../Infrastructure/GlobalVariables";

export default function AddNewAddressButton() {
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View>
      <Modal
        visible={visible}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card
          disabled={true}
          style={{
            width: Dimensions.get("screen").width,
            gap: 10,
          }}
        >
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontSize: 17,
              }}
            >
              Add address details!
            </Text>
            <Input
              label="Reciever Name"
              placeholder="full name"
              // caption={<Text>Reciever Name</Text>}
            />
            <Input
              label="Reciever Contact Number"
              placeholder="10 digit number"
              // caption={<Text>Reciever Name</Text>}
            />
            <Input
              label="Address"
              placeholder="House No. / Office No."
              // caption={<Text>Reciever Name</Text>}
            />
            <Input
              label="Area and Landmark"
              placeholder="Area , block , Near by, etc"
              // caption={<Text>Reciever Name</Text>}
            />
            <Input
              label="Pin Code"
              placeholder="6 digit pin code"
              defaultValue="795006"
              disabled
              // caption={<Text>Reciever Name</Text>}
            />
            <View>
              <Text
                style={{
                  color: GlobalColors.productText,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Address Type
              </Text>
              <View>
                <RadioGroup
                  selectedIndex={selectedIndex}
                  onChange={(index) => setSelectedIndex(index)}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Radio status="danger">Home</Radio>
                  <Radio status="danger">Work</Radio>
                  <Radio status="danger">Other</Radio>
                </RadioGroup>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Button
                status="danger"
                appearance="outline"
                onPress={() => setVisible(false)}
              >
                Cancel
              </Button>
              <Button
                status="danger"
                style={{
                  flex: 1,
                }}
                onPress={() => setVisible(false)}
              >
                Save Address
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
      <Button
        status="danger"
        appearance="outline"
        onPress={() => setVisible(true)}
      >
        Add a New Address
      </Button>
    </View>
  );
}
