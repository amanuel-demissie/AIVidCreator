import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {React, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import EmptyState from '../../components/EmptyState'
import  {getUserPosts, searchPosts, signOut}  from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext(); //can extact the user(for the userId), etc... from global context

  //made into a custom hook because we need to fetch data similarily in each tab(more efficient)
  //console.log(user.$id)
  const {data: posts} = useAppwrite( () => getUserPosts(user.$id)); //get data and rename to posts, get the function refetch too
  //console.log(posts);

  const logout = async() => {
    await signOut();

    
    setUser(null); //clear user from context
    setIsLoggedIn(false); 

    router.replace('/sign-in');

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts} //array of posts(objects)
        //data = {[]}
        keyExtractor={(item) => item.$id} //item represents each object in the array of data(posts)
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => ( //modify header component for the profile icon
          <View className="w-full justify-center items-center mt-6 mb-12 px-4" >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout} >
              <Image source={icons.logout} className="w-6 h-6" resizeMode='contain' />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center" >
              <Image source={{uri: user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover' />

            </View>

            <InfoBox
                title={user?.username}
                
                titleStyles="text-lg"  
              />

            <View className="mt-5 flex-row" >
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"  
              />

              <InfoBox
                title='1.2k'
                subtitle="Followers"
                titleStyles="text-xl"  
              />

              
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

export default Profile