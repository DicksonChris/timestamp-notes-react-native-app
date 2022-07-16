import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Dialog } from 'react-native-elements'
import { Button, TextInput, Title } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { postNote } from '../../../features/notes/notesSlice'

const NewNoteModal = ({ isVisible }) => {
  const [isModalVisible, setIsModalVisible] = isVisible
  const [timestamp, setTimestamp] = useState(new Date())
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setTimestamp(new Date())
  }, [isModalVisible])

  const resetModal = () => {
    setIsModalVisible(false)
    setText('')
  }

  const handleCancel = () => {
    if (text !== '') {
      Alert.alert(
        'Are you sure you want to discard this note?',
        '',
        [
          { text: 'Cancel', onPress: () => {} },
          {
            text: 'Discard',
            onPress: () => {
              resetModal()
            },
          },
        ],
        { cancelable: false }
      )
      return true
    } else {
      setIsModalVisible(false)
      return false
    }
  }

  const handleSave = () => {
    const newNote = {
      createdAt: timestamp.toISOString(),
      content: text,
    }
    dispatch(postNote(newNote))
    resetModal()
  }

  return (
    <Dialog
      visible={isModalVisible}
      onRequestClose={handleCancel}
      style={{ flex: 1 }}
      overlayStyle={{
        padding: 8,
        paddingTop: 16,
        marginTop: 64,
        marginBottom: 16,
        marginHorizontal: 16,
      }}
    >
      <Title style={{ fontSize: 24, margin: 16 }}>{format(timestamp, 'h:mm:ss a')}</Title>
      <TextInput
        style={{
          textAlignVertical: 'top',
          backgroundColor: 'white',
        }}
        multiline
        maxLength={1500}
        placeholder="Note..."
        value={text}
        onChangeText={(text) => setText(text)}
        autoFocus
      />
      <Dialog.Actions>
        <Button onPress={handleSave}>Save</Button>
        <Button onPress={handleCancel}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  characterLimit: {
    color: '#999',
    textAlign: 'right',
  },
})

export default NewNoteModal
