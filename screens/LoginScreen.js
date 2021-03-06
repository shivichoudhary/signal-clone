import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { auth } from '../firebase';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(( authuser) => {
                console.log(authUser);
            if(authuser) {
                navigation.replce('Home');
            }
        });

        return unsubscribe();
    }, []);

    const signIn = () => {

    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                url:"https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={{ width: 200, height: 200 }}
            />
            <View style = {styles.inputContainer}>
                <Input 
                placeholder="Email" 
                autoFocus 
                type="email" 
                value={ email } 
                onChangeText={(text) => setEmail(text)} />

                <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password" 
                value={ password }
                onChangeText={(text) => setPassword(text)}/>
            </View>
            <Button containerStyle= { styles.button } onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate("Register")} containerStyle= { styles.button } type="outline" title="Register" />
                   
                    <View style={{ height: 110}}/>
        </KeyboardAvoidingView>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
