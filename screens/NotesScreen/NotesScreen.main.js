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
import RenderYear from './NotesScreen.renderItem.renderYear'
import NewNoteModal from './Modal/NotesScreen.NewNoteModal'
import { fetchNotes, selectNotes, selectComputedNotes } from '../../features/notes/notesSlice'

const NotesScreen = ({ navigation }) => {
  const [renderData, setRenderData] = useState([])

  const notes = useSelector(selectNotes)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const computedNotes = useSelector(selectComputedNotes)

  useEffect(() => {
    setRenderData(computedNotes)
  }, [])

  useEffect(() => {
    setRenderData(computedNotes)
  }, [isModalVisible])

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
  // Todo: Trigger rerender on new note
  return (
    <View>
      <NewNoteModal isVisible={[isModalVisible, setIsModalVisible]} />
      <FlatList
        data={Object.keys(renderData).reverse()}
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
