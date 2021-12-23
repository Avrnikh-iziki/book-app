import React, { useState, useEffect } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import Axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Book({ route, navigation }) {
    const [book, setbook] = useState(null)
    let id = route?.params?.id
    useEffect(() => {
        Axios.post('https://nativebook.herokuapp.com', { id: id })
            .then(res => {
                if (res.data?.docs) setbook(res.data.docs.book)
            })
    }, [id])

    return (
        <>
            {(id !== undefined)

                ? <ScrollView style={{ flex: 1, backgroundColor: COLORS.black, padding: 15, paddingTop: 20 }}>
                    <Text
                        style={{ color: COLORS.white, textAlign: "center", ...FONTS.body2 }} >
                        {
                            book
                        }
                    </Text>
                </ScrollView>
                : <View style={{
                    flex: 1,
                    backgroundColor: COLORS.black,
                    padding: 15,
                    paddingTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            style={{
                                color: COLORS.white,
                                padding: SIZES.base,
                                backgroundColor: COLORS.primary,
                                width: '100%',
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.radius
                            }}
                            onPress={() => navigation.push('Home')}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: COLORS.white
                                }}>
                                Go Home
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: COLORS.white,
                                textAlign: "center"
                            }}>
                            You did't select any book
                        </Text>
                    </View>
                </View>
            }
        </>
    )
}
