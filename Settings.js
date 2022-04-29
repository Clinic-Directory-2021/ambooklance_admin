import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from "react-native"


const Stack = createNativeStackNavigator();

const Settings = () => {
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
});

export default Settings;
