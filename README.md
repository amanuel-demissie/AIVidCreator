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