import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './bottom.less'
import emptyPng from '../../assets/images/emptystore.png'
import foodPng from '../../assets/images/foodstore.png'
import { cacheKey } from '../../utils/common'

export default class Bottom extends Component {
  constructor () {
    super(...arguments)
    this.state= {
      number: 0,
      price: 0
    }
    this.key = cacheKey
  }

  componentWillMount () {
    this.calculate()

    event.on('calculate', ()=>{
      this.calculate()
    })
  }

  calculate () {
    let cacheFoods = Taro.getStorageSync(this.key)
    let number = 0
    let price = 0
    if (cacheFoods) {
      for (const key in cacheFoods) {
        if (cacheFoods.hasOwnProperty(key)) {
          const item = cacheFoods[key]
          number += item.number
          price += item.number * item.price
        }
      }
      this.setState({
        number: number,
        price: price
      })
    }
  }

  render () {
    const {number, price} = this.state;

    return (
      <View className='bottom'>
        <View className='body'>
          {
            number?<Text className='number'>{number}</Text>:''
          }
          {
            number?<Image className='img' src={foodPng} />:<Image className='img' src={emptyPng} />
          }
          {
            number?<View className='price'><Text className='money'>¥{price}</Text><Text className='info'>免配送费 | 支持自取</Text></View>:<Text className='desc'>免配送费 | 支持自取</Text>
          }
          <Text className={'submit ' + (number?'pay': '')}>
            {
              number?'去结算':'¥20起送'
            }
          </Text>
        </View>
      </View>
    )
  }
}
