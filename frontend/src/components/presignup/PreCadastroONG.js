import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BootstrapMenuBar from "../BootstrapMenuBar";
import {
  Form,
  Container,
  Message,
  Segment,
  Label,
  Dimmer,
  Loader,
  Checkbox,
  Popup,
} from "semantic-ui-react";
import Utils from "../../utilities/Utils";
import Colors from "../../utilities/Colors";
import Strings from "../../utilities/Strings";
import Constants from "../../utilities/Constants";
import { BanksList } from "../../utilities/BanksList";

const statesList = [
  { key: "AC", text: "AC", value: "AC" },
  { key: "AL", text: "AL", value: "AL" },
  { key: "AP", text: "AP", value: "AP" },
  { key: "AM", text: "AM", value: "AM" },
  { key: "BA", text: "BA", value: "BA" },
  { key: "CE", text: "CE", value: "CE" },
  { key: "DF", text: "DF", value: "DF" },
  { key: "ES", text: "ES", value: "ES" },
  { key: "GO", text: "GO", value: "GO" },
  { key: "MA", text: "MA", value: "MA" },
  { key: "MT", text: "MT", value: "MT" },
  { key: "MS", text: "MS", value: "MS" },
  { key: "MG", text: "MG", value: "MG" },
  { key: "PA", text: "PA", value: "PA" },
  { key: "PB", text: "PB", value: "PB" },
  { key: "PR", text: "PR", value: "PR" },
  { key: "PE", text: "PE", value: "PE" },
  { key: "PI", text: "PI", value: "PI" },
  { key: "RJ", text: "RJ", value: "RJ" },
  { key: "RN", text: "RN", value: "RN" },
  { key: "RS", text: "RS", value: "RS" },
  { key: "RO", text: "RO", value: "RO" },
  { key: "RR", text: "RR", value: "RR" },
  { key: "SC", text: "SC", value: "SC" },
  { key: "SP", text: "SP", value: "SP" },
  { key: "SE", text: "SE", value: "SE" },
  { key: "TO", text: "TO", value: "TO" },
];

const causesList = [
  { key: "animals", text: "Animais", value: "animals" },
  { key: "women", text: "Mulheres", value: "women" },
  { key: "children", text: "Crianças", value: "children" },
  { key: "elderlies", text: "Idosos", value: "elderlies" },
  { key: "humanRights", text: "Direitos humanos", value: "humanRights" },
  { key: "health", text: "Saúde", value: "health" },
  { key: "environment", text: "Meio ambiente", value: "environment" },
  { key: "education", text: "Educação", value: "education" },
  { key: "culture", text: "Cultura", value: "culture" },
  {
    key: "pne",
    text: "Portadores de necessidades especiais",
    value: "pne",
  },
];

const helpTypeList = [
  { key: "money", text: "Dinheiro", value: "money" },
  { key: "time", text: "Tempo", value: "time" },
  { key: "blood", text: "Sangue", value: "blood" },
  { key: "clothes", text: "Vestuário", value: "clothes" },
  { key: "furniture", text: "Móveis", value: "furniture" },
  { key: "householdAppl", text: "Eletrodomésticos", value: "householdAppl" },
  { key: "electronics", text: "Eletrônicos", value: "electronics" },
  { key: "food", text: "Alimentos", value: "food" },
  { key: "books", text: "Livros", value: "books" },
  { key: "toys", text: "Brinquedos", value: "toys" },
  { key: "hygiene", text: "Higiene", value: "hygiene" },
  { key: "others", text: "Outros", value: "others" },
];

let UtilsInstance = new Utils();

