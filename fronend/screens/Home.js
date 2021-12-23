import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, SafeAreaView, ScrollView, } from 'react-native'
import Header from '../components/Home/Headre'
import Button from '../components/Home/Button'
import { COLORS, SIZES } from '../constants'
import Boocks from '../components/Home/Boocks'
import Categories from '../components/Home/Categories'
import CategoryData from '../components/Home/CategoryData'

export default function Home({ navigation }) {
    const [book, setbook] = useState(null)
    const [login, setlogin] = useState(false)
    const [Name, setName] = useState(null)
    const [point, setPoint] = useState(null)
    const [userid, setuserid] = useState(null)
    const [reads, setReads] = useState(null)
    const [bid, setbid] = useState([])
    const [tok , settok] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('The Latest');

    useEffect(() => {
        AsyncStorage.getItem("Name").then(name => setName(name))
        AsyncStorage.getItem("userid")
            .then(id => {
                if (id) setuserid(id)
                Axios.post('https://nativebook.herokuapp.com/mybooks', { userid: id })
                    .then(res => {
                        if (res.data?.docs) {
                            setReads(res.data.docs)
                            setbid(res.data.docs.myBooks.map(el=> el.bookid))
                        }
                    });
                Axios.post('https://nativebook.herokuapp.com/notification', { userid: id })
                    .then(res => {
                        const { message } = res.data
                        if (message?.docs?.not) setPoint(message.docs.point)
                    })
            })

        AsyncStorage.getItem("token")
            .then(tok => {
                if (tok) setlogin(true)
                settok(tok)
                Axios.get('https://nativebook.herokuapp.com', { headers: { 'Authorization': tok } })
                    .then(res => setbook(res.data));
            });
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, paddingBottom: 1 }}>
            <View style={{ height: 200 }}>
                <Header profile={Name} point={point} />
                <Button />
            </View>
            <ScrollView style={{
                marginTop: SIZES.radius,
            }}>
                <View style={{ marginBottom: 5 }}>
                    <Boocks
                        books={book}
                        navigation={navigation}
                        login={login}
                        reads={reads}
                        userid={userid}
                        tok={tok}
                    />
                </View>
                <View>
                    <Categories
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </View>
                <View>
                    <CategoryData
                        selectedCategory={selectedCategory}
                        navigation={navigation}
                        books={book}
                        userid={userid}
                        name={Name}
                        reads={bid}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
