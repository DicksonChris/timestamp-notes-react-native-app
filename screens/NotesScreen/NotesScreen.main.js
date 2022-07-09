import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Card, FAB } from 'react-native-elements'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent'
import { baseUrl } from '../../shared/baseUrl'
import * as Animatable from 'react-native-animatable'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import RenderYear from './NotesScreen.renderItem.Year'

const NotesScreen = () => {
  const [renderData, setRenderData] = useState([])
  const notes = useSelector((state) => state.notes)

  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const addTimeProperties = () =>
      [...notes.notesArray].reverse().map((note) => {
        const noteTimestamp = { ...note }
        const timestamp = new Date(noteTimestamp.date)
        noteTimestamp.year = format(timestamp, 'yyyy')
        noteTimestamp.month = format(timestamp, 'M')
        noteTimestamp.date = format(timestamp, 'd')
        noteTimestamp.day = format(timestamp, 'EEE')
        noteTimestamp.time = format(timestamp, 'h:mm a')
        return noteTimestamp
      })

    const notesArray = addTimeProperties()
    const reduceArr = (arr, keyString) =>
      arr.reduce((acc, curr) => {
        const key = curr[keyString]
        if (!acc[key]) {
          acc[key] = [curr]
        } else {
          acc[key].push(curr)
        }
        return acc
      }, {})
    const yearsArr = reduceArr(notesArray, 'year')

    for (const [key, arr] of Object.entries(yearsArr)) {
      const monthsArr = reduceArr(arr, 'month')
      for (const [key, arr] of Object.entries(monthsArr)) {
        const datesArr = reduceArr(arr, 'date')
        monthsArr[key] = datesArr
      }
      yearsArr[key] = monthsArr
    }

    setRenderData(yearsArr)
  }, [notes])

  if (notes.isLoading) {
    return <Loading />
  }
  if (notes.errMess) {
    return (
      <View>
        <Text>{notes.errMess}</Text>
      </View>
    )
  }

  const Editor = () => (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!isModalVisible)
      }}
    >
      <SafeAreaView>
        <TextInput style={styles.input} placeholder='Notes...' value={''} />
      </SafeAreaView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Button title='Close' onPress={() => setIsModalVisible(!isModalVisible)} />
        </View>
      </View>
    </Modal>
  )

  // Container for entire list
  return (
    <View>
      <Editor />
      <FlatList
        data={Object.keys(renderData).reverse()}
        renderItem={(item) => RenderYear(item, { renderData })}
        keyExtractor={(item) => JSON.stringify(item)}
      />
      <FAB
        style={{ position: 'absolute', bottom: 0, right: 0, margin: 16 }}
        icon={{ name: 'add', color: 'white' }}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default NotesScreen
