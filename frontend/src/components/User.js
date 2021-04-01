import React, { Component } from "react";
import { Container, Segment, Header, Icon } from "semantic-ui-react";
import Constants from "../utilities/Constants";
import Strings from "../utilities/Strings";
import Colors from "../utilities/Colors";
import { withRouter } from "react-router-dom";
import MainMenuBar from "./MainMenuBar";

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      user: {
        name: "",
        cpf: "",
        birthDate: "",
        tel: "",
        email: "",
      },
    };
  }

  retrieveData = () => {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.userID !== undefined) {
        this.setState({ userID: this.props.location.state.userID }, () => {
          // Request dos dados
          let data = JSON.stringify({ cpf: this.props.location.state.userID });

          fetch(Constants.ENDPOINT + "getDetails", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              this.setState({ user: data });
            });
        });
      }
    }
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    return (
      <div style={divStyle}>
        <MainMenuBar/>
        <Container text style={containerStyle}>
          <Segment>
            <Header as="h4" dividing>
              <Icon name="user circle" style={headerIconStyle} />
              <Header.Content style={infosHeaderStyle}>
                {Strings.PERSONAL_INFO}
              </Header.Content>
            </Header>

            <p style={textStyle}>
              {" "}
              <span style={spanStyle}>
                {Strings.REG_NAME_PLACEHOLDER}:
              </span>{" "}
              {this.state.user.name}
            </p>
            <p style={textStyle}>
              {" "}
              <span style={spanStyle}>{Strings.REG_CPF_LABEL}:</span>{" "}
              {this.state.user.cpf}
            </p>
            <p style={textStyle}>
              {" "}
              <span style={spanStyle}>
                {Strings.REG_BIRTH_PLACEHOLDER}:
              </span>{" "}
              {this.state.user.birthDate}
            </p>

            <Header as="h4" dividing>
              <Icon name="address book" style={headerIconStyle} />
              <Header.Content style={infosHeaderStyle}>
                {Strings.CONTACT}
              </Header.Content>
            </Header>

            <p style={textStyle}>
              {" "}
              <span style={spanStyle}>{Strings.REG_TEL_PLACEHOLDER}:</span>{" "}
              {this.state.user.tel}
            </p>
            <p style={textStyle}>
              {" "}
              <span style={spanStyle}>{Strings.REG_EMAIL_LABEL}:</span>{" "}
              {this.state.user.email}
            </p>
          </Segment>
        </Container>
      </div>
    );
  }
}

const divStyle = {
  height: "100vh",
};

const containerStyle = {
  padding: "4vh 0vw",
}

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

export default withRouter(User);
