import React, { useCallback, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";

export default function AutoCompleteCategory({ value, setValue = () => null }) {
  const categorySelector = useSelector((selector) => selector.AllCategories);

  const [data, setData] = useState(categorySelector?.data);

  const filter = (item, query) =>
    item.t.toLowerCase().includes(query.toLowerCase());

  const onChangeText = useCallback((query) => {
    setValue(query);
    setData(categorySelector?.data?.filter((item) => filter(item, query)));
  }, []);

  const renderOption = (item) => (
    <AutocompleteItem key={item.k} title={item.t} />
  );

  return (
    <Autocomplete
      placeholder="Selecty Category"
      value={value?.t.toString() || ""}
      placement="inner top"
      onChangeText={onChangeText}
      onSelect={(data) => {
        setValue(categorySelector?.data[data]);
        // console.log("SELECT ", categorySelector?.data[data]);
      }}
      style={{
        elevation: 5,
        marginBottom: 10,
        width: Dimensions.get("screen").width - 50,
      }}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
}
