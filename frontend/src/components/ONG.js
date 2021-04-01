import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Segment,
  Image,
  Header,
  Icon,
  Label,
  Grid,
} from "semantic-ui-react";

import Constants from "../utilities/Constants";
import Colors from "../utilities/Colors";
import Strings from "../utilities/Strings";
import MainMenuBar from "./MainMenuBar";

export class ONG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ongID: "",
      ong: {
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
        desc: "",
        causes: [],
        helpType: [],
        dontShowAddress: false,
        bank: "",
        bankAccount: "",
        bankAgency: "",
      },
      ongImage: "./imagem-indisponivel.png",
    };
  }

  retrieveData = () => {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.ongID !== undefined) {
        this.setState({ ongID: this.props.location.state.ongID }, () => {
          // Request dos dados
          let data = JSON.stringify({ cnpj: this.props.location.state.ongID });

          let imageRequest = JSON.stringify({
            idImage: this.props.location.state.ongID,
            thumbnail: 0,
          });

          fetch(Constants.ENDPOINT + "getDetails", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            body: data,
          })
            .then((res) => res.json())
            .then((data) => this.setState({ ong: data }))
            .catch((error) => console.log(error));

          fetch(Constants.ENDPOINT + "requestImageProfile", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: imageRequest,
          })
            .then((response) => response.blob())
            .then((images) => {
              if (images.type !== "application/json") {
                let imgURL = URL.createObjectURL(images);
                this.setState({ ongImage: imgURL });
              }
            })
            .catch((error) => console.log(error));
        });
      }
    }
  };

  getShowAddressString = () => {
    if (this.state.ong.dontShowAddress) {
      return Strings.NO;
    } else {
      return Strings.YES;
    }
  };

  getCauseLabel = (cause) => {
    if (cause === "animals") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.animalsLabelStyle}
          content="Animais"
          icon="paw"
        />
      );
    } else if (cause === "women") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.womenLabelStyle}
          content="Mulheres"
          icon="woman"
        />
      );
    } else if (cause === "children") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.childrenLabelStyle}
          content="Crianças"
          icon="child"
        />
      );
    } else if (cause === "elderlies") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.elderlyLabelStyle}
          content="Idosos"
          icon="users"
        />
      );
    } else if (cause === "humanRights") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.humanRightsLabelStyle}
          content="Direitos Humanos"
          icon="hand spock"
        />
      );
    } else if (cause === "health") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.healthLabelStyle}
          content="Saúde"
          icon="heartbeat"
        />
      );
    } else if (cause === "environment") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.environmentLabelStyle}
          content="Meio ambiente"
          icon="tree"
        />
      );
    } else if (cause === "education") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.educationLabelStyle}
          content="Educação"
          icon="graduation"
        />
      );
    } else if (cause === "culture") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.cultureLabelStyle}
          content="Cultura"
          icon="discussions"
        />
      );
    } else if (cause === "pne") {
      return (
        <Label
          key={cause}
          horizontal
          size="large"
          style={Colors.pneLabelStyle}
          content="PNE"
          icon="wheelchair"
        />
      );
    }
  };

  getHelpLabel = (helpType) => {
    if (helpType === "money") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.moneyLabelStyle}
          content="Dinheiro"
          icon="dollar"
        />
      );
    } else if (helpType === "time") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.timeLabelStyle}
          content="Tempo"
          icon="hourglass half"
        />
      );
    } else if (helpType === "blood") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.bloodLabelStyle}
          content="Sangue"
          icon="tint"
        />
      );
    } else if (helpType === "clothes") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.clothesLabelStyle}
          content="Vestuário"
          icon="user secret"
        />
      );
    } else if (helpType === "furniture") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.furnitureLabelStyle}
          content="Móveis"
          icon="bed"
        />
      );
    } else if (helpType === "householdAppl") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.electLabelStyle}
          content="Eletrodomésticos"
          icon="plug"
        />
      );
    } else if (helpType === "electronics") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.electronicsLabelStyle}
          content="Eletrônicos"
          icon="computer"
        />
      );
    } else if (helpType === "food") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.foodLabelStyle}
          content="Alimentos"
          icon="food"
        />
      );
    } else if (helpType === "books") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.booksLabelStyle}
          content="Livros"
          icon="book"
        />
      );
    } else if (helpType === "toys") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.toysLabelStyle}
          content="Brinquedos"
          icon="gamepad"
        />
      );
    } else if (helpType === "hygiene") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.hygieneLabelStyle}
          content="Higiene"
          icon="shower"
        />
      );
    } else if (helpType === "others") {
      return (
        <Label
          key={helpType}
          horizontal
          size="large"
          style={Colors.othersLabelStyle}
          content="Outros"
          icon="discussions"
        />
      );
    }
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    let causesLabels = this.state.ong.causes.map((cause) => {
      return this.getCauseLabel(cause);
    });

    let helpTypeLabels = this.state.ong.helpType.map((help) => {
      return this.getHelpLabel(help);
    });

    return (
      <div style={divStyle}>
        <MainMenuBar />
        <Container>
          <div style={titleStyle}>
            <Image src={this.state.ongImage} size="small" centered />

            <Header style={fantasyNameStyle} as="h1" textAlign="center">
              {this.state.ong.fantasyName}
              <Header.Subheader>{this.state.ong.desc}</Header.Subheader>
            </Header>
          </div>

          <Grid columns={2} centered doubling stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h4" dividing>
                    <Icon name="building" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.ORG_INFO}
                    </Header.Content>
                  </Header>

                  <p style={textStyle}>
                    <span style={spanStyle}>{Strings.REG_CNPJ_LABEL}: </span>{" "}
                    {this.state.ong.cnpj}
                  </p>
                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.REG_SOCIAL_REASON_PLACEHOLDER}:{" "}
                    </span>{" "}
                    {this.state.ong.social}
                  </p>

                  <Header as="h4" dividing>
                    <Icon name="map marker alternate" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.LOCATION}
                    </Header.Content>
                  </Header>

                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.REG_ADDRESS_PLACEHOLDER}:{" "}
                    </span>
                    {this.state.ong.address}, nº {this.state.ong.num} -{" "}
                    {this.state.ong.compl}
                  </p>

                  <p style={textStyle}>
                    <span style={spanStyle}>{Strings.REG_CEP_LABEL}: </span>
                    {this.state.ong.cep}{" "}
                  </p>

                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.REG_CITY_PLACEHOLDER}:{" "}
                    </span>
                    {this.state.ong.city}
                  </p>

                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.REG_STATE_PLACEHOLDER}:{" "}
                    </span>
                    {this.state.ong.brState}
                  </p>

                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.SHOW_ADDRES_ON_PLATFORM}?:{" "}
                    </span>{" "}
                    {this.getShowAddressString()}
                  </p>

                  <Header as="h4" dividing>
                    <Icon name="address book" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.CONTACT}
                    </Header.Content>
                  </Header>

                  <p style={textStyle}>
                    <Icon name="call" />
                    {this.state.ong.tel}
                  </p>
                  <p style={textStyle}>
                    <Icon name="mail" />
                    {this.state.ong.email}
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment>
                  <Header as="h4" dividing>
                    <Icon name="balance scale" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.BANK_INFO}
                    </Header.Content>
                  </Header>
                  <p style={textStyle}>
                    <span style={spanStyle}>{Strings.BANK_PLACEHOLER}:</span>{" "}
                    {this.state.ong.bank}
                  </p>
                  <p style={textStyle}>
                    <span style={spanStyle}>
                      {Strings.ACCOUNT_PLACEHOLDER}:
                    </span>{" "}
                    {this.state.ong.bankAccount}
                  </p>
                  <p style={textStyle}>
                    <span style={spanStyle}>{Strings.AGENCY_PLACEHOLDER}:</span>{" "}
                    {this.state.ong.bankAgency}
                  </p>
                </Segment>

                <Segment textAlign="center">
                  <Header as="h4" dividing>
                    <Icon name="heart" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.SUPPORTED_CAUSES}
                    </Header.Content>
                  </Header>
                  {causesLabels}
                </Segment>

                <Segment textAlign="center">
                  <Header as="h4" dividing>
                    <Icon name="handshake" style={headerIconStyle} />
                    <Header.Content style={infosHeaderStyle}>
                      {Strings.ACCEPTED_HELP}
                    </Header.Content>
                  </Header>
                  {helpTypeLabels}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const divStyle = {
  height: "100vh",
};

let titleStyle = {
  padding: "4vh 0vw",
};

let fantasyNameStyle = {
  color: Colors.MAIN_TEAL,
};

let headerIconStyle = {
  color: Colors.MAIN_TEAL,
  paddingBottom: "0.5vh",
};

let infosHeaderStyle = {
  color: Colors.MAIN_TEAL,
};

let textStyle = {
  color: Colors.TEXT_GREY,
  fontSize: "1.1em",
};

let spanStyle = {
  fontWeight: "bold",
};

export default withRouter(ONG);