export class PreCadastroONG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cnpj: "",
      social: "",
      fantasyName: "",
      address: "",
      num: "",
      compl: "",
      cep: "",
      city: "",
      brState: "",
      tel: "",
      email: "",
      pwd: "",
      pwdConfirm: "",
      desc: "",
      causes: [],
      helpType: [],
      bank: "",
      bankAccount: "",
      bankAgency: "",
      isDontShowAddrChecked: false,
      isShowBankDataCheckboxChecked: false,
      // Errors
      errors: {
        cnpjError: false,
        socialError: false,
        fantasyNameError: false,
        addressError: false,
        numError: false,
        complError: false,
        cepError: false,
        cityError: false,
        brStateError: false,
        telError: false,
        emailError: false,
        pwdError: false,
        pwdConfirmError: false,
        descError: false,
        causesError: false,
        helpTypeError: false,
        imageError: false,
        bankNameError: false,
        bankAccountError: false,
        bankAgencyError: false,
      },
      isSignupDimmerActive: false,
      bankDataSegmentStyle: {
        display: "None",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCauseChange = this.handleCauseChange.bind(this);
    this.handleHelpTypeChange = this.handleHelpTypeChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleBankData = this.toggleBankData.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleCauseChange = (e, { value }) => this.setState({ causes: value });

  handleHelpTypeChange = (e, { value }) => this.setState({ helpType: value });

  handleBankNameChange = (e, { value }) => this.setState({ bank: value });

  toggle = () =>
    this.setState((prevState) => ({
      isDontShowAddrChecked: !prevState.isDontShowAddrChecked,
    }));

  toggleBankData() {
    this.setState(
      {
        isShowBankDataCheckboxChecked: !this.state
          .isShowBankDataCheckboxChecked,
      },
      () => {
        if (this.state.isShowBankDataCheckboxChecked) {
          this.setState({
            bankDataSegmentStyle: {
              display: "block",
            },
          });
        } else {
          this.setState({
            bankDataSegmentStyle: {
              display: "none",
            },
          });
        }
      }
    );
  }

  validateForm = () => {
    let errors = {};
    let hasAnyError = false;

    // Validação de CNPJ
    if (this.state.cnpj === "") {
      errors.cnpjError = Strings.REG_CNPJ_BLANK_ERROR;
      hasAnyError = true;
    } else if (!UtilsInstance.isCPNJValid(this.state.cnpj)) {
      errors.cnpjError = Strings.REG_CNPJ_INVALID_ERROR;
      hasAnyError = true;
    } else {
      errors.cnpjError = false;
    }

    // Validação de razão social
    if (this.state.social === "") {
      errors.socialError = Strings.REG_SOCIAL_ERROR;
      hasAnyError = true;
    } else {
      errors.socialError = false;
    }

    // Validação do nome fantasia
    if (this.state.fantasyName === "") {
      errors.fantasyNameError = Strings.FANTASY_NAME_ERROR;
      hasAnyError = true;
    } else {
      errors.fantasyNameError = false;
    }

    // Validação de endereço
    if (this.state.address === "") {
      errors.addressError = Strings.REG_ADDR_ERROR;
      hasAnyError = true;
    } else {
      errors.addressError = false;
    }

    // Validação de número
    if (this.state.num === "") {
      errors.numError = Strings.REG_NUM_ERROR;
      hasAnyError = true;
    } else {
      errors.numError = false;
    }

    // Complemento não precisa de validação
    // Pode ser em branco

    // Validação de CEP
    if (this.state.cep === "") {
      errors.cepError = Strings.REG_CEP_BLANK_ERROR;
      hasAnyError = true;
    } else if (!UtilsInstance.isCEP(this.state.cep)) {
      errors.cepError = Strings.REG_CEP_INVALID_ERROR;
      hasAnyError = true;
    } else {
      errors.cepError = false;
    }

    // Validação de cidade
    if (this.state.city === "") {
      errors.cityError = Strings.REG_CITY_ERROR;
      hasAnyError = true;
    } else {
      errors.cityError = false;
    }

    // Validação de estado
    if (this.state.brState === "") {
      errors.brStateError = Strings.REG_STATE_ERROR;
      hasAnyError = true;
    } else {
      errors.brStateError = false;
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

    // Validar descrição
    if (this.state.desc === "") {
      errors.descError = Strings.REG_DESCR_ERROR;
      hasAnyError = true;
    } else {
      errors.descError = false;
    }

    // Validação de causas
    if (this.state.causes.length === 0) {
      errors.causesError = Strings.REG_CAUSES_ERROR;
      hasAnyError = true;
    } else {
      errors.causesError = false;
    }

    // Validação dos tipos de ajudas
    if (this.state.helpType.length === 0) {
      errors.helpTypeError = Strings.REG_HELP_ERROR;
      hasAnyError = true;
    } else {
      errors.helpTypeError = false;
    }

    // Validação das imagens
    if (document.getElementById("ong-image").files[0] === undefined) {
      errors.imageError = Strings.REG_IMG_ERROR;
      hasAnyError = true;
    } else {
      errors.imageError = false;
    }

    // Validação dos dados bancários
    // Só valida se o checkbox estiver marcado
    if (this.state.isShowBankDataCheckboxChecked) {
      if (this.state.bank === "") {
        errors.bankNameError = Strings.BANK_NAME_ERROR;
        hasAnyError = true;
      } else {
        errors.bankNameError = false;
      }

      if (this.state.bankAccount === "") {
        errors.bankAccountError = Strings.BANK_ACCOUNT_BLANK_ERROR;
        hasAnyError = true;
      } else {
        errors.bankAccountError = false;
      }

      if (this.state.bankAgency === "") {
        errors.bankAgencyError = Strings.BANK_AGENCY_BLANK_ERROR;
        hasAnyError = true;
      } else {
        errors.bankAgencyError = false;
      }
    }

    if (hasAnyError) {
      this.setState({ errors });
    } else {
      // Limpar os erros
      this.setState({
        errors: {
          cnpjError: false,
          socialError: false,
          fantasyNameError: false,
          addressError: false,
          numError: false,
          complError: false,
          cepError: false,
          cityError: false,
          brStateError: false,
          telError: false,
          emailError: false,
          pwdError: false,
          pwdConfirmError: false,
          descError: false,
          causesError: false,
          helpTypeError: false,
          imageError: false,
          bankNameError: false,
          bankAccountError: false,
          bankAgencyError: false,
        },
        isSignupDimmerActive: true,
      });
      this.requestSignup();
    }
  };

  requestSignup = () => {
	let crypt = require("crypto");
    let formData = new FormData();
    let cryptoRandomString = require("crypto-random-string");
    let sharezapahlevi = require("js-sha256");
    let tinkiWinky = cryptoRandomString({ length: 32 });
    let dipsy = this.state.pwd + tinkiWinky;
    let telletubie = sharezapahlevi(dipsy);
	let mykey = crypt.createCipher('aes-128-cbc', this.state.pwd);
	let mystr = mykey.update(tinkiWinky, 'utf8', 'hex');
	mystr += mykey.final('hex');
    let registerBank = "";
    let registerBankAccount = "";
    let registerBankAgency = "";

    // Se o usuário desejar salvar os dados bancários
    // Não envie em branco
    if (this.state.isShowBankDataCheckboxChecked) {
      registerBank = this.state.bank;
      registerBankAccount = this.state.bankAccount;
      registerBankAgency = this.state.bankAgency;
    }

    let ongImage = document.getElementById("ong-image").files[0];

    let ongID = this.state.cnpj.replace(/\./g, "");
    ongID = ongID.replace(/-/g, "");
    ongID = ongID.replace(/\//g, "");

    let ongForm = {
      cnpj: ongID,
      social: this.state.social,
      fantasyName: this.state.fantasyName,
      address: this.state.address,
      num: this.state.num,
      compl: this.state.compl,
      cep: this.state.cep,
      city: this.state.city,
      brState: this.state.brState,
      tel: this.state.tel,
      email: this.state.email,
      pwd: mystr,
      salt: tinkiWinky,
      desc: this.state.desc,
      causes: this.state.causes,
      helpType: this.state.helpType,
      dontShowAddress: this.state.isDontShowAddrChecked,
      bank: registerBank,
      bankAccount: registerBankAccount,
      bankAgency: registerBankAgency,
    };

    // Se a ONG tiver colocado uma imagem
    if (ongImage !== undefined) {
      formData.append("ong-form", JSON.stringify(ongForm));
      formData.append("ong-image", ongImage);
    } else {
      formData.append("ong-form", JSON.stringify(ongForm));
      formData.append("ong-image", "");
    }

    fetch(Constants.ENDPOINT + "requestSignupONG_POST", {
      method: "POST",
      mode: "cors",
      body: formData,
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
        this.setState({ isSignupDimmerActive: false });
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
              {Strings.PRE_SIGNUP_ONG_FORM_LABEL}
            </Label>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.errors.cnpjError}
                  name="cnpj"
                  value={this.state.cnpj}
                  label={Strings.REG_CNPJ_LABEL}
                  placeholder={Strings.REG_CNPJ_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.socialError}
                  name="social"
                  value={this.state.social}
                  label={Strings.REG_SOCIAL_REASON_PLACEHOLDER}
                  placeholder={Strings.REG_SOCIAL_REASON_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                error={this.state.errors.fantasyNameError}
                name="fantasyName"
                value={this.state.fantasyName}
                width={16}
                label={Strings.FANTASY_NAME_PLACEHOLDER}
                placeholder={Strings.FANTASY_NAME_PLACEHOLDER}
                type="text"
                onChange={this.handleChange}
              />
              <Form.Group>
                <Form.Input
                  error={this.state.errors.addressError}
                  name="address"
                  value={this.state.address}
                  width={8}
                  label={Strings.REG_ADDRESS_PLACEHOLDER}
                  placeholder={Strings.REG_ADDRESS_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.numError}
                  name="num"
                  value={this.state.num}
                  width={4}
                  label={Strings.REG_NUM_PLACEHOLDER}
                  placeholder={Strings.REG_NUM_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.complError}
                  name="compl"
                  value={this.state.compl}
                  width={4}
                  label={Strings.REG_COMPL_PLACEHOLDER}
                  placeholder={Strings.REG_COMPL_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.errors.cepError}
                  name="cep"
                  value={this.state.cep}
                  label={Strings.REG_CEP_LABEL}
                  placeholder={Strings.REG_CEP_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.state.errors.cityError}
                  name="city"
                  value={this.state.city}
                  label={Strings.REG_CITY_PLACEHOLDER}
                  placeholder={Strings.REG_CITY_PLACEHOLDER}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Select
                  error={this.state.errors.brStateError}
                  name="brState"
                  value={this.state.brState}
                  label={Strings.REG_STATE_PLACEHOLDER}
                  placeholder={Strings.REG_STATE_PLACEHOLDER}
                  options={statesList}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                error={this.state.errors.telError}
                name="tel"
                value={this.state.tel}
                label={Strings.REG_TEL_PLACEHOLDER}
                placeholder={Strings.REG_TEL_PLACEHOLDER}
                type="tel"
                onChange={this.handleChange}
              />
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
              <Form.TextArea
                error={this.state.errors.descError}
                name="desc"
                value={this.state.desc}
                label={Strings.REG_DESCR}
                placeholder={Strings.REG_DESCR_PLACEHOLDER}
                onChange={this.handleChange}
              />
              <Form.Group widths="equal">
                <Form.Dropdown
                  error={this.state.errors.causesError}
                  multiple
                  selection
                  clearable
                  label={Strings.REG_CAUSES_PLACEHOLDER}
                  placeholder={Strings.REG_CAUSES_PLACEHOLDER}
                  options={causesList}
                  onChange={this.handleCauseChange}
                />
                <Form.Dropdown
                  error={this.state.errors.helpTypeError}
                  multiple
                  selection
                  clearable
                  label={Strings.REG_HELP_TYPE_PLACEHOLDER}
                  placeholder={Strings.REG_HELP_TYPE_PLACEHOLDER}
                  options={helpTypeList}
                  onChange={this.handleHelpTypeChange}
                />
              </Form.Group>
              <Form.Input
                error={this.state.errors.imageError}
                id="ong-image"
                label={Strings.REG_IMAGE_LABEL}
                type="file"
                accept=".png,.jpg,.jpeg"
              />

              <div style={checkboxContainer}>
                <Popup
                  trigger={
                    <Checkbox
                      onChange={this.toggle}
                      checked={this.state.isDontShowAddrChecked}
                      label={Strings.DONT_SHOW_ADDRESS}
                    />
                  }
                  content={Strings.DONT_SHOW_ADDRESS_POPUP_STR}
                  position="right center"
                />
              </div>

              <div style={checkboxContainer}>
                <Popup
                  trigger={
                    <Checkbox
                      onChange={this.toggleBankData}
                      checked={this.state.isShowBankDataCheckboxChecked}
                      label={Strings.SHOW_BANK_DATA}
                    />
                  }
                  content={Strings.DONT_SHOW_ADDRESS_POPUP_STR}
                  position="right center"
                />
              </div>

              <Segment style={this.state.bankDataSegmentStyle}>
                <Form>
                  <Form.Dropdown
                    error={this.state.errors.bankNameError}
                    selection
                    search
                    clearable
                    label={Strings.BANK_PLACEHOLER}
                    placeholder={Strings.BANK_PLACEHOLER}
                    options={BanksList}
                    onChange={this.handleBankNameChange}
                  />
                  <Form.Group widths="equal">
                    <Form.Input
                      error={this.state.errors.bankAgencyError}
                      name="bankAgency"
                      value={this.state.bankAgency}
                      label={Strings.AGENCY_PLACEHOLDER}
                      placeholder={Strings.AGENCY_PLACEHOLDER}
                      type="text"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      error={this.state.errors.bankAccountError}
                      name="bankAccount"
                      value={this.state.bankAccount}
                      label={Strings.ACCOUNT_PLACEHOLDER}
                      placeholder={Strings.ACCOUNT_PLACEHOLDER}
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </Segment>

              <Message
                error
                header={Strings.ERROR_MSG_HEADER}
                list={this.state.errorList}
              />
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

const buttonContainerStyle = {
  marginTop: "2vh",
  textAlign: "center",
};

const submitButtonStyle = {
  backgroundColor: Colors.MAIN_TEAL,
  color: "white",
  width: "50%",
};

const containerStyle = {
  marginBottom: "4vh",
};

const segmentLabelStyle = {
  color: "white",
  backgroundColor: Colors.MAIN_TEAL,
};

const checkboxContainer = {
  textAlign: "center",
};

export default withRouter(PreCadastroONG);
