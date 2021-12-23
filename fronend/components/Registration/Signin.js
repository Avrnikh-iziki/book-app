import React, { useState  } from 'react'
import { Image, View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { COLORS, images } from '../../constants'
import Axios from "axios"

export default function Signin({ setregistred }) {
    
    const [success, setSuccess] = useState(null)
    const [err, setErr] = useState(null)
    const sign = (Name, Email, Password) => {

        const data = {
            Name: Name,
            Email: Email,
            Password: Password
        }
        Axios.post('https://nativebook.herokuapp.com/user/signin', data)
            .then(res => {
                const { message } = res.data
                if (message.faild !== undefined) setErr(message.faild)
                if (message.sucs !== undefined) setregistred(false)
                else {
                    setTimeout(() => {
                        setErr(null)
                        setSuccess(null)
                    }, 2000)
                }
            })
            .catch((err) => setErr(err));
    }

    return (
        <View style={Styles.warper}>
            <View style={Styles.logo}>
                <Image
                    source={images.fa}
                    style={Styles.logimage}
                />
            </View>
            <View style={Styles.input}>
                <Formik
                    initialValues={{ email: "", password: "", name: "" }}
                    onSubmit={
                        (values) => sign(values.name, values.email, values.password)
                    }
                >
                    {({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        isValid
                    }) => (
                        <>
                            <View style={[
                                Styles.inputFaild,
                                {
                                    borderColor: values.name.length < 1 || values.name.length > 3
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Name"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="email-address"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    autoFocus={true}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                            </View>
                            {
                                errors.name &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.name}
                                </Text>
                            }
                            <View style={[
                                Styles.inputFaild,
                                {
                                    borderColor: values.email.length < 1 || Validator.validate(values.email)
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Email"
                                    autoCapitalize="none"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    keyboardType="email-address"
                                    textContentType="email-address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            {
                                errors.email &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.email}
                                </Text>
                            }
                            <View style={[
                                Styles.inputFaild,
                                {
                                    borderColor: (values.password.length < 1 || values.password.length > 8)
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Password"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType="password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>
                            {
                                errors.password &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.password}
                                </Text>
                            }

                            <Pressable
                                titleSize={20}
                                style={buttonstyle(isValid)}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: COLORS.white, fontWeight: "700" }}>Sign In</Text>
                            </Pressable>
                            <View style={Styles.singupContainer}>
                                <Text
                                    style={{ color: COLORS.white }}>
                                    You have an account ?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setregistred(false)}
                                >
                                    <Text style={{ color: "#6BB0F5" }}>  Loin</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
                <>
                    {
                        err &&
                        <View style={Styles.errResponse}>
                            <Text style={{ color: COLORS.lightRed }}>{err}</Text>
                        </View>
                    }
                    {
                        success &&
                        <View style={Styles.errResponse}>
                            <Text style={{ color: COLORS.lightGreen }}>{success}</Text>
                        </View>
                    }
                </>
            </View>

        </View>
    )
}


const Styles = StyleSheet.create({
    warper: {
        backgroundColor: COLORS.black,
        flex: 1
    },
    inputFaild: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginTop: 3,
        borderWidth: 1,

    },
    input: {
        marginTop: 10,
        padding: 15,
        flex: 4
    },

    singupContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 30
    },
    logo: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    logimage: {
        width: 100,
        height: 100
    },
    errResponse: {
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.darkRed,
        height: 30,
        borderRadius: 5,
    },
    sucessResponse: {
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.darkGreen,
        height: 30,
        borderRadius: 5,
    }
})

const buttonstyle = (isvalid = false) => {
    return {
        backgroundColor: isvalid ? '#9ACAF7' : '#8896F6',
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        borderRadius: 4,
        marginTop: 60
    }
}


