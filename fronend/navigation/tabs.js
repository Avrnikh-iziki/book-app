import React from "react";
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS } from "../constants";
import { Setting } from "../screens";
import { Home } from "../screens/";
import { Notification } from "../screens";
import { Book } from "../screens"
const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
    const serch = () => {
        console.log('serceh')
    }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                "headerShown": false,
                "tabBarActiveTintColor": "#fff",
                "tabBarInactiveTintColor": "lightgray",
                "tabBarActiveBackgroundColor": "#000",
                "tabBarInactiveBackgroundColor": "#000",
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;
                    switch (route.name) {
                        case "home":
                            return (
                                <Image
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            )

                        case "Search":
                            return (
                                <Image
                                    source={icons.search_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Notification":
                            return (
                                <Image
                                    source={icons.notification_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Setting":
                            return (
                                <Image
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="home"
                component={Home}
            />
            <Tab.Screen
                name="Search"
                component={Book}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                navigation={navigation}
            />
        </Tab.Navigator>
    )
}

export default Tabs;