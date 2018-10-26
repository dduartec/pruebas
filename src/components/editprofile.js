import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Log.css';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { stringify } from 'querystring';
import Navigation from './Navigation';
import ImageUploader from 'react-images-upload';

class editprofile extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            id: "",
            hasError: 0,
            errors: "email, nombre o contraseña incorrecto",
            errors1: "El email ya se encuentra en uso",
            errors2: "La contraseña no coincide",
            file: '',
            imagePreviewUrl: '',
            base64img:'',
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);


    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                base64img: reader.result
            });
        }
        reader.readAsDataURL(file);
        
    }

    onDrop(picture) {
        this.setState({
            profile_pic: URL.createObjectURL(picture),
        });
        console.log(this.state.profile_pic);
    }

    componentDidMount() {
        axios.get('https://knowledge-community-back-end.herokuapp.com/users')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].email == this.props.user.email) {
                        this.setState({ id: res.data[i].id })
                    }
                }
            })
    }

    onSubmit(history) {
        const { user } = this.state;
        let { imagePreviewUrl } = this.state;
        if (imagePreviewUrl) {
            console.log(imagePreviewUrl);
            axios.post(`https://knowledge-community-back-end.herokuapp.com/app_files`, { ruta: imagePreviewUrl, file_type_id: 1, user_id: this.state.id, post_id:"", description:"foto_perfil", titulo:"foto.png" })
        }
        axios.put('https://knowledge-community-back-end.herokuapp.com/users/' + this.state.id, { user })
            .then(response => {
                const { token } = response.data.authentication_token;
                sessionService.saveSession({ token })
                    .then(() => {
                        sessionService.saveUser(response.data)
                            .then(() => {
                                history.push('/profile');
                            }).catch(err => alert(err));
                    }).catch(err => alert(err));
            }).catch(function (error) {
                if (user.name == "" || user.email == "" || user.password == "" || user.password_confirmation == "") {
                    this.setState({
                        hasError: 1,
                    });
                }
                else if (user.password != user.password_confirmation) {
                    this.setState({
                        hasError: 3,
                    });
                }
                else if (error.message.indexOf('422') != -1) {
                    this.setState({
                        hasError: 2,
                    });
                }
            }.bind(this))

    }

    onChange(e) {
        const { value, name } = e.target;
        const { user } = this.state;
        user[name] = value;
        this.setState({ user });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }
        const { user } = this.state;
        const SubmitButton = withRouter(({ history }) => (
            <button className="mybtn"
                onClick={() => this.onSubmit(history)}
                type="submit">Guardar Cambios
        </button>
        ));

        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="left">
                        <div className="container container-login2">
                            <div className="row">
                                <div className="col-sm-12 log-text">
                                    <h2>Modifica tus datos</h2>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-sm-8 offset-sm-2 myform-cont">
                                    {this.state.hasError == 1 &&
                                        <div className="alert alert-danger">
                                            <strong>Error:</strong> {this.state.errors}
                                        </div>
                                    }

                                    {this.state.hasError == 2 &&
                                        <div className="alert alert-danger">
                                            <strong>Error:</strong> {this.state.errors1}
                                        </div>
                                    }
                                    {this.state.hasError == 3 &&
                                        <div className="alert alert-danger">
                                            <strong>Error:</strong> {this.state.errors2}
                                        </div>
                                    }
                                    <div className="form-group">
                                        <input type="text" name="name" placeholder="Nombre" className="form-control" id="form-name" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="email" placeholder="Email" className="form-control" id="form-email" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Contraseña" className="form-control" id="form-password" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password_confirmation" placeholder="Confirmar contraseña" className="form-control" id="form-password_confirmation" onChange={this.onChange} />
                                    </div>
                                    <div>
                                        <h4>Cambiar foto</h4>
                                        {/*<ImageUploader
                                            withIcon={false}
                                            buttonText='Seleccionar foto'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withLabel={false}
                                            singleImage={true}
                                        />
                                        <img src={this.state.file} />*/}
                                        <div>
                                            <input type="file" onChange={this._handleImageChange} />
                                            {$imagePreview}

                                        </div>
                                    </div>
                                    <SubmitButton />
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const { object, bool } = PropTypes;

editprofile.propTypes = {
    actions: object.isRequired,
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

export default connect(mapState, mapDispatch)(editprofile);