import Axios from 'axios'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

export default function Read({ book, userid, token, navigation, name }) {
    const date = new Date(Date.now()).toString().split(' ')
    const formatedate = `${date[1]}-${date[2]}/${date[3].substring(2)} ${date[4].substring(0, 5)}`
    const startNewBook = () => {
        const data = {
            userid: userid,
            bookid: book._id,
            completion: 0,
            lastRead: formatedate,
            date:Date.now()
        }
        Axios.post('https://nativebook.herokuapp.com/mybooks/newRead', data, { headers: { 'Authorization': token } })
            .then(res => {
                const { message } = res.data
                if (message?.sucs) {
                    Axios.post('https://nativebook.herokuapp.com/view', { bookid: book._id, userid: userid, name: name, point: 10 })
                        .then((res) => {
                            const { message } = res.data
                            if (message?.success) navigation.navigate("Search", { id: book._id })
                        })
                }
            })
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: "row"
        }}>
            <View
                style={{
                    width: 60,
                    backgroundColor: COLORS.secondary,
                    marginLeft: SIZES.padding,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.lightGray2
                    }}
                />
            </View>
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                marginHorizontal: SIZES.base,
                marginVertical: SIZES.base,
                borderRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center"
            }}
                onPress={() => startNewBook()}
            >
                <Text style={{
                    ...FONTS.h3,
                    color: COLORS.white
                }}>
                    Start reading
                </Text>
            </TouchableOpacity>
        </View>
    )
}
