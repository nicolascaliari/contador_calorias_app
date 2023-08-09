import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from "../types";
import Home from "../views/Home/Home";
import AddFood from "../views/AddFood/AddFood";

const Stack = createStackNavigator<RootStackParams>();


const Routes = () => 
    (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
                <Stack.Screen name="AddFood" component={AddFood} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )



export default Routes;