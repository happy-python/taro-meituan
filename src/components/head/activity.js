import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './activity.less'

export default class Activity extends Component {
  
  render () {
    return (
      <View className='activity'>
        <Text className='cut'>减</Text>
        <Text>满48减10;满58减12;满88减26</Text>
        <Text className='nums'>3个活动</Text>
      </View>
    )
  }
}
