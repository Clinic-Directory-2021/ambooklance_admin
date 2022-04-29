import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from "./TopNav";
const Stack =  createNativeStackNavigator();

const TopNavTabs = () => {
  return (
    <Tabs/>
  );
};

export default TopNavTabs;
