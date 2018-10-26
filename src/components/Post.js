import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            body: "",
            title: "",
            user: [],
            picture: ""
        };


    }

    componentDidMount() {
        axios.get('https://knowledge-community-back-end.herokuapp.com/posts/' + this.props.id)
            .then(res => {
                this.setState({
                    body: res.data.body,
                    title: res.data.title,
                    user: res.data.user,
                });
                axios.get('https://knowledge-community-back-end.herokuapp.com/app_files?ProfilePhoto=1&user_id=' + this.state.user.id)
                    .then(response => {
                        this.setState({ picture: response.data })
                    })
            })
    }
    render() {
        let { picture } = this.state;
        let $picture = null;
        if (!picture.error) {
            $picture = (<img src={picture.ruta} />);
        } else {
            $picture = (<img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />);
        }
        return (
            <div className='container-home2'>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="post-profile-img">
                            {$picture}
                        </div>
                        <div className="title">
                        <h3 className="panel-title">{this.state.user.name} : {this.state.title} </h3>
                        </div>
                    </div>
                    <div className="container panel-body pb">
                        {this.state.body}
                    </div>
                    <hr></hr>
                    <div className="buttons test">
                        <button type="button" className="btn btn-default btn-lg  ">Comentar</button>
                        <button type="button" className="btn btn-default btn-lg posd">Contactar</button>
                    </div>
                </div>
            </div>
        )
    }

}
/*const { object, bool } = PropTypes;

Post.propTypes = {
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

export default connect(null, mapDispatch)(Post);*/
export default Post;