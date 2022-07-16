import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput, Title } from 'react-native-paper'
import { format } from 'date-fns'
import { Icon } from 'react-native-elements'
import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../features/notes/notesSlice'

const NoteEditorScreen = ({ navigation, route }) => {
  const { params: note } = route
  const [text, setText] = useState(note.content)
  const dispatch = useDispatch()

  const handleUpdateNote = () => console.log('Update note')
  const handleDelete = () => {
    console.log('Delete note:', note)
    Alert.alert(
      'Are you sure you want to delete this note?',
      '',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteNote(parseInt(note.id)))
            navigation.goBack()
          },
        },
      ],
      { cancelable: false }
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
          <Icon
            name="check"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={handleUpdateNote}
          />
          <Icon
            name="trash"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={handleDelete}
          />
        </View>
      ),
    })
  }, [])

  const dateTimeOptions = {
    year: 'y',
    month: 'M',
    date: 'd',
    day: 'EEE',
    time: 'h:mm:ss a',
  }
  const timestamp = new Date(note.createdAt)
  const day = format(timestamp, dateTimeOptions.day)
  const month = format(timestamp, dateTimeOptions.month)
  const date = format(timestamp, dateTimeOptions.date)
  const year = format(timestamp, dateTimeOptions.year)
  const time = format(timestamp, dateTimeOptions.time)
  // TODO: Must add user config for date format (order) and time format (seconds)
  const title = `${day}, ${month}/${date}/${year} ${time}`

  return (
    <View>
      <Title style={styles.title}>{title}</Title>
      <TextInput
        style={styles.editor}
        multiline
        maxLength={1500}
        placeholder="Note..."
        value={text}
        onChangeText={(text) => setText(text)}
        autoFocus
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  editor: {
    flex: 1,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24,
  },
})

export default NoteEditorScreen
