import React, { Component } from 'react';
import { PAGE_SIZE } from '../../../config'
import { query } from '../../../ajax'
import {
    Form,
    Input,
    Button,
    Select,
    Card,
    Table,
    message
} from 'antd';
import {connect} from 'react-redux'
import {createSaveNumberAction} from '../../../redux/actions/title'
import  MyTabs from './components/tabs';
import store from '../../../redux/store'

class Test extends Component {
//     constructor()中完成了React数据的初始化，它接受两个参数：props和context，当想在函数内部使用这两个参数时，需使用super()传入这两个参数。
//     注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。
    constructor(props) {
        console.log('constructor')
        super(props)
        // 组件内用的
        this.state = {
            isLoading: false,
            total: 0,
            current: 1,
            productList: [],
            msg:'你好',
            tabData:['tab1','tab2','tab3']
        }
      }
    /**
   * 查询
   * @param fields
   */

    query = async fields => {
        const hide = message.loading('正在加载');
        try {
            await query().then((res)=>{
                const {data,total,current } = res.body;
                this.setState({productList:data,total,current:current,isLoading:false})
            });
            hide();
            return true;
        } catch (error) {
            // console.log(error)
            hide();
            message.error('网络错误,请检测网络！');
            return false;
        }
    }
    changeProductStatus = async fields => {
        const hide = message.loading('正在修改');
        try {
            await query().then((res)=>{
                const {data,total,current } = res.body;
                this.setState({productList:data,total,current:current,isLoading:false})
            });
            hide();
            return true;
        } catch (error) {
            // console.log(error)
            hide();
            message.error('网络错误,请检测网络！');
            return false;
        }
    }
    /**
      * 生命周期的顺序
      * constructor-->componentWillMount-->render-->componentDidMount-->shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate
    **/
    componentWillMount(){
        // componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。
		console.log('componentWillMount')
	}
    // 生命周期
    componentDidMount() {
        // 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
        console.log('componentDidMount')
        this.query()
    }
    componentWillReceiveProps (){
        // 在接受父组件改变后的props需要重新渲染组件时用到的比较多
        // 接受一个参数nextProps
        // 通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件
        console.log('componentWillReceiveProps')
    }
    shouldComponentUpdate(){
        // 主要用于性能优化(部分更新)
        // 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
        // 因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
        console.log('shouldComponentUpdate')
        return true
    }
    componentWillUpdate (){
        console.log('componentWillUpdate')
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillUnmount(){
        // 在此处完成组件的卸载和数据的销毁。
        // clear你在组建中所有的setTimeout,setInterval
        // 移除所有组建中的监听 removeEventListener
        // 有时候我们会碰到这个warning:
        console.log('componentWillUnmount')
    }
    tabClick(item){
        console.log('进入父组件',item)
        this.setState({msg:item})
    }
    // 修改全局的状态
    editGlobalData(){
        // store.dispatch(createSaveNumberAction('2'))
        console.log(this.props)
        this.props.saveNumber('2')
    }
    render() {
        console.log('render')
        const columns = [
            {
                title: '产品id',
                dataIndex: 'id',
            },
            {
                title: '基金名称',
                dataIndex: 'fundChName',
            },
            {
                title: '基金代码',
                dataIndex: 'fundCode',
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render:
                    (productObj) => (
                        <div>
                            <Button
                                onClick={() => { this.changeProductStatus(productObj) }}
                                size="small" type='primary'
                            >
                                编辑银行卡
                            </Button>
                            <br />
                        </div>
                    )
            },
        ];
        const dataSource = this.state.productList;
        const tabData = this.state.tabData;
        return (
            <Card
                title={
                    <Form
                        name="searchForm"
                        layout="inline"
                        size='middle'
                    >
                        <Form.Item name="bankCode" label="Bank Code">
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="searchType">
                            <Select>
                                <Select.Option value="1">客户号</Select.Option>
                                <Select.Option value="2">客户姓名</Select.Option>
                                <Select.Option value="3">流水ID</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="keyword">
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <Button>Button</Button>
                        </Form.Item>
                    </Form>
                }>
                <Table
                    loading={this.state.isLoading}
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey="id"
                    pagination={{
                        total: this.state.total, //数据总数
                        pageSize: PAGE_SIZE, //每页展示多少条
                        current: this.state.current, //当前是第几页
                        onChange: (number) => { this.query(number) }
                    }}
                />
                <MyTabs data={tabData} msg='我是父组件的值' tabClick={this.tabClick.bind(this)} ></MyTabs>
                <span>{this.state.msg}</span>
                <Button type="primary" onClick={()=>{this.editGlobalData()}}>修改全局属性</Button>
                <span>{store.getState().number}</span>
                <span>{this.props.number}</span>
            </Card>
        );
    }
}

/** 第一个参数mapStateToProps  
  * 每当store state发生变化时，就被调用。接收整个store state，并且返回一个该组件所需要的数据对象
  * 第二个参数 mapDispatchToProps 
  * 通常是action creators构成的对象
  * 也可以直接通过store.getState()获取
  * 通过dispatch来设置store的值
**/
export default connect(
	(state)=>({
		number:state.number
	}), //传递状态
	{saveNumber:createSaveNumberAction} //传递操作状态的方法
)(Test)