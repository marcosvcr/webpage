import React, { Component } from "react";
import BootstrapMenuBar from "./BootstrapMenuBar";
import {
  Form,
  Container,
  Segment,
  Label,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Colors from "../utilities/Colors";
import Strings from "../utilities/Strings";
import Utils from "../utilities/Utils";
import Constants from "../utilities/Constants";

let UtilsInstance = new Utils();

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pwd: "",
      isLoginDimmerActive: false,
      isErrorActive: false,
      errorMessageContent: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.mockLoginClick = this.mockLoginClick.bind(this);
   // this.requestLogin = this.requestLogin.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleLoginClick() {
    this.setState({ isLoginDimmerActive: true }, () => {
      var sha256 = require("js-sha256");
      let pwdHash = sha256(this.state.pwd);
      console.log(pwdHash);

      let data = {
        email: this.state.email,
        pwd: this.state.pwd,
      };

      fetch(Constants.ENDPOINT + "requestSignin_POST", {
        method: "POST",
    mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then(UtilsInstance.checkStatus)
    .then((res) => res.json())
        .then((loginResult) => {
/////////////////////login proccess/////////////////////////////////
      if (loginResult.code === Constants.ERROR) {
        alert("O e-mail digitado não está cadastrado");
      }else {
        let crypt = require("crypto");
        let mykey = crypt.createDecipher('aes-128-cbc', this.state.pwd);
        let mystr = mykey.update(loginResult.pwd,'hex', 'utf8');
        mystr += mykey.final('utf8');
        if(mystr === loginResult.salt){
          if(loginResult.type === "ADMIN"){
            this.props.history.push({ pathname: "/dashboard" });
          }else if(loginResult.type === "PERSON" || loginResult.type === "ONG"){
            this.props.history.push({ pathname: "/profile" });
          }
        }else{
          alert("A senha digitada é inválida");
        }
        //alert(UtilsInstance.getRegisterResultString(registerResult.code));
        //this.props.history.push({ pathname: "/dashboard" });
      }
    })
///////////////////////////////////////////////////// 
          // Faça o login do usuário
        //  this.setState({ isErrorActive: false });
        ///////})
        .catch((error) => {
          this.setState({
            isErrorActive: true,
            errorMessageContent: ["A senha digitada é inválida"],
          });
        })
        .finally(() => {
          this.setState({ isLoginDimmerActive: false });
        });
    });
  }

  mockLoginClick() {
    let item = JSON.parse(localStorage.getItem(this.state.email));
    console.log("item: ", item);

    if (item !== null) {
      if (this.state.email === item.email && this.state.pwd === item.pwd) {
        this.props.history.push({ pathname: "/ongs" });
      } else {
        alert("A senha digitada é inválida");
      }
    } else {
      alert("O e-mail digitado não está cadastrado");
    }
  }

  render() {
    return (
      <div>
        <BootstrapMenuBar />
        <Container text style={containerStyle}>
          <Segment className="attached">
            <Label attached="top left" size="large" style={segmentLabelStyle}>
              {Strings.LOGIN}
            </Label>
            <Form error={this.state.isErrorActive}>
              <Form.Input
                name="email"
                label={Strings.REG_EMAIL_LABEL}
                placeholder={Strings.REG_EMAIL_PLACEHOLDER}
                type="email"
                onChange={this.handleChange}
              />
              <Form.Input
                name="pwd"
                label={Strings.REG_PWD_PLACEHOLDER}
                placeholder={Strings.REG_PWD_PLACEHOLDER}
                type="password"
                onChange={this.handleChange}
              />
              <div style={buttonContainerStyle}>
                <Form.Button
                  style={loginButtonStyle}
                  content={Strings.ENTER}
                  onClick={this.handleLoginClick}
                />
              </div>
              <Message
                error
                header={Strings.LOGIN_ERROR}
                list={this.state.errorMessageContent}
              />
            </Form>

            <Dimmer active={this.state.isLoginDimmerActive}>
              <Loader content={Strings.LOGIN_LOADER_MSG} />
            </Dimmer>
          </Segment>
        </Container>
      </div>
    );
  }
}

const containerStyle = {
  marginTop: "20vh",
};

const loginButtonStyle = {
  backgroundColor: Colors.MAIN_TEAL,
  color: "white",
  width: "50%",
};

const buttonContainerStyle = {
  marginTop: "2vh",
  textAlign: "center",
};

const segmentLabelStyle = {
  color: "white",
  backgroundColor: Colors.MAIN_TEAL,
};

export default withRouter(Login);
