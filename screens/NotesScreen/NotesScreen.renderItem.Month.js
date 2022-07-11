import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderDate from './NotesScreen.renderItem.Date'

const RenderMonth = ({ item: month }, { year, renderData, navigation }) => {
  const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>{MONTHS[month]}</Text>
      </View>
      <View>
        <FlatList
          data={Object.keys(renderData[year][month])}
          renderItem={(item) => RenderDate(item, { year, month, renderData, navigation })}
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
