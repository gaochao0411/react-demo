import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

// 引入mock数据
var Mock = require('mockjs');
require('./mock/db.js')

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'))