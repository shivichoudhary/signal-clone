import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState } from 'react'
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://www.flaticon.com/free-icon/user_149071?term=user%20avatar&page=1&position=10&page=1&position=10&related_id=149071&origin=tag"
            });
        }).catch(error => alert(error.message))
    };
    return (    
        <KeyboardAvoidingView behavior='padding'  style={styles.container}>
          <StatusBar style="light" />

            <Text h3 style = {{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style = {styles.inputContainer}>
                <Input 
                placeholder="Full Name" 
                autoFocus
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                />
                <Input 
                placeholder="Email" 
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Input 
                placeholder="Password"
                type="password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                />
                <Input 
                placeholder="Profile picture URL (Optional)" 
                type="text"
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
                onSubmiitEditing={register}
                />
            </View>
            <Button raised onPress={register} title="Register"/>
            <View style={{ height: 110}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    },
})
