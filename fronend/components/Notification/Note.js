import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTS, icons } from '../../constants'
import Axios from 'axios'

export default function Note({ noti, userid, setnot }) {

    const [Nline, setNline] = useState(1)
    const [selected, setselected] = useState(0)
    const [success, setsuccess] = useState(null)

    const deletNot = (id) => {
        Axios.post('https://nativebook.herokuapp.com/notification/del', { notid: id, userid: userid })
            .then(res => {
                const { message } = res.data
                if (message?.success) setnot(noti.filter(el => el._id !== id))
            })
    }

    const readNote = (id, point) => {
        Axios.post('https://nativebook.herokuapp.com/notification/read', { notid: id, userid: userid, point: point })
            .then(res => {
                const { message } = res.data
                if (message?.success) setsuccess(` ${point} new points added to you count`)
                setTimeout(() => {
                    setsuccess(null)
                }, 1000)
            })
    }

    const Notification = (not, index) => (
        <View
            key={index}
            style={{
                flexDirection: "row",
                marginVertical: 2,
                justifyContent: 'space-between',
            }}>
            <View style={{
                backgroundColor: not.cheked ? COLORS.darkGreen : COLORS.darkRed,
                paddingVertical: 5,
                flex: .89,
                borderRadius: 3
            }}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        setselected(index)
                        if (Nline == 1) setNline(2)
                        if (Nline == 2) setNline(1)
                        if (!not.cheked) readNote(not._id, not.point)

                    }}
                >
                    <Text
                        numberOfLines={selected == index ? Nline : 1}
                        style={{ color: not.cheked ? COLORS.lightGreen : COLORS.lightRed }}>
                        <Text
                            style={{ fontWeight: "bold", color: COLORS.primary, marginLeft: 3 }}>{not.name} </Text>
                        {not.messagae}
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flex: .1,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <TouchableOpacity
                    style={{ marginLeft: 2 }}
                    onPress={() => deletNot(not._id)}
                >
                    <Image
                        source={icons.point_icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={{
            flex: 1,
            paddingHorizontal: 3,
        }}>
            <View
                style={{
                    backgroundColor: COLORS.secondary,
                    paddingVertical: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6
                }}
            >
                <Text style={{
                    color: COLORS.white,
                    ...FONTS.body3,
                }}>  Your Notification  </Text>
            </View>
            <ScrollView style={{ marginTop: 20 }}>
                {
                    noti?.map((no, index) => (
                        Notification(no, index, false)
                    ))
                }
            </ScrollView>
            <View>
                {success &&
                    <View
                        style={{
                            backgroundColor: COLORS.darkBlue,
                            paddingVertical: 5,
                            borderRadius: 3,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            bottom: 5
                        }}
                    >
                        <Text style={{ color: COLORS.lightBlue }}>{success}</Text>
                    </View>
                }
            </View>

        </View>

    )
}
