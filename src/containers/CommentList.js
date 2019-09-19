import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    // ============================== 初始化数据:使用mapDispatchToProps中的方法 =================================
    this.props.initComments(comments)
  }

  handleDeleteComment (index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    // ============================== 删除数据:使用mapDispatchToProps中的方法 =================================
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render () {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)} />
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
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

// ============================== connect:将 UI组件 变成 容器组件(底层原理:高阶组件) =================================
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)
