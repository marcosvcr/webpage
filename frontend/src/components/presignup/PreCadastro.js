import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BootstrapMenuBar from "../BootstrapMenuBar";
import {
  Form,
  Container,
  Segment,
  Label,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { validate } from "gerador-validador-cpf";
import Utils from "../../utilities/Utils";
import Colors from "../../utilities/Colors";
import Constants from "../../utilities/Constants";

let Strings = require("../../utilities/Strings");
let UtilsInstance = new Utils();

export class PreCadastro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      cpf: "",
      birthDate: "",
      tel: "",
      email: "",
      pwd: "",
      pwdConfirm: "",
      // Errors
      errors: {
        nameError: false,
        cpfError: false,
        birthDateError: false,
        telError: false,
        emailError: false,
        pwdError: false,
        pwdConfirmError: false,
      },
      isSignupDimmerActive: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
  }

  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    });

  validateForm = () => {
    let errors = {};
    let hasAnyError = false;

    // Validação de nome
    if (this.state.name === "") {
      errors.nameError = Strings.REG_NAME_ERROR;
      hasAnyError = true;
    } else {
      errors.nameError = false;
    }

    // Validação de CPF
    if (this.state.cpf === "") {
      errors.cpfError = Strings.REG_CPF_BLANK_ERROR;
      hasAnyError = true;
    } else if (!validate(this.state.cpf)) {
      errors.cpfError = Strings.REG_CPF_INVALID_ERROR;
      hasAnyError = true;
    } else {
      errors.cpfError = false;
    }

    // Validar data de nascimento
    if (this.state.birthDate === "") {
      errors.birthDateError = Strings.REG_BIRTH_DATE_ERROR;
      hasAnyError = true;
    } else {
      errors.birthDateError = false;
    }

    // Validação de telefone
    if (this.state.tel === "") {
      errors.telError = Strings.REG_TEL_ERROR;
      hasAnyError = true;
    } else {
      errors.telError = false;
    }

    // Validação de email
    if (this.state.email === "") {
      errors.emailError = Strings.REG_EMAIL_BLANK_ERROR;
      hasAnyError = true;
    } else if (!UtilsInstance.isEmailValid(this.state.email)) {
      errors.emailError = Strings.REG_EMAIL_INVALID_ERROR;
      hasAnyError = true;
    } else {
      errors.emailError = false;
    }

    // Validar Senha
    // Nenhuma das 2 em branco, as 2 iguais
    if (this.state.pwd === "") {
      errors.pwdError = Strings.REG_PWD_EMPTY_ERROR;
      hasAnyError = true;
    } else if (this.state.pwd !== this.state.pwdConfirm) {
      errors.pwdError = Strings.REG_PWD_DIFF_ERROR;
      hasAnyError = true;
    } else {
      errors.pwdError = false;
    }

    if (this.state.pwdConfirm === "") {
      errors.pwdConfirmError = Strings.REG_PWD_CONFIRM_EMPTY_ERROR;
      hasAnyError = true;
    } else if (this.state.pwd !== this.state.pwdConfirm) {
      errors.pwdConfirmError = Strings.REG_PWD_DIFF_ERROR;
      hasAnyError = true;
    } else {
      errors.pwdConfirmError = false;
    }

    if (hasAnyError) {
      this.setState({
        errors,
      });
    } else {
      // Limpe os erros
      this.setState({
        errors: {
          nameError: false,
          cpfError: false,
          birthDateError: false,
          telError: false,
          emailError: false,
          pwdError: false,
          pwdConfirmError: false,
        },
        isSignupDimmerActive: true,
      });
      this.requestSignup();
    }
  };

  requestSignup = () => {
	let crypt = require("crypto");
    let cryptoRandomString = require("crypto-random-string");
    let sharezapahlevi = require("js-sha256");
    let tinkiWinky = cryptoRandomString({ length: 32 });
    let dipsy = this.state.pwd + tinkiWinky;
    let telletubie = sharezapahlevi(dipsy);
    let userID = this.state.cpf.replace(/\./g, "");
	let mykey = crypt.createCipher('aes-128-cbc', this.state.pwd);
	let mystr = mykey.update(tinkiWinky, 'utf8', 'hex');
	mystr += mykey.final('hex');
    userID = userID.replace(/-/g, "");

    let data = {
      name: this.state.name,
      cpf: userID,
      birthDate: this.state.birthDate,
      tel: this.state.tel,
      email: this.state.email,
      pwd: mystr,
      salt: tinkiWinky,
    };

    fetch(Constants.ENDPOINT + "requestSignupUSER_POST", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then(UtilsInstance.checkStatus)
      .then((res) => res.json())
      .then((registerResult) => {
        if (registerResult.code === Constants.SUCCESS) {
          alert(UtilsInstance.getRegisterResultString(registerResult.code));
          this.props.history.push({ pathname: "/" });
        } else {
          alert(UtilsInstance.getRegisterResultString(registerResult.code));
        }
      })
      .catch((error) => {
        alert(Strings.PRE_SIGNUP_ERROR + error);
      })
      .finally(() => {
        this.setState({
          isSignupDimmerActive: false,
        });
      });
  };

  // ---------------- Lifecycle Methods ----------------
  render() {
    return (
      <div>
        <BootstrapMenuBar />
        <Container text style={containerStyle}>
          <Segment>
            <Label attached="top left" size="large" style={segmentLabelStyle}>
              {Strings.PRE_SIGNUP_CPF_FORM_LABEL}
            </Label>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.errors.nameError}
                  name="name"
                  value={this.state.name}
                  label={Strings.REG_NAME_PLACEHOLDER}
                  placeholder={Strings.REG_NAME_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.cpfError}
                  name="cpf"
                  value={this.state.cpf}
                  label={Strings.REG_CPF_LABEL}
                  placeholder={Strings.REG_CPF_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  name="birthDate"
                  error={this.state.errors.birthDateError}
                  value={this.state.birthDate}
                  width={8}
                  label={Strings.REG_BIRTH_PLACEHOLDER}
                  placeholder="01/01/1970"
                  type="date"
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="tel"
                  error={this.state.errors.telError}
                  value={this.state.tel}
                  width={8}
                  label={Strings.REG_TEL_PLACEHOLDER}
                  placeholder={Strings.REG_TEL_PLACEHOLDER}
                  type="tel"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                error={this.state.errors.emailError}
                name="email"
                value={this.state.email}
                label={Strings.REG_EMAIL_LABEL}
                placeholder={Strings.REG_EMAIL_PLACEHOLDER}
                type="email"
                onChange={this.handleChange}
              />
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.errors.pwdError}
                  name="pwd"
                  value={this.state.pwd}
                  label={Strings.REG_PWD_PLACEHOLDER}
                  placeholder={Strings.REG_PWD_PLACEHOLDER}
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.pwdConfirmError}
                  name="pwdConfirm"
                  value={this.state.pwdConfirm}
                  label={Strings.REG_PWD_CONF_PLACEHOLDER}
                  placeholder={Strings.REG_PWD_CONF_PLACEHOLDER}
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={buttonContainerStyle}>
                <Form.Button
                  style={submitButtonStyle}
                  content={Strings.REGISTER}
                  onClick={this.validateForm}
                />
              </div>
            </Form>
            <Dimmer active={this.state.isSignupDimmerActive}>
              <Loader content={Strings.REGISTERING_PLEASE_WAIT} />
            </Dimmer>
          </Segment>
        </Container>
      </div>
    );
  }
}

const submitButtonStyle = {
  backgroundColor: Colors.MAIN_TEAL,
  color: "white",
  width: "50%",
};

const buttonContainerStyle = {
  marginTop: "2vh",
  textAlign: "center",
};

const containerStyle = {
  marginBottom: "4vh",
};

const segmentLabelStyle = {
  color: "white",
  backgroundColor: Colors.MAIN_TEAL,
};

export default withRouter(PreCadastro);
