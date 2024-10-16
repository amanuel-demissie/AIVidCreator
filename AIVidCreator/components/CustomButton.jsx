import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary font-pbold justify-center items-center rounded-xl min-h-[62px] mx-3 ${containerStyles} ${isLoading? 'opacity-50': ''}` } >
            <Text className={`font-psemibold text-primary text-lg ${textStyles}` } >{title}</Text>
    </TouchableOpacity>
    
  )
}

export default CustomButton