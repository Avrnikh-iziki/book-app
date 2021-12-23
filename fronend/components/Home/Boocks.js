import React, { useEffect, useState } from 'react'
import { Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
const element = {}
import Axios from "axios"

export default function Boocks({ tok, userid, books, navigation, login, reads }) {
    const date = new Date(Date.now()).toString().split(' ')
    const lastRead = `${date[1]}-${date[2]}/${date[3].substring(2)} ${date[4].substring(0, 5)}`

    const newview = (id) => {
        const data = {
            userid: userid,
            bookid: id,
            completion: Math.floor(Math.random() * 101),
            lastRead: lastRead,
            date: Date.now()
        }
        Axios.post('https://nativebook.herokuapp.com/mybooks/up', data, { headers: { 'Authorization': tok } })
            .then(res => {
                const { message } = res.data
                console.log(res.data)
                if (message?.sucs) navigation.navigate("Search", { id: id })
            })
    }

    const renderItem = (item, index, navigation) => {
        const [booksid, setbooksid] = useState(null)
        useEffect(() => {
            if (reads) {
                setbooksid(reads.myBooks.map(el => el.bookid))
                reads.myBooks.forEach(el => {
                    element[el.bookid] = {
                        completion: el.completion,
                        lastRead: el.lastRead
                    }
                });
            }
        }, [])

        return (
            <View key={index}>
                {booksid?.includes(item._id) && <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius,
                    }}
                    onPress={() => newview(item._id)}
                >
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 10
                        }}
                    />
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            source={icons.clock_icon}
                            style={{
                                width: 17,
                                height: 17,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body4, color: COLORS.lightGray }}>{element[item._id].lastRead}</Text>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{element[item._id].completion}%</Text>
                    </View>
                </TouchableOpacity>}
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {
                (login && reads?.myBooks.length) &&
                <>
                    <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.body2, color: COLORS.white }}>My Reads</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: SIZES.padding }}>
                        <ScrollView horizontal showsVerticalScrollIndicator={false}>
                            {
                                books?.map((book, index) => (
                                    renderItem(book, index, navigation)

                                ))
                            }
                        </ScrollView>
                    </View>
                </>
            }
        </View>
    )
}

