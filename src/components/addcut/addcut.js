import Taro, { Component, interceptors } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './addcut.less'
import addPng from '../../assets/images/add.png'
import cutPng from '../../assets/images/cut.png'
import event from '../../utils/events'
import { cacheKey } from '../../utils/common'

export default class Addcut extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      number: 0
    }
    this.key = cacheKey
  }

  static defaultProps = {
    food: {}
  }

  componentWillMount () {
    // 监听事件
    event.on('changeCategory', ()=>{
      this.getNumber()
    })
  }

  getNumber () {
    let number = 0
    const id = `${this.props.food.id}`
    let cacheFoods = Taro.getStorageSync(this.key)
    if (cacheFoods && cacheFoods[id]) {
      number = cacheFoods[id].number
    }
    this.setState({
      number: number
    })
  }

  addNumber () {
    const id = `${this.props.food.id}`
    this.setState({
      number: this.state.number + 1
    }, ()=>{
      const cacheFoods = Taro.getStorageSync(this.key) || {}
      cacheFoods[id] = {number: this.state.number, price: this.props.food.price}
      Taro.setStorageSync(this.key, cacheFoods)

      // 触发事件，重新计算
      event.emit('calculate')
    })
  }

  cutNumber () {
    const id = `${this.props.food.id}`
    if (this.state.number >= 1) {
      this.setState({
        number: this.state.number - 1
      }, ()=>{
        const cacheFoods = Taro.getStorageSync(this.key)
        if (cacheFoods) {
          if (this.state.number == 0) {
            delete cacheFoods[id]
          } else {
            cacheFoods[id].number = this.state.number
          }
          Taro.setStorageSync(this.key, cacheFoods)
          
          // 触发事件，重新计算
          event.emit('calculate')
        }
      })
    }
  }

  render () {
    const {number} = this.state;

    return (
      <View className='addcut'>
        <Image onClick={this.cutNumber.bind(this)} className={'operate-img ' + (number==0?'hide':'')} src={cutPng} />
        <Text className={'number ' + (number==0?'hide':'')}>{number}</Text>
        <Image onClick={this.addNumber.bind(this)} className='operate-img' src={addPng} />
      </View>
    )
  }
}
