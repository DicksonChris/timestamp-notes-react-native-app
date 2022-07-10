import { Alert, Button, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'

const EditorModal = ({ isModalVisible, setIsModalVisible }) => {
  const [text, setText] = useState('')

  return (
    <Modal
      style={styles.modal}
      animationType='slide'
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!isModalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>
            {new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </Text>
          <TextInput
            style={styles.input}
            mode='flat'
            placeholder='Note...'
            onChangeText={(text) => setText(text)}
            value={text}
            maxLength={500}
          />
          <View style={styles.buttonContainer}>
            <Button title='Close' onPress={() => setIsModalVisible(!isModalVisible)} />
            <Button
              title='OK'
              onPress={() => {
                // submit note
                setIsModalVisible(!isModalVisible)
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: '4%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 4,
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
  input: {
    flex: 1,
    margin: 12,
    minWidth: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 12,
  },
})

export default EditorModal
