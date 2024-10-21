import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser, signIn } from '../lib/appwrite'



const SignIn = () => {

    const [form, setForm] = useState({email: '', password: ''}); //useState hook to manage form state(submissions, default is empty)
    const [isSubmitting, setIsSubmitting] = useState(false);
    

  
    const submit = async () => {

      if (form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
  
      setIsSubmitting(true); // isSubmitting is set to true if the any of the form feilds are not empty
  
  
      try{
  
        await signIn(form.email, form.password) // awaiting session for user
        // set it to global state... remembers when a user is logged in and keeps them logged in instead of signing up again
        
  
        router.replace('/home') //redirected to home page after sign up
  
      } catch(error){
        Alert.alert('Error', error.message)
      } finally {
        setIsSubmitting(false);
      }
  
    }


  return (
    <SafeAreaView className="h-full bg-primary" >
      <ScrollView >
        <View className="justify-center w-full px-4 my-4 min-h-[85vh]" >
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px] " />
          <Text className="text-white text-2xl mt-10 font-psemibold" >Log into Aora</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText = {(e) => setForm({...form, email: e})}
            otherStyles = "mt-7"
            keyboard-type = "email-address" />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText = {(e) => setForm({...form, password: e})}
            otherStyles = "mt-7"
             />

          <CustomButton title="Sign-In" handlePress={submit} containerStyles={`mt-7`} isLoading={isSubmitting}/>

          <View className="justify-center flex-row mt-7" >
            <Text className="font-pregular text-gray-200 text-lg" >Don't have an Account ? <Link href={'/sign-up'} className="text-secondary-200 font-psemibold" >Sign-Up</Link> </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn