import React, { Component } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import Strings from "../../utilities/Strings";
import Colors from "../../utilities/Colors";

export class WhoWeAre extends Component {
  render() {
    return (
      <Grid
        id="who-we-are"
        style={gridStyle}
        doubling
        stackable
        centered
        verticalAlign="middle"
        container
      >
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header style={headerTextStyle} textAlign="center">
              {Strings.WHO_WE_ARE}
            </Header>
            <p style={normalTextStyle}>{Strings.WHO_WE_ARE_STRING}</p>
          </Grid.Column>
          <Grid.Column>
            <Image src="/images/doar-logo-quadrado-fundo.png" size="large" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const gridStyle = {
  margin: "10vh 10vw",
};

const headerTextStyle = {
  color: Colors.MAIN_TEAL,
  fontSize: "3em",
};

const normalTextStyle = {
  color: Colors.TEXT_GREY,
  fontSize: "1.4em",
  textAlign: "center",
};

export default WhoWeAre;
