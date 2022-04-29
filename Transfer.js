import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import {Card} from 'react-native-shadow-cards';

const Tab = createMaterialTopTabNavigator();

function Transfer() {
  return (

    <View style={styles.container}>
    <Card style={{padding: 10, margin: 10}}>
      <Text>Name:</Text>
      <Text>Contact:</Text>
      <Text>Date and Time:</Text>
    </Card>
  </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10
  },
}
)

export default Transfer;