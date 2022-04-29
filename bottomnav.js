import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Admin } from './App';
import Profile from './Profile';


const Tab = createMaterialTopTabNavigator();
function TopNav() {
  return (
    <Tab.Navigator screenOptions={{tabBarIndicatorStyle:{backgroundColor:'#C81D35'}}}>
      <Tab.Screen name="Home" component={Admin}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default TopNav;
