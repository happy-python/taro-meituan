import { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import './food.less'
import Category from './category'
import FoodList from './food-list'
import event from '../../utils/events'

export default class Food extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      tabList: [{title: '点菜'}, {title: '评价'}, {title: '商家'}],
      category: '',
      foodList: [], // 全部数据
      foods: [] // 当前选中的数据
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  changeCategory (cate) {
    // 已经存在，不加载数据
    if (this.state.foodList.some(food=>food.cid==cate.id)) {
      this.setState({
        category: cate.name,
        foods: this.state.foodList.filter(food=>food.cid==cate.id)
      }, ()=>{
        // 触发事件
        event.emit('changeCategory')
      })
    } else {
      // 加载数据
      const data = this.fetchData(cate)

      this.setState({
        category: cate.name,
        foods: data,
        foodList: this.state.foodList.concat(data)
      }, ()=>{
        // 触发事件
        event.emit('changeCategory')
      })
    }
  }

  fetchData (cate) {
    const img = Math.floor(Math.random()*(2) + 1);
    const price = Math.floor(Math.random()*(100) + 1);
    return [{'cid': cate.id, 'id': cate.id, 'name': `菜品${cate.id}`, 'price': price, 'img': img}]
  }
  
  render () {
    const {current, tabList, category, foods} = this.state;

    return (
      <View>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={current} index={0}>
            <View className='food'>
              <Category onChangeCategory={this.changeCategory.bind(this)} />
              <FoodList category={category} foods={foods}/>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>评价</AtTabsPane>
          <AtTabsPane current={current} index={2}>商家</AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
