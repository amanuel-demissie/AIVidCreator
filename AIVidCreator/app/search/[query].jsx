import { View, Text, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {React, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import  {searchPosts}  from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query} = useLocalSearchParams();

  //made into a custom hook because we need to fetch data similarily in each tab(more efficient)
  const {data: posts, refetch} = useAppwrite( () => searchPosts(query)); //get data and rename to posts, get the function refetch too
  

  useEffect(() => {
    refetch();
  }, [query]) //call back function that's executed everytime the query changes(as user is typing)

  

  //console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts} //array of posts(objects)
        //data = {[]}
        keyExtractor={(item) => item.$id} //item represents each object in the array of data(posts)
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 " >
            
              
                <Text className="font-pmedium text-sm text-gray-100" >Search results</Text>
                <Text className="text-2xl font-psemibold text-white" >{query}</Text>
                

                <View className="mt-6 mb-8" >
                  <SearchInput initialQuery = {query} />
                </View>
              
          
          </View>
        )} 
        ListEmptyComponent={() => ( //what to display in the flatlist incase it's empty
          <EmptyState title="No videos found" subtitle="No videos found for this search" />
        )}
        
        
        
        />

      < StatusBar backgroundColor='#161622' style='light' />


    </SafeAreaView>
  )
}

export default Search