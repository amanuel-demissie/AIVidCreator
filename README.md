# AIVidCreator

1. npx create-expo-app AIVidCreator --template blank
2. cd AIVidCreator
3. npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

4. Copy/paste App.jsx onto app/_layout.jsx, delete App.jsx
5. In package.json change "main": "expo-router/entry", and add scheme

Setting up NativeWind

6. npm install nativewind (it's a universal style system for react-native)
7. npm install --save-dev tailwindcss@3.3.2 
9. Run npx tailwindcss init to create a tailwind.config.js file
10. Set up fonts by editing tailwind.config file and babel.config.js
11. Edit layout.jsx, pasting fonts, useFonts, etc ...

12. Create the (auth) and (tabs) folders with required files(pages in the app)

Tabs

13. Use Tabs components and Tabs.Screen components
14. Created a TabIcon to use in the Tabs.Screen component for the property tabBarIcon

Index.jsx
15. Style onboard screen using ScrollView, SafeAreaView, etc, ...
16. Create CustomButton under components folder

Auth
17. Created a custom input field called /components/FormField for my sign-in and sign-up page

18. Set up appWrite by creating a project and collection of databases within it for users and videos
19. Create /lib/appWrite.js file and write a createUser function and a signIn function
20. Import createUser to /auth/sign-up from /lib/appwrite.js and edit your submit function
21. Import signIn from /lib/appwrite.js to /auth/sign-in and edit submit function(very similar to the sign-up submit function)

GlobalProvider(to stay logged in once logged in)
22. Create a GlobalProvider for all screens ../context/GlobalProvider.js
23. Wrap all the screens(Stacks in layout.jsx) with the GlobalProvider
23. Edit the sign-up.jsx, sign-in.jsx and index.jsx(with setUser and setIsLogged in sign-up and sign-in and isLoading, isLoggedIn in index.jsx)
 
Home tab
24. Edit the home tab with the main component being a FlatList
25. Create a new component called SearchInput
26. Create a new component called Trending.jsx for the horizontal video list
27. Create EmptyState component(what to display if flatlist data in home is empty)
28. Create a new component called Trending with a horizontal scrollable Flatlist

29. useAppwrite hook created ..lib/useAppwrite to be called in most pages for more efficiency(home, bookmark, etc ...)
30. Create a new component called ../components/VideoCard that should be called in home as a renderItem in the FlatList
31. New function called getLatestPosts, similar to getAllPosts should be called in the Home tab using the useAppwrite hook

32. npm install react-native-animatable expo-av --save (helps animate components in the app and a package that allows videos to play in the app)
33. import * as Animatable from 'react-native-animatable' in Trending.jsx(used in TrendingItem component)
34. import {Video, ResizeMode} from 'expo-av' components to be used in TrendingItem, source of the video playing being from {uri: item.video}
35. Replace <Text> component in VideoCard.jsx with the same <Video> component in Trending.jsx that should display a playing video when play is true

SearchInput
36. Edit SearchInput.jsx component to reroute onPress to /search/[query]
37. Add a function searchPosts in appwrite.js to return posts searched by specific titles(query)
38. Edit search/[query].jsx(very similar to home page)
39. Tip: do not forget to pass searchPosts() as a function, not an object(meaning it already executes and passes in the post results instead of the function itself in useAppwrite(searchPosts(query))
40. Create index in cloud.appwrite video collection in the jsm_aora database for search to work








