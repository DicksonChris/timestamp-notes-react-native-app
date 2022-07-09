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
      <Text>{MONTHS[parseInt(month)]}</Text>
      <FlatList
        data={Object.keys(renderData[year][month])}
        renderItem={(item) => RenderDate(item, { year, month, renderData })}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  )
}

export default RenderMonth
