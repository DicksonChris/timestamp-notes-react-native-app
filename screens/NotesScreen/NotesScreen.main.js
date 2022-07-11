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
<<<<<<< HEAD
import NewNoteModal from './NotesScreen.NewNoteModal'
=======
import EditorModal from './NotesScreen.EditorModal'
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14

const NotesScreen = ({ navigation }) => {
  const [renderData, setRenderData] = useState([])
  const notes = useSelector((state) => state.notes)

  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const addTimeProperties = () =>
      [...notes.notesArray].reverse().map((note) => {
        const modifiedNote = { ...note }
        const timestamp = new Date(modifiedNote.createdAt)
        modifiedNote.year = format(timestamp, 'yyyy')
        modifiedNote.month = format(timestamp, 'M')
        modifiedNote.date = format(timestamp, 'd')
        modifiedNote.day = format(timestamp, 'EEE')
<<<<<<< HEAD
        modifiedNote.time = format(timestamp, 'h:mm:ss a') // TODO: Add options for time format and always show seconds vs only show seconds when two notes are created within the same minute
=======
        modifiedNote.time = format(timestamp, 'h:mm a')
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
        return modifiedNote
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
    // TODO save this to redux and pull it from redux inside child components
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

  // Container for entire list
  return (
    <View>
<<<<<<< HEAD
      <NewNoteModal isVisible={[isModalVisible, setIsModalVisible]} />
=======
      <EditorModal isVisible={[isModalVisible, setIsModalVisible]} />
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
      <FlatList
        data={Object.keys(renderData).reverse()}
        // TODO: Get renderDate from redux
        renderItem={(item) => RenderYear(item, { renderData, navigation })}
        keyExtractor={(item) => JSON.stringify(item)}
      />
      <FAB
        style={styles.FAB}
        icon={{ name: 'add', color: 'white' }}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  FAB: { position: 'absolute', bottom: 0, right: 0, margin: 16 },
})

export default NotesScreen
