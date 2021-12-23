import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, SIZES, FONTS } from '../../constants'

export default function Categories({ setSelectedCategory, selectedCategory }) {
    const categoryName = ['The Latest', 'Promo', 'Stories' , 'Science']
    const renderItem = (item) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, marginRight: SIZES.padding }}
                onPress={() => setSelectedCategory(item)}
            >
                {
                    selectedCategory == item &&
                    <Text style={{ ...FONTS.body2, color: COLORS.white }}>{item}</Text>
                }
                {
                    selectedCategory != item &&
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{item}</Text>
                }
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.radius,
            }}>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        padding: 10,
                    }}
                >
                    {
                        categoryName.map((category, index) => (
                            <View key={index} >
                                {renderItem(category)}
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}
