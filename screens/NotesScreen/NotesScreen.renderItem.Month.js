import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderDate from './NotesScreen.renderItem.Date'

const RenderMonth = ({ item: month }, { year, renderData }) => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <View>
      <View style={styles.container}>
        <Text>{MONTHS[parseInt(month)]}</Text>
      </View>
      <View>
        <FlatList
          data={Object.keys(renderData[year][month])}
          renderItem={(item) => RenderDate(item, { year, month, renderData })}
          keyExtractor={(item) => JSON.stringify(item)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    padding: 20,
    fontSize: 20,
    color: 'white',
    marginVertical: 8,
  },
})

export default RenderMonth
