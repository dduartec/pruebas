import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

class Posts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      posts: [],
    };
  };



  componentDidMount() {
    axios.get('https://knowledge-community-back-end.herokuapp.com/posts')
      .then(res => {
        console.log(res.data.length);
        this.setState({
          posts: res.data
        });
      })
  }
  getPosts() {
    for (let i = 0; i < this.state.posts.length; i++) {
      <Post id={this.state.posts[i].id} />
    }
  }
  render() {
    const listItems = this.state.posts.map((d) => <Post id={d.id}>{d.title}</Post>);
    return (
      <div>
      {listItems}
      </div>
    )
  }

}
/*const { object, bool } = PropTypes;

Posts.propTypes = {
  user: object.isRequired,
  authenticated: bool.isRequired
};

const mapState = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Posts);*/
export default Posts;