import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'

// ============================= store:保存数据的地方 ==================================
const store = createStore(commentsReducer)

ReactDOM.render(
  // ======================== Provider:作为组件树的根节点,让所有子组件都能拿到store(底层原理:context) ===========================
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);
