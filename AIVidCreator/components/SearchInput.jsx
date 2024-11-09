import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
import { usePathname, router } from 'expo-router';

const SearchInput = () => {

    const pathname = usePathname(); //returns the path name of the input element that contains the search input element
    const [query, setQuery] = useState('');

  return (
    
      <View className=" border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary-100 items-center flex-row space-x-4" >
        <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" value={query} placeholder= "Search for a video topic" placeholderTextColor='#CDCDE0' onChangeText={(e) => setQuery(e)}  />
        <TouchableOpacity 
          onPress={() => {

            if(!query){
              return Alert.alert('Missing query', 'Please input something to search results across databases')
            }

            if(pathname.startsWith('/search')) { //means we're already on the search page
              router.setParams({query});
            } else {
              router.push(`/search/${query}`); //reroutes you to /search/[query]
            }
            


          } } >
            <Image source={icons.search} className="w-5 h-5 " resizeMode='contain' />
        </TouchableOpacity>
        
      </View>
   
  )
}

export default SearchInput

