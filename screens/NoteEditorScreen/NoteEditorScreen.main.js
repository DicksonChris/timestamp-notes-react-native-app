import { Text, View } from 'react-native'

const NoteEditorScreen = ({ route }) => {
  const { note } = route.params
  return (
    <View>
      <Text>Editor</Text>
    </View>
  )
}

export default NoteEditorScreen
