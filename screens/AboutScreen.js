import { ScrollView, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Card } from 'react-native-elements'

const Mission = () => {
  return (
    <ScrollView>
      <Card>
        <Card.Title>Our Mission</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>
          We present a curated database of the best campsites in the vast woods and backcountry of
          the World Wide Web Wilderness. We increase access to adventure for the public while
          promoting safe and respectful use of resources. The expert wilderness trekkers on our
          staff personally verify each campsite to make sure that they are up to our standards. We
          also present a platform for campers to share reviews on campsites they have visited with
          each other.
        </Text>
      </Card>
    </ScrollView>
  )
}

const AboutScreen = () => {
  return (
    <ScrollView>
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Mission />
      </Animatable.View>
    </ScrollView>
  )
}

export default AboutScreen
