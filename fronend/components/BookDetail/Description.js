import React from 'react'
import { View, Text, ScrollView, Animated } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

export default function Description({ book }) {
    const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight
    const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const indicator = new Animated.Value(0);

    return (<View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
        {/* Custom Scrollbar */}
        <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
            <Animated.View
                style={{
                    width: 4,
                    height: indicatorSize,
                    backgroundColor: COLORS.lightGray4,
                    transform: [{
                        translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                            inputRange: [0, difference],
                            outputRange: [0, difference],
                            extrapolate: 'clamp'
                        })
                    }]
                }}
            />
        </View>

        {/* Description */}
        <ScrollView
            contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onContentSizeChange={(width, height) => {
                setScrollViewWholeHeight(height)
            }}
            onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                setScrollViewVisibleHeight(height)
            }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: indicator } } }],
                { useNativeDriver: false }
            )}
        >
            <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Description</Text>
            <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{book.description}</Text>
        </ScrollView>
    </View>)
}
