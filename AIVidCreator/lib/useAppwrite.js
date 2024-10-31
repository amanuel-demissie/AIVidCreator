import {React, useState, useEffect} from 'react'
import { Alert } from'react-native'


const useAppwrite = (fn) => { //parameter is a function
      //made into a custom hook because we need to fetch data similarily in each tab(more efficient)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { // fetch data as soon as components load
    const fetchData = async() => {
      setIsLoading(true);

      try {

        const response = await fn(); //function(parameter) called . could be getAllPosts, etc ...
        setData(response); //data is set as an array of posts.documents(videos)

      } catch(error){
        Alert.alert('Error from useAppwrite', error.message);

      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []) //dependency array is empty meaning only fetch it at the start

  const refetch = () => {
    fetchData();
  }

  return {data, isLoading, refetch};
}

export default useAppwrite;