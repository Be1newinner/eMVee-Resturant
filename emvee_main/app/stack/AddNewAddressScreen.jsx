import {
  Button,
  Card,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "@/services/Slices/AddressSlice";
import { addDoc, collection } from "firebase/firestore";
import { firestoreDB } from "@/infrastructure/firebase.config";
import { useRouter } from "expo-router";

export default function AddNewAddressButton() {
  const dispatch = useDispatch();
  const AuthSelector = useSelector((state) => state.Authentication);
  const router = useRouter();

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
      error.Name = "Customer's Name is required!";
    } else if (Name.length < 3) {
      error.Name = "Invalid Name!";
    } else if (Name.length > 30) {
      error.Name = "Names must have less than 30 characters!";
    }

    if (!Contact) {
      error.Contact = "Customer's Contact Number is required!";
    } else if (Contact.length != 10) {
      error.Contact = "Invalid Contact Number!";
    }

    if (!Address) {
      error.Address = "Address is required!";
      if (Address.length > 40) {
        error.Address = "Address must have less than 40 characters!";
      }
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

  const addAddress = async ({
    phone_no = AuthSelector?.auth?.phone_no || "",
  }) => {
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

        return docID.id || null;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        gap: 10,
      }}
    >
      <ScrollView>
        <View style={{ gap: 10, padding: 20 }}>
          <Text
            style={{
              fontSize: 17,
            }}
          >
            Add address details!
          </Text>
          <Input
            label="Customer Name"
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
            label="Customer Contact Number"
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
            // caption={<Text>Customer Name</Text>}
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
              onPress={() => router.canGoBack() && router.back()}
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
    </View>
  );
}
