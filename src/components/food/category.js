import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './category.less'

export default class Category extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      category: [
        {name: "专场", id:1},
        {name: "热销", id:2},
        {name: "折扣", id:3},
        {name: "主食", id:4},
        {name: "热炒", id:5},
        {name: "凉菜", id:6},
        {name: "特色乱炖", id:7}
      ],
      selectId: null
    }
  }

  handleClick (cate) {
    // this.setState 异步
    this.setState({
      selectId: cate.id
    }, () => {
      this.props.onChangeCategory(cate)
    })
  }

  render () {
    const {category, selectId} = this.state;

    return (
      <View className='category'>
        {
          category.map(cate => {
            return <Text onClick={this.handleClick.bind(this, cate)} className={'name ' + (cate.id==selectId?'selected':'')}>{cate.name}</Text>
          })
        }
      </View>
    )
  }
}
