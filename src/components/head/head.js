import { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Top from './top'
import Activity from './activity'
import backJpg from '../../assets/images/back.jpg'
import storeJpg from '../../assets/images/store.jpg'
import './head.less'

export default class Head extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      store: {
        title: '川湘居',
				notice: '欢迎光临，很高兴为您服务~',
				tags: ['味道赞', '主食真好', '分量足']
      }
    }
  }

  render () {
    const {store} = this.state;

    return (
      <View className='head'>
        <Top />
        <Image className='back' src={backJpg} />
        
        <View className='store'>
          <Image className='store-img' src={storeJpg} />
          <View className='store-text'>
            <Text className="title">{store.title}</Text>
            <Text className='notice'>{store.notice}</Text>
            <View className='tags'>
              {
                store.tags.map((tag,index) => {
                  return <Text key={index} className='tag'>{tag}</Text>
                })
              }
            </View>
          </View>
        </View>

        <Activity />
      </View>
    )
  }
}
