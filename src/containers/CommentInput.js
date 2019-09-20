import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = (localStorage.getItem('username')).replace(/"/g, '')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onAddComment) {
      // ============================== 添加数据:使用mapDispatchToProps中的方法 =================================
      this.props.onAddComment(comment)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onAddComment={this.handleSubmitComment.bind(this)} />
    )
  }
}

// ============================== mapStateToProps:要修改的数据 =================================
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

// =========================== mapDispatchToProps:修改数据时用的方法(只能通过这些方法修改数据) ==============================
const mapDispatchToProps = (dispatch) => {
  return {
    onAddComment: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

// ============================== connect:将 UI组件 变成 容器组件(底层原理:高阶组件) =================================
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)
