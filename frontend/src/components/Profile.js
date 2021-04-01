import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Header,
  Button,
  Grid,
  Image,
  Divider,
} from "semantic-ui-react";
import Strings from "../utilities/Strings";
import Colors from "../utilities/Colors";
import MainMenuBar from "./MainMenuBar";

export class Profile extends Component {


  render() {
    return (
      <div>
        <MainMenuBar />

        <Container text>
          <Divider horizontal style={dividerStyle}>
            <Header as="h2" textAlign="center" style={headerStyle}>
              {Strings.WELCOME_DOAR}
            </Header>
          </Divider>
          <div style={headerStyle}>
            <h2>{Strings.DEAR_USER}</h2>
            <p> {Strings.DEAR_USER_BODY}</p>
 
          <p>{Strings.DEAR_USER_REGARDS}</p>
          <p>{Strings.DEAR_USER_FOOTER}</p>
        </div>


        </Container>
      </div>
    );
  }
}

let dividerStyle = {
  paddingTop: "4vh",
  paddingBottom: "4vh",
};

let headerStyle = {
  color: Colors.MAIN_TEAL,
};

let physHeaderStyle = {
  color: Colors.MAIN_PURPLE,
};

let ongHeaderStyle = {
  color: Colors.MAIN_YELLOW,
};

let statisticsHeaderStyle = {
  color: Colors.MAIN_GREEN,
};

export default withRouter(Profile);
