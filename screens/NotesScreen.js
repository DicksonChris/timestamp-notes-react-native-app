import { FlatList, Text, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { useSelector } from 'react-redux'
import Loading from '../components/LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import * as Animatable from 'react-native-animatable'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

const NotesScreen = () => {
  const [renderData, setRenderData] = useState([])
  const notes = useSelector((state) => state.notes)

  useEffect(() => {
    const addTimeProperties = () =>
      [...notes.notesArray].reverse().map((note) => {
        const noteTimestamp = { ...note }
        const timestamp = new Date(noteTimestamp.date)
        noteTimestamp.year = format(timestamp, 'yyyy')
        noteTimestamp.month = format(timestamp, 'M')
        noteTimestamp.date = format(timestamp, 'd')
        noteTimestamp.day = format(timestamp, 'EEE')
        noteTimestamp.time = format(timestamp, 'h:mm a')
        return noteTimestamp
      })

    const notesArray = addTimeProperties()
    const reduceArr = (arr, keyString) =>
      arr.reduce((acc, curr) => {
        const key = curr[keyString]
        if (!acc[key]) {
          acc[key] = [curr]
        } else {
          acc[key].push(curr)
        }
        return acc
      }, {})
    const yearsArr = reduceArr(notesArray, 'year')

    for (const [key, arr] of Object.entries(yearsArr)) {
      const monthsArr = reduceArr(arr, 'month')
      for (const [key, arr] of Object.entries(monthsArr)) {
        const datesArr = reduceArr(arr, 'date')
        monthsArr[key] = datesArr
      }
      yearsArr[key] = monthsArr
    }

    setRenderData(yearsArr)
  }, [notes])

  if (notes.isLoading) {
    return <Loading />
  }
  if (notes.errMess) {
    return (
      <View>
        <Text>{notes.errMess}</Text>
      </View>
    )
  }

  // Card for each note
  const renderNote = ({ item: note }) => {
    console.log(note)
    return (
      <Card>
        <Text>{note.time}</Text>
        <Text>{note.text}</Text>
      </Card>
    )
  }

  // Container for each day (e.g., The 3rd of the month)
  const renderDate = ({ item: date }, { year, month }) => {
    return (
      <View>
        <Text>
          {renderData[year][month][date][0].day} {date}
        </Text>
        <FlatList
          data={renderData[year][month][date]}
          renderItem={renderNote}
          keyExtractor={(item) => JSON.stringify(item)}
        />
      </View>
    )
  }

  // container for each month
  const renderMonth = ({ item: month }, { year }) => {
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
          renderItem={(item) => renderDate(item, { year, month })}
          keyExtractor={(item) => JSON.stringify(item)}
        />
      </View>
    )
  }

  // Container for each year
  const renderYear = ({ item: year }) => {
    return (
      <View>
        <Text>{year}</Text>
        <FlatList
          data={Object.keys(renderData[year]).reverse()}
          renderItem={(item) => renderMonth(item, { year })}
          keyExtractor={(item) => JSON.stringify(item)}
        />
      </View>
    )
  }

  // Container for entire list
  return (
    <View>
      <FlatList
        data={Object.keys(renderData).reverse()}
        renderItem={renderYear}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  )
}
export default NotesScreen
