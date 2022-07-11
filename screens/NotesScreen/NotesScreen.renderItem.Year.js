import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderMonth from './NotesScreen.renderItem.Month'

const RenderYear = ({ item: year }, { renderData }) => {
  return (
    <View>
      <View>
        <Text>{year}</Text>
      </View>
      <View>
        <FlatList
          data={Object.keys(renderData[year]).reverse()}
          renderItem={(item) => RenderMonth(item, { year, renderData })}
          keyExtractor={(item) => JSON.stringify(item)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 30,
    color: 'white',
  },
})

export default RenderYear
