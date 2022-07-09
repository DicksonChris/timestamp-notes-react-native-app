import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderNote from './NotesScreen.renderItem.Note'

const RenderDate = ({ item: date }, { year, month, renderData }) => {
  return (
    <View>
      <Text>
        {renderData[year][month][date][0].day} {date}
      </Text>
      <FlatList
        data={renderData[year][month][date]}
        renderItem={RenderNote}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  )
}

export default RenderDate
