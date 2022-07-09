import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import { useEffect } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import logo from '../assets/images/logo.png'
import { fetchNotes } from '../features/notes/notesSlice'
import NotesScreen from './NotesScreen/NotesScreen.main'
import AboutScreen from './AboutScreen'

const Drawer = createDrawerNavigator()

const screenOptions = {
  headerTintColor: '#fff',
  headerStyle: { backgroundColor: '#5637DD' },
}

const NotesNavigator = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Notes'
        component={NotesScreen}
        options={({ navigation }) => ({
          title: 'Notes',
          headerLeft: () => (
            <Icon
              name='bars'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const AboutNavigator = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>NuCamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
  </DrawerContentScrollView>
)

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName='Notes'
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: '#CEC8FF' }}
      >
        <Drawer.Screen
          name='Notes'
          component={NotesNavigator}
          options={{
            title: 'Notes',
            drawerIcon: ({ color }) => (
              <Icon name='home' type='font-awesome' size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{
            title: 'About',
            drawerIcon: ({ color }) => (
              <Icon name='info-circle' type='font-awesome' size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24,
  },
})

export default Main
