import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Admin } from './App';
import Profile from './Profile';
import Calendar from './Calendar'


const Tab = createMaterialTopTabNavigator();
function TopNav() {
  return (
    <Tab.Navigator screenOptions={{tabBarIndicatorStyle:{backgroundColor:'#C81D35'}}}>
      <Tab.Screen name="Home" component={Admin}/>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Calendar" component={Calendar} />
    </Tab.Navigator>
  );
}
export default TopNav;
