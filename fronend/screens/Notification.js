import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Note from '../components/Notification/Note'
import Header from '../components/Home/Headre'
import { COLORS, SIZES } from '../constants'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from '../components/Registration/Login'
import Signin from '../components/Registration/Signin'

export default function Notification({ navigation }) {
    const [point, setpoint] = useState(null)
    const [Name, setName] = useState(null)
    const [userid, setuserid] = useState(null)
    const [noti, setnot] = useState(null)
    const [login, setlogin] = useState(false)
    const [registred, setregistred] = useState(false)


    useEffect(() => {
        AsyncStorage.getItem('Name').then(name => setName(name))
        AsyncStorage.getItem("token").then(tok => { if (!tok) setlogin(true) });

        AsyncStorage.getItem('userid').then(userid => {
            if (userid) setuserid(userid)
            Axios.post('https://nativebook.herokuapp.com/notification', { userid: userid })
                .then(res => {
                    const { message } = res.data
                    if (message?.docs?.not) {
                        setnot(message.docs.not)
                        setpoint(message.docs.point)
                    }
                })
        })

    }, [noti])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, marginBottom: 1 }}>
            {login
                ? <View style={{ flex: 1 }}>
                    {
                        !registred
                            ? <Login setregistred={setregistred} navigation={navigation} />
                            : <Signin setregistred={setregistred} />
                    }
                </View>
                : <>
                    <View style={{ height: 100 }}>
                        <Header profile={Name} point={point} />
                    </View>
                    <View style={{ margin: SIZES.radius, flex: 1 }}>
                        <Note noti={noti} setnot={setnot} userid={userid} />
                    </View>
                </>
            }
        </SafeAreaView>
    )
}
