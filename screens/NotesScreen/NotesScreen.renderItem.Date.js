import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderNote from './NotesScreen.renderItem.Note'

const RenderDate = ({ item: date }, { year, month, renderData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text>{renderData[year][month][date][0].day}</Text>
        <Text>{date}</Text>
      </View>
      <FlatList
        style={styles.notes}
        data={renderData[year][month][date]}
        renderItem={RenderNote}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  date: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flex: 1,
    marginLeft: 8,
  },
  notes: {
    flex: 10,
    marginHorizontal: 8,
  },
})

export default RenderDate
