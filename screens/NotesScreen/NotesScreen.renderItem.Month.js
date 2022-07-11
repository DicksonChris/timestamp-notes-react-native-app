import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderDate from './NotesScreen.renderItem.Date'

<<<<<<< HEAD
const RenderMonth = ({ item: month }, { year, renderData, navigation }) => {
=======
const RenderMonth = ({ item: month }, { year, renderData }) => {
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
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
<<<<<<< HEAD
          renderItem={(item) => RenderDate(item, { year, month, renderData, navigation })}
=======
          renderItem={(item) => RenderDate(item, { year, month, renderData })}
>>>>>>> 731a6f9881c1889b93a13e7bb7701a51627a5a14
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
