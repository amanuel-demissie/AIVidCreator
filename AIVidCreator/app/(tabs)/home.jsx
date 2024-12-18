import { View, Text, Image, RefreshControl, FlatList, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {React, useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import  {getAllPosts, getLatestPosts}  from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {

  const {user} = useGlobalContext();

  //made into a custom hook because we need to fetch data similarily in each tab(more efficient)
  const {data: posts, refetch} = useAppwrite(getAllPosts); //get data and rename to posts, get the function refetch too
  const {data: latestPosts} = useAppwrite(getLatestPosts); //get data(return posts) and rename to latestPosts

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async() => { // refresh and display loading state for any new videos
    setRefreshing(true)
    // recall videos -> if any new videos are added(when you swipe up)
    refetch(); 

    setRefreshing(false)
  }

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
          <View className="my-6 px-4 space-y-6 " >
            <View className="justify-between items-start flex-row mb-6" >
              <View>
                <Text className="font-pmedium text-sm text-gray-100" >Welcome back</Text>
                <Text className="text-2xl font-psemibold text-white" >{user?.username}</Text>
              </View>

            <View className="mt-1.5" >
              <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain' />
            </View>
          </View>

          <SearchInput/>
          <View className="w-full flex-1 pt-5 pb-8" >
            <Text className="text-gray-100 text-lg font-pregular mb-3" >Latest Videos</Text>
            <Trending posts={latestPosts} />
          </View>

          
          </View>
        )} 
        ListEmptyComponent={() => ( //what to display in the flatlist incase it's empty
          <EmptyState title="No videos found" subtitle="Be the first to upload" />
        )}
        
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} //refetch and show new videos
        
        />

      < StatusBar backgroundColor='#161622' style='light' />


    </SafeAreaView>
  )
}

export default Home