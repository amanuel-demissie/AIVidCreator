import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const[isSubmitting, setIsSubmitting] = useState(false);


  const[form, setForm] = useState({
    username:'',
    email: '',
    password: ''
  })

  const submit = async () => {

    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true); // isSubmitting is set to true if the any of the form feilds are not empty


    try{

      const result = await createUser(form.email, form.password, form.username)
      // set it to global state...
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home') //redirected to home page after sign up

    } catch(error){
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false);
    }

  }

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center px-4 min-h-[65vh]">
          <Image source={images.logo} className="w-[115px] h-[35px]" />
          <Text className="text-white text-2xl font-psemibold text-semibold mt-10">Sign up to Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText = {(e) => setForm({...form, username: e})}
            otherStyles="mt-7"
            />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText = {(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText = {(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
            
            />
        </View>
        <CustomButton title="Sign-Up" handlePress={submit} isLoading={isSubmitting}/>
        <View className="justify-center items-center pt-5 flex-row gap-2">

          <Text className="text-lg text-gray-100 font-pregular">Already have an account ?</Text>
          <Link href={'/sign-in'} className='font-psemibold text-lg text-secondary-100' >Sign-In</Link>

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp