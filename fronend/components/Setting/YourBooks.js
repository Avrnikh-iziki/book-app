import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

export default function YourBooks({ books , userid }) {

    const renderItem = (book, index) => (
        <View
            key={index}
            style={{
                marginVertical: SIZES.base
            }}>
            <View
                style={{
                    flex: 1,
                    height: 150,
                    borderRadius: 10,
                    flexDirection: "row",
                }} >
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
            </View>
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
                         userid == book.userid && renderItem(book, index)
                    ))
                }
            </ScrollView>
        </View>
    )
}
