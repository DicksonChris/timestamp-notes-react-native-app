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
import EditorModal from './NotesScreen.EditorModal'

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

  // Container for entire list
  return (
    <View>
      <EditorModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <FlatList
        data={Object.keys(renderData).reverse()}
        renderItem={(item) => RenderYear(item, { renderData })}
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
