/*
  事件管理器
*/
class Event {
  constructor () {
    this.events = {}
  }

  // 监听
  on (name, callback) {
    if (this.events[name]) {
      this.events[name].push(callback)
    } else {
      this.events[name] = [callback]
    }
  }

  // 触发
  emit (name, params) {
    if (this.events[name]) {
      this.events[name].map(callback=>{
        callback(params)
      })
    }
  }
}

export default event = new Event()
