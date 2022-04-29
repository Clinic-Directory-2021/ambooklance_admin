import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Scheduled from './Scheduled';
import Transfer from './Transfer';
import Emergency from './Emergency';





const Tab = createMaterialTopTabNavigator();
function TopNav() {
  return (
    <Tab.Navigator screenOptions={{tabBarIndicatorStyle:{backgroundColor:'#C81D35'}}}>
      <Tab.Screen name="Emergency" component={Emergency}/>
      <Tab.Screen name="Scheduled" component={Scheduled} />
      <Tab.Screen name="Transfer" component={Transfer} />
    </Tab.Navigator>
  );
}
export default TopNav;
