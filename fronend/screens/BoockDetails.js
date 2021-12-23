import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import BookInfocus from '../components/BookDetail/BookInfocus'
import Description from '../components/BookDetail/Description'
import Read from '../components/BookDetail/Read'
import { COLORS } from '../constants'


export default function BoockDetail({ route, navigation }) {
    const [bok, setbook] = useState(null)
    const [Name ,setName] = useState(null)
    const [token, settoken] = useState(null)
    const [userid, setuserid] = useState(null)

    useEffect(() => {
        let { book, name } = route.params
        setbook(book)
        setName(name)
        AsyncStorage.getItem('userid').then(userid => setuserid(userid))
        AsyncStorage.getItem('token').then(token => settoken(token))
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
            {
                bok &&
                <>
                    <BookInfocus navigation={navigation} book={bok} />
                    <View style={{
                        height: 250,
                        marginTop: 5,
                    }}>
                        <Description book={bok} />
                    </View>
                    <View style={{ height: 70, marginBottom: 2 }}>
                        <Read book={bok} userid={userid} token={token} navigation={navigation} name={Name} />
                    </View>
                </>
            }
        </View>
    )
}
