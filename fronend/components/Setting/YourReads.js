import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import Axios from 'axios'

export default function YourReads({ userid, books, bookmark, token, navigation }) {

    const readbook = (id) => {
        const data = {
            id,
            userid
        }
        Axios.post('https://nativebook.herokuapp.com/mybooks/del',data, { headers: { 'Authorization': token } })
            .then(res =>{
              const { message } = res.data
              if(message?.success){
                navigation.navigate("Home")
              }
            })
    }
    const renderItem = (book, index) => (
        <View
            key={index}
            style={{
                marginVertical: SIZES.base
            }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 150,
                    borderRadius: 10,
                    flexDirection: "row",
                }}
                onPress={() => {
                    readbook(book._id)
                }}>

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
                                marginTop: SIZES.radius,
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
                        </View>
                    </View>
                </View>
                <View>

                </View>
            </TouchableOpacity>
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
                        bookmark?.includes(book._id) && renderItem(book, index)
                    ))
                }
            </ScrollView>
        </View>
    )
}
77