import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderMonth from './NotesScreen.renderItem.Month'

const RenderYear = ({ item: year }, { renderData }) => {
  return (
    <View>
      <Text>{year}</Text>
      <FlatList
        data={Object.keys(renderData[year]).reverse()}
        renderItem={(item) => RenderMonth(item, { year, renderData })}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  )
}

export default RenderYear
