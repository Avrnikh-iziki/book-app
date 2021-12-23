import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

export default function Headre({ profile, newb , point }) {
    return (

        <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-between"

        }}>
            <View style={{ marginRight: SIZES.padding }}>
                <Text style={{ ...FONTS.body3, color: COLORS.primary , textAlign:"center"}}>
                    Hi
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                    {profile}
                </Text>
            </View>
            <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                height: 40,
                paddingLeft: 3,
                paddingRight: SIZES.radius,
                borderRadius: 20
            }}
                onPress={() => console.log('point')}
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
                    }}>{point} point </Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}
