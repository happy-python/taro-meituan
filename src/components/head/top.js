import { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import leftPng from '../../assets/images/left.png'
import luePng from '../../assets/images/lue.png'
import searchPng from '../../assets/images/search.png'
import collectPng from '../../assets/images/collect.png'
import tuanPng from '../../assets/images/tuan.png'
import './top.less'

export default class Top extends Component {
  
  render () {
    return (
      <View className='top'>
        <View className='left'>
          <Image className='img' src={leftPng} />
        </View>

        <View className='right'>
          <Image className='img' src={searchPng} />
          <Image className='img' src={collectPng} />
          <Image className='img' src={tuanPng} />
          <Image className='img' src={luePng} />
        </View>
      </View>
    )
  }
}
