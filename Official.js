import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,} from "react-native"
import {Card} from 'react-native-shadow-cards';

const Stack = createNativeStackNavigator();

const Officials = () => {
  return (
<View style={styles.container}>
      <Card style={{padding: 10, margin: 10}}>
        <Text>Name:</Text>
        <Text>Address:</Text>
        <Text>Contact:</Text>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding:10
  },
});

export default Officials;
