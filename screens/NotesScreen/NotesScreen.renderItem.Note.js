import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Card, Paragraph } from 'react-native-paper'

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
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 4,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Note
