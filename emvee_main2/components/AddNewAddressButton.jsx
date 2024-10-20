import {
  Button,
  Card,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { GlobalColors } from "../infrasrtructure/GlobalVariables";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "../services/Slices/AddressSlice";
import { addDoc, collection } from "firebase/firestore";
import { firestoreDB } from "../infrasrtructure/firebase.config";

export default function AddNewAddressButton() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const AuthSelector = useSelector((state) => state.Authentication);

  const [Name, setName] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [PinCode] = useState("795006");
  const [AddType, setAddType] = useState(0);

  const [Errors, setErrors] = useState({
    Name: "",
  });

  const [Loading, setLoading] = useState(false);

  const validation = () => {
    const error = {};

    if (!Name) {
      error.Name = "Reciever's Name is required!";
    } else if (Name.length < 3) {
      error.Name = "Invalid Name!";
    } else if (Name.length > 30) {
      error.Name = "Names must have less than 30 characters!";
    }

    if (!Contact) {
      error.Contact = "Reciever's Contact Number is required!";
    } else if (Contact.length != 10) {
      error.Contact = "Invalid Contact Number!";
    }

    if (!Address) {
      error.Address = "Address is required!";
    } else if (Address.length > 30) {
      error.Address = "Address must have less than 40 characters!";
    }

    if (!Landmark) {
      error.Landmark = "Landmark is required!";
    } else if (Landmark.length > 30) {
      error.Landmark = "Landmark must have less than 30 characters!";
    }

    setErrors(error);

    if (error.Name || error.Contact || error.Landmark || error.Address) {
      return false;
    } else {
      return true;
    }
  };

  const addAddress = async ({ phone_no = "" }) => {
    if (!validation()) {
      console.log("Inputs Error!");
    } else {
      console.log({
        Name,
        Contact,
        Address,
        Landmark,
        PinCode,
        AddType,
        phone_no,
      });

      if (phone_no.length != 10) {
        console.log("Invalid Authentication => ", phone_no);
        return null;
      }

      try {
        setLoading(true);
        const docRef = collection(firestoreDB, "ur57");

        const docID = await addDoc(docRef, {
          n: Name,
          p: Contact,
          h: Address,
          l: Landmark,
          pi: PinCode,
          t: AddType,
          u: phone_no,
        });

        console.log(docID.id);

        dispatch(
          addNewAddress({
            n: Name,
            p: Contact,
            h: Address,
            l: Landmark,
            pi: PinCode,
            t: AddType,
            u: phone_no,
            k: docID.id,
          })
        );

        setLoading(false);
        setVisible(false);
        return docID.id || null;
      } catch (error) {
        setLoading(true);
        return null;
      }
    }
  };

  return (
    <>
      

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
          <ScrollView>
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
                value={Name}
                onChangeText={setName}
                maxLength={30}
                caption={() =>
                  Errors?.Name && (
                    <Text
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      {Errors?.Name}
                    </Text>
                  )
                }
              />
              <Input
                label="Reciever Contact Number"
                placeholder="10 digit number"
                value={Contact}
                onChangeText={setContact}
                maxLength={10}
                inputMode="numeric"
                caption={() =>
                  Errors?.Contact && (
                    <Text
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      {Errors?.Contact}
                    </Text>
                  )
                }
              />
              <Input
                label="Address"
                placeholder="House No. / Office No."
                value={Address}
                onChangeText={setAddress}
                maxLength={40}
                caption={() =>
                  Errors?.Address && (
                    <Text
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      {Errors?.Address}
                    </Text>
                  )
                }
              />
              <Input
                label="Area and Landmark"
                placeholder="Area , block , Near by, etc"
                value={Landmark}
                onChangeText={setLandmark}
                maxLength={30}
                caption={() =>
                  Errors?.Landmark && (
                    <Text
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      {Errors?.Landmark}
                    </Text>
                  )
                }
              />
              <Input
                label="Pin Code"
                placeholder="6 digit pin code"
                defaultValue={PinCode}
                maxLength={6}
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
                    selectedIndex={AddType}
                    onChange={(index) => setAddType(index)}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Radio
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      Home
                    </Radio>
                    <Radio
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      Work
                    </Radio>
                    <Radio
                      status="danger"
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      Other
                    </Radio>
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
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 700,
                  }}
                  appearance="outline"
                  onPress={() => setVisible(false)}
                >
                  Cancel
                </Button>
                {Loading ? (
                  <View
                    style={{
                      fontSize: 12,
                      marginTop: 3,
                      fontWeight: 700,
                      flex: 1,
                      backgroundColor: GlobalColors.themeColor,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Spinner status="control" />
                  </View>
                ) : (
                  <Button
                    status="danger"
                    style={{
                      fontSize: 12,
                      marginTop: 3,
                      fontWeight: 700,
                      flex: 1,
                    }}
                    onPress={() =>
                      addAddress({ phone_no: AuthSelector?.auth?.phone_no })
                    }
                  >
                    Save Address
                  </Button>
                )}
              </View>
            </View>
          </ScrollView>
        </Card>
      </Modal>
      <Button
        status="danger"
        style={{
          fontSize: 12,
          marginTop: 3,
          fontWeight: 700,
        }}
        appearance="outline"
        onPress={() => setVisible(true)}
      >
        Add a New Address
      </Button>
    </>
  );
}
