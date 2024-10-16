import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from './../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-black-100" >
        <ScrollView contentContainerStyle={{height: '100%'}} >
            <View className="items-center justify-center" >
                <Image className="w-[136px] h-[84px]" source={images.logo} resizeMode='contain' />
                <Image source={images.cards}  className="w-[300px] h-[300px]" />
            </View>

            <View className="relative mt-5" >
            <Text className="text-3xl text-white font-bold text-center px-4 " >Discover endless possibilities with 
             {' '} <Text className="text-secondary-200" >Aora</Text> </Text>

            <Image source={images.path} className="w-[130px] h-[15px] absolute-bottom-2 -right-40"/>
          </View>

          <Text className="text-gray-100 text-sm mt-5 text-center font-pregular" >Where creativity meets innovation: embark on a limitless journey with Aora</Text>
          <CustomButton title="Continue with email" handlePress={() => router.push('/sign-in')} containerStyles="mt-7" />

        </ScrollView>

        <StatusBar backgroundColor='#161622' style='light' />
        
    </SafeAreaView>
  );
}
