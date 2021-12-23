import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Picker } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import { COLORS } from '../../constants'
import * as Yup from 'yup'
import Axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const field = ["bookName", "bookCover", "language", "pageNo", "author", "backgroundColor", "navTintColor", "description", "book"]
const genre = ["Adventure", "Romance", "Drama"]
const categoryName = ['The Latest', 'Coming Soon', 'Promo']
export default function NewBook({ navigation }) {
    const [token, setToken] = useState(null)
    const [id, setid] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => setToken(token))
        AsyncStorage.getItem("userid").then(id => setid(id))

    }, [])
    const NewBookSchema = Yup.object().shape({
        bookName: Yup.string().min(10, "book's Name hase to have at least 10 charcters").required(' book name is required'),
        bookCover: Yup.string().url().required("book's Image is required"),
        language: Yup.string().required("book's language is required"),
        pageNo: Yup.number().required("book's pages Number is required"),
        author: Yup.string().min(10, "author name hase to have at least 10 charcters").required('author is required'),
        genre: Yup.string().required("book's genre is required"),
        description: Yup.string().min(100, "book's description has to have at least 100 chacters").required("description is required"),
        backgroundColor: Yup.string().required("book's cover color is required "),
        navTintColor: Yup.string().required("Name's book color is required"),
        categoryName: Yup.string().required("book's category is required"),
        book: Yup.string().min(200, "book body hase to have at least 200 charcters").required("book body is required")
    })
    const AddNewBook = (values) => {
        Axios.post('https://nativebook.herokuapp.com/add', { ...values, id }, { headers: { 'Authorization': token } })
            .then((res) => {
                navigation.push('Home')
            })
    }
    return (
        <View style={Styles.input}>
            <Formik
                initialValues={{
                    bookName: "",
                    bookCover: "",
                    language: "",
                    pageNo: "",
                    author: "",
                    genre: "",
                    description: "",
                    backgroundColor: "",
                    navTintColor: "",
                    categoryName: "",
                    book: ""
                }}
                onSubmit={(values) => AddNewBook(values)}
                validationSchema={NewBookSchema}
                validateOnMount={true}
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
                        {
                            field.map((field, index) => (
                                <View key={index}>
                                    {input(field, index, handleChange, handleBlur, errors, values)}
                                </View>
                            ))
                        }
                        <View style={[
                            Styles.inputFaild,
                            { borderColor: "#ccc" }
                        ]}>
                            <Picker
                                placeholder="genre"
                                onValueChange={handleChange("genre")}
                                selectedValue={values.genre}
                                enabled={true}
                                mode="dropdown"
                                style={{
                                    borderColor: "white",
                                    backgroundColor: "white"
                                }}
                            >
                                {
                                    genre.map((item, index) => (
                                        <Picker.Item
                                            label={item.toString()}
                                            value={item.toString()}
                                            key={index.toString()} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={[
                            Styles.inputFaild,
                            { borderColor: "#ccc" }
                        ]}>
                            <Picker
                                placeholder="categoryName"
                                onValueChange={handleChange("categoryName")}
                                selectedValue={values.categoryName}
                                enabled={true}
                                mode="dropdown"
                                style={{
                                    borderColor: "white",
                                    backgroundColor: "white"
                                }}
                            >
                                {
                                    categoryName.map((item, index) => (
                                        <Picker.Item
                                            label={item.toString()}
                                            value={item.toString()}
                                            key={index.toString()} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={buttonstyle(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: COLORS.white, fontWeight: "700" }}>Add New Book</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </View>
    )
}

const input = (variable, index, handleChange, handleBlur, errors, values) => {
    return <>
        <View style={[
            Styles.inputFaild,
            { borderColor: "#ccc" }
        ]}>
            <TextInput
                placeholderTextColor="#444"
                placeholder={variable}
                placeholderTextColor="rgba(0,0,0,0.4)"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="email-address"
                autoFocus={index == 0 && true}
                multiline={(variable == "description" || variable == "book") && true}
                numberOfLines={10}
                onChangeText={handleChange(variable)}
                onBlur={handleBlur(variable)}
                value={values[variable]}
            />
        </View>
        {
            errors[variable] &&
            <Text style={{ fontSize: 10, color: "red", marginBottom: 4 }}>
                {errors[variable]}
            </Text>
        }
    </>
}


const Styles = StyleSheet.create({
    warper: {
        backgroundColor: COLORS.black,
        flex: 1
    },
    inputFaild: {
        borderRadius: 4,
        padding: 6,
        backgroundColor: "#FAFAFA",
        marginTop: 3,
        borderWidth: 1,

    },
    input: {
        paddingHorizontal: 15,
        flex: 4
    },

    singupContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 30
    }
})

const buttonstyle = (isvalid = false) => {
    return {
        backgroundColor: isvalid ? '#9ACAF7' : '#8896F6',
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        borderRadius: 4,
        marginTop: 20,
    }
}



