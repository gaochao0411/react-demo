import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './tabs.css'

// 组件思想
export default class MyTabs extends Component {
  constructor(props) {
    super(props)
    // 组件内用的
    this.state = {
      msg:'你好'
    }
  }
  // renderHeader = () => {
  //   console.log(React,ReactDOM)
  //   return React.Children.map( this.props.children , (element,index) => {
  //     const activeStyle = element.key === this.state.activeKey ? "activeTitle" : null;
  //     return (
  //         <span
  //             onClick={() => {
  //               this.setState({
  //                 activeKey: element.key
  //               })
  //             }}
  //             className={classnames("title", activeStyle)}
  //         >
  //           {element.props.title}
  //         </span>
  //     )
  //   })
  // }
  myClick(){
    console.log('myClick')
  }
  // 子组件向父组件传值
  // 通过访问父组件的方法
  render() {
    // 关于this指向问题
    console.log(this)
    const { data } = this.props;
    return (
      <div className='my-tabs'>
        <ul className='clearfix'>
          {/* {this.renderHeader()} */}
          {
            data.map((item,index)=>{
              return <li key={index} onClick={this.myClick}>{item}</li>
            })
          }

        </ul>
        <div>父组件传过来的值：{this.props.msg}</div>
      </div>
    )
  }
}