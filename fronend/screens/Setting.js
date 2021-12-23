import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Login from '../components/Registration/Login'
import Signin from '../components/Registration/Signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../constants'
import Header from '../components/Setting/Header'
import Button from '../components/Setting/Button'
import NewBook from '../components/Setting/NewBook'
import YourBooks from '../components/Setting/YourBooks'
import YourReads from '../components/Setting/YourReads'
import Axios from 'axios'


export default function Setting({ navigation }) {
    const [login, setlogin] = useState(false)
    const [token, setToken] = useState(null)
    const [book, setbook] = useState(null)
    const [Name, setName] = useState(null)
    const [userid, setuserid] = useState(null)
    const [registred, setregistred] = useState(false)
    const [bookmark, setbookmark] = useState({})
    const [CurrentComp, setCurrentComp] = useState('Your Books')

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(tok => {
                if (!tok) setlogin(true)
                setToken(tok)
                Axios.get('https://nativebook.herokuapp.com', { headers: { 'Authorization': tok } })
                    .then(res => {
                        setbook(res.data)
                    })
            });

        AsyncStorage.getItem("Name").then(name => setName(name))
        AsyncStorage.getItem("userid").then(id => {
             if(id) setuserid(id)
            Axios.post('https://nativebook.herokuapp.com/mybooks', { userid: id })
            .then(res => {
                if (res.data?.docs) setbookmark(res.data.docs.bookmark)
            })
        })

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                login
                    ? <View style={{ flex: 1 }}>
                        {
                            !registred
                                ? <Login setregistred={setregistred} navigation={navigation} />
                                : <Signin setregistred={setregistred} />
                        }
                    </View>
                    : <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                        <View style={{ height: 200 }}>
                            <Header profile={Name} navigation={navigation} setCurrentComp={setCurrentComp} />
                            <Button setCurrentComp={setCurrentComp} />
                        </View>
                        <ScrollView style={{ flex: 1, marginVertical: 20 }}>
                            {
                                CurrentComp == "New Book"
                                    ? <NewBook navigation={navigation} />
                                    : CurrentComp == "your Reads"
                                        ? <YourReads books={book} bookmark={bookmark} navigation={navigation} token={token} userid={userid} />
                                        : <YourBooks books={book} userid={userid} />

                            }
                        </ScrollView>
                    </View>
            }
        </SafeAreaView>
    )
}

