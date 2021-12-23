import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'


const Divider = () => (
    <View style={{ width: 1, paddingVertical: 8 }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}>

        </View>
    </View>
)

export default function BookInfocus({ book, navigation }) {
    return (
        <View style={{
            flex: 4
        }}>
            <ImageBackground
                source={book.bookCover}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
            />

            {/* Color Overlay */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: book.backgroundColor,
                    opacity:.8
                }}
            >
            </View>

            {/* Navigation header */}
            <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80, alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={{ marginLeft: SIZES.base }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back_arrow_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: book.navTintColor
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: book.navTintColor }}>Book Detail</Text>
                </View>

                <TouchableOpacity
                    style={{ marginRigth: SIZES.base }}
                    onPress={() => console.log("Click More")}
                >
                    <Image
                        source={icons.more_icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: book.navTintColor,
                            alignSelf: 'flex-end'
                        }}
                    />
                </TouchableOpacity>
            </View>

            {/* Book Cover */}
            <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
                <Image
                    source={book.bookCover}
                    resizeMode="contain"
                    style={{
                        flex: 1,
                        width: 150,
                        height: 100
                    }}
                />
            </View>

            {/* Book Name and Author */}
            <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' , marginTop:30 }}>
                <Text style={{ ...FONTS.h2, color: book.navTintColor }}>{book.bookName}</Text>
                <Text style={{ ...FONTS.body3, color: book.navTintColor }}>{book.author}</Text>
            </View>

            {/* Book Info */}
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    margin: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: "rgba(0,0,0,0.3)"
                }}
            >
                {/* Rating */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.rating}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white }}>Rating</Text>
                </View>

                <Divider />

                {/* Pages */}
                <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Page</Text>
                </View>

                <Divider />

                {/* Language */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white }}>Language</Text>
                </View>
            </View>
        </View>

    )
}
