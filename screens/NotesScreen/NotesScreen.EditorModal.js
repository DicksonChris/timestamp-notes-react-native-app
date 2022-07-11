import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Dialog, Portal, Title, Text, TextInput } from 'react-native-paper'

const EditorModal = ({ isVisible }) => {
  const [isModalVisible, setIsModalVisible] = isVisible
  const [text, setText] = useState('')
  const timestamp = new Date()

  const handleCancel = () => {
    console.log('Back handler')
    if (text !== '') {
      Alert.alert(
        'Are you sure you want to discard this note?',
        '',
        [
          { text: 'Cancel', onPress: () => {} },
          {
            text: 'Discard',
            onPress: () => {
              setText('')
              setIsModalVisible(false)
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

  return (
    <Portal>
      <Dialog
        visible={isModalVisible}
        dismissable={false}
        contentContainerStyle={{ backgroundColor: 'white' }}
      >
        <Dialog.Title>{format(timestamp, 'h:mm:ss a')}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            maxLength={1500}
            placeholder="Note..."
            value={text}
            onChangeText={(text) => setText(text)}
            autoFocus
          />
          <Text style={styles.characterLimit}>{text.length}/1500</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button
            onPress={() => {
              // TODO: add note to database, save date
              setIsModalVisible(!isModalVisible)
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  textInput: {
    lineHeight: 53,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  characterLimit: {
    color: '#999',
    textAlign: 'right',
  },
})

export default EditorModal
