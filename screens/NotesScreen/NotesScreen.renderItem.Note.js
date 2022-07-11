import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Card, Paragraph } from 'react-native-paper'

const Note = ({ item: note }, { navigation }) => {
  return (
    <Card style={styles.container}>
      <Pressable
        android_ripple={{
          color: 'rgb(210, 230, 255)',
          borderless: true,
          foreground: true,
        }}
        onPress={() => navigation.navigate('NoteEditor', note)}
      >
        <Card.Title title={note.time} />
        <Card.Content>
          <Paragraph>{note.content}</Paragraph>
        </Card.Content>
      </Pressable>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 4,
    paddingBottom: 8,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Note
