import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

const Divider = () => (
    <View style={{ width: 1, paddingVertical: 18 }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}>

        </View>
    </View>
)

export default function Button() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            padding: SIZES.padding,
        }}>
            <View style={{
                flexDirection: "row",
                height: 50,
                backgroundColor: COLORS.secondary,
                borderRadius: SIZES.radius
            }}>
                <TouchableOpacity style={{
                    flex: 1
                }}

                >
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            source={icons.claim_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,

                            }}
                        />
                        <Text
                            style={{
                                marginLeft: SIZES.base,
                                ...FONTS.body3,
                                color: COLORS.white
                            }}>
                            Claim
                        </Text>
                    </View>
                </TouchableOpacity>

                <Divider />

                <TouchableOpacity
                    style={{ flex: 1 }}

                >
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            source={icons.point_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,

                            }}
                        />
                        <Text
                            style={{
                                marginLeft: SIZES.base,
                                ...FONTS.body3,
                                color: COLORS.white
                            }}>
                            Point
                        </Text>
                    </View>

                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                    style={{ flex: 1 }}

                >
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            source={icons.card_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,

                            }}
                        />
                        <Text
                            style={{
                                marginLeft: SIZES.base,
                                ...FONTS.body3,
                                color: COLORS.white
                            }}>
                            Card
                        </Text>
                    </View>

                </TouchableOpacity>

            </View>
        </View>
    )
}
