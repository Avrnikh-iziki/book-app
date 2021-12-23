import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
export default function Header({ profile, navigation, setCurrentComp }) {

    const logout = () => {
        AsyncStorage.clear()
        navigation.push('Home')
    }

    return (

        <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-between"

        }}>
            < TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => logout()}
            >
                <Text style={{ ...FONTS.body3, color: COLORS.primary ,textAlign:"center" }}>
                    log out
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {profile}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                height: 40,
                paddingLeft: 3,
                paddingRight: SIZES.radius,
                borderRadius: 20
            }}
                onPress={() => setCurrentComp('New Book')}
            >
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 25,
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}>
                        <Image
                            source={icons.plus_icon}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </View>
                    <Text style={{
                        marginLeft: SIZES.base,
                        color: COLORS.white,
                        ...FONTS.body3
                    }}> New Book</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}
