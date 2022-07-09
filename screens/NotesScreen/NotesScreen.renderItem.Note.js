import { Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements' 

const Note = ({ item: note }) => {
  console.log(note)
  return (
    <Card 
      onPress={() => {
        console.log('clicked')
      }}
    >
      <Text>{note.time}</Text>
      <Text>{note.text}</Text>
    </Card>
  )
}

export default Note
