import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const[showPassword, setShowPassowrd] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`} >
      <Text className="text-base text-gray-100 font-pmedium" >{title}</Text>
      <View className=" border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary-100 items-center flex-row" >
        <TextInput className="flex-1 text-white font-psemibold text-base w-full h-full" value={value} placeholder={placeholder} placeholderTextColor='#7b7b8b' onChangeText={handleChangeText} secureTextEntry={title == 'Password' && !showPassword} />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassowrd(!showPassword)} >
                <Image source={showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
