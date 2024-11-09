//file saved in square brackets, meaning we can extract the value of that search from the screen
import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const {query} = useLocalSearchParams(); //destructuring directly pulls out the query parameter
  //instead of {query: "Search"} object, just {"Search"} is extracted from the query parameter
  
  return (
    <SafeAreaView className="bg-primary h-full" >
      <Text className="text-3xl text-white" >{query}</Text>
    </SafeAreaView>
  )
}

export default Search