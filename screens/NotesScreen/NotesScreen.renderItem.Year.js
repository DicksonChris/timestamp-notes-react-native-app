import { FlatList, StyleSheet, Text, View } from 'react-native'
import RenderMonth from './NotesScreen.renderItem.Month'

const RenderYear = ({ item: year }, { renderData, navigation }) => {
  return (
    <View>
      <View>
        <Text>{year}</Text>
      </View>
      <View>
        <FlatList
          data={Object.keys(renderData[year]).reverse()}
<<<<<<< HEAD
          renderItem={(item) => RenderMonth(item, { year, renderData, navigation })}
=======
          renderItem={(item) => RenderMonth(item, { year, renderData })}
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
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 30,
    color: 'white',
  },
})

export default RenderYear
