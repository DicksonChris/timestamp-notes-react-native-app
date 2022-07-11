import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Card, Paragraph } from 'react-native-paper'

<<<<<<< HEAD
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
=======
const Note = ({ item: note }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          console.log('clicked')
        }}
      >
        <Card>
          <Card.Title title={note.time} />
          <Card.Content>
            <Paragraph>{note.content}</Paragraph>
          </Card.Content>
        </Card>
      </Pressable>
    </SafeAreaView>
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
<<<<<<< HEAD
    marginVertical: 4,
    paddingBottom: 8,
=======
    paddingVertical: 4,
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Note
