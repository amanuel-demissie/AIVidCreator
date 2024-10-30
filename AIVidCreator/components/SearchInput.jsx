import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const[showPassword, setShowPassowrd] = useState(false);

  return (
    
      <View className=" border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary-100 items-center flex-row space-x-4" >
        <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" value={value} placeholder= "Search for a video topic" placeholderTextColor='#7b7b8b' onChangeText={handleChangeText} secureTextEntry={title == 'Password' && !showPassword} />
        <TouchableOpacity>
            <Image source={icons.search} className="w-5 h-5 " resizeMode='contain' />
        </TouchableOpacity>
        
      </View>
   
  )
}

export default SearchInput

