import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import {Video, ResizeMode} from 'expo-av'

const zoomIn = {
    0 : { // initial state 
        scale: 0.8
    },

    1 : { //finl state
        scale: 1,
    }
}

const zoomOut = {
    0 : { // initial state 
        scale: 1
    },

    1 : {
        scale: 0.8,
    }
}

const TrendingItem = ({activeItem, item}) => {
    //console.log('activeItem', activeItem.$id, ' item id:', item.$id);
    const[play, setPlay] = useState(false); //to ensure whether we're playing the video or showing the thumbnail
    return( 
        <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500} >
            {play ? (
                <Video 
                source={{uri: `${item.video}`}} 
                className="w-52 h-72 rounded-[36px] mt-3 bg-white/10 " 
                resizeMode= {ResizeMode.CONTAIN} 
                useNativeControls 
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if(status.didJustFinish) {
                        setPlay(false); //after video finishes playing, set play to false (to show thumbnail)
                    }
                }} />
                
            ) : (
                <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)} >
                    <ImageBackground source={{uri: item.thumbnail}} className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40" resizeMode='cover' />
                    {/* absolute property in className positions image on top */}
                    <Image source={icons.play} className="w-12 h-12 absolute" /> 
                    
                </TouchableOpacity>
            )}
        </Animatable.View>

    )
}

const Trending = ({posts}) => {
    const[activeItem, setActiveItem] = useState(posts[0]); //activeItem initially set to posts[0] (first item)

    const viewableItemsChanged = ({viewableItems}) => {//extract viewAableItems(which are the items(each post)) from viewableItemsChanged
        if(viewableItems.length > 0){
            setActiveItem(viewableItems[0].key); //sets activeItem to be the current viewable item in the row
        }

    }

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => //how you want the data displayed
            <TrendingItem activeItem={activeItem} item={item} />
        }
        onViewableItemsChanged={viewableItemsChanged } //calls viewableItemsChange function when viewability of the row changes(function sets activeItem as the current viewableItem)
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70, //70% of the item must be visible 
        }}
        contentOffset={{x: 170}}

         horizontal />
  )
}

export default Trending