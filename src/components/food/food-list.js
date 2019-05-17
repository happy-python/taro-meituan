import { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './food-list.less'
import Addcut from '../addcut/addcut'

export default class FoodList extends Component {
  constructor () {
    super(...arguments)
  }

  static defaultProps = {
    category: '',
    foods: []
  }

  render () {
    const {category, foods} = this.props;

    return (
      <View className='foods'>
        <Text className='foods-category'>{category}</Text>
        {
          foods.map(food => {
            return (
              <View className='food-list' key={food.id}>
                <Image className='food-list-img' src={food.img==1?require('../../assets/images/1.jpg'):require('../../assets/images/2.jpg')} />
                <View className='food-list-text'>
                  <Text className='name'>{food.name}</Text>
                  <Text className='info'>月售100 赞10</Text>
                  <Text className='price'>¥{food.price}</Text>
                  <Addcut food={food} />
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
