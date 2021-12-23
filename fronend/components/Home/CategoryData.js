import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CategoryData({ userid, selectedCategory, navigation, books, name, reads }) {
    const [token, settoken] = useState(null)
    const [err, seterr] = useState(null)
    const [succes, setsuccess] = useState(null)
    const incremant = (book, navigation) => {
        Axios.post('https://nativebook.herokuapp.com/view', { bookid: book._id, userid: userid, name: name, point: 5 })
            .then((res) => {
                const { message } = res.data
                if (message?.success) navigation.navigate("BookDetail", { book: book, name: name })
            })
    }
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => settoken(token))
    }, [])

    const bookmark = (userid, bookid) => {
        const data = {
            userid,
            bookid
        }
        Axios.post('https://nativebook.herokuapp.com/mybooks/bookmark', data, { headers: { 'Authorization': token } })
            .then(res => {
                if (res.data.message.err) seterr(res.data.message.err)
                if (res.data.message.success) {
                    AsyncStorage.setItem('bookmark', res.data.message.docs)
                    setsuccess(res.data.message.success)
                }
            })
    }

    const renderItem = (book, index, navigation, userid) => (
        <View key={index} >
            { !reads.includes(book._id) &&
                <View

                    style={{
                        marginVertical: SIZES.base
                    }}>
                    {book.categoryName == selectedCategory &&
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 150,
                                borderRadius: 10,
                                flexDirection: "row",
                            }}
                            onPress={() => {
                                incremant(book, navigation)
                            }
                            }
                        >
                            <Image
                                source={book.bookCover}
                                resizeMode="cover"
                                style={{
                                    width: 80,
                                    height: 130,
                                    borderRadius: 10
                                }}
                            />

                            <View>
                                <View style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius,

                                }}>
                                    <View>
                                        <Text style={{
                                            paddingRight: SIZES.padding,
                                            ...FONTS.h2,
                                            color: COLORS.white,

                                        }}>
                                            {book.bookName}
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h3,
                                                color: COLORS.lightGray,

                                            }}
                                        >
                                            {book.author}
                                        </Text>

                                        <View style={{
                                            flexDirection: "row",
                                            marginTop: SIZES.radius
                                        }}>
                                            <Image
                                                source={icons.page_filled_icon}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: COLORS.lightGray
                                                }}
                                            />
                                            <Text style={{
                                                ...FONTS.body4,
                                                color: COLORS.lightGray,
                                                paddingHorizontal: SIZES.radius
                                            }}>
                                                {book.pageNo}
                                            </Text>

                                            <Image
                                                source={icons.read_icon}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: COLORS.lightGray
                                                }}
                                            />
                                            <Text style={{
                                                ...FONTS.body4,
                                                color: COLORS.lightGray,
                                                paddingHorizontal: SIZES.radius
                                            }}>
                                                {book.readed}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            marginTop: SIZES.base,

                                        }}>
                                            {
                                                book.genre.includes("Adventure") &&
                                                <View style={{
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    backgroundColor: COLORS.darkGreen,
                                                    height: 30,
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 2,
                                                    borderRadius: 5,
                                                    marginRight: 2
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.lightGreen,
                                                        ...FONTS.body3
                                                    }}> Adventure</Text>
                                                </View>
                                            }
                                            {
                                                book.genre.includes("Romance") &&
                                                <View style={{
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    backgroundColor: COLORS.darkRed,
                                                    height: 30,
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 2,
                                                    borderRadius: 5,
                                                    marginRight: 2
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.lightRed,
                                                        ...FONTS.body3
                                                    }}>Romance</Text>
                                                </View>
                                            }
                                            {
                                                book.genre.includes("Drama") &&
                                                <View style={{
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    backgroundColor: COLORS.darkBlue,
                                                    height: 30,
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 2,
                                                    borderRadius: 5,
                                                    marginRight: 2
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.lightBlue,
                                                        ...FONTS.body3
                                                    }}>Drama</Text>
                                                </View>
                                            }
                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View>

                            </View>
                            <TouchableOpacity
                                onPress={() => bookmark(userid, book._id)}
                                style={{
                                    flex: 1,
                                    alignItems: "flex-end",
                                    paddingRight: 3
                                }}>
                                {userid != book.userid &&
                                    <Image
                                        source={icons.bookmark_icon}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: COLORS.lightGray,
                                            marginTop: 5
                                        }} />
                                }
                            </TouchableOpacity>
                        </TouchableOpacity>
                    }
                </View>
            }
        </View>
    )

    return (
        <View style={{
            flex: 1,
            marginTop: SIZES.radius,
            paddingLeft: SIZES.padding,
        }}>
            <ScrollView
            >
                {
                    books?.map((book, index) => (
                        renderItem(book, index, navigation, userid)
                    ))
                }
            </ScrollView>
        </View>
    )
}
