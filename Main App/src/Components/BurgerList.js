import React from 'react';
import { View, Text } from 'react-native';

const BurgerList = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>Hello BURGER</Text>
    </View>
  );
};

export default BurgerList;
