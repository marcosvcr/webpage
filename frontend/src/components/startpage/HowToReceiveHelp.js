import React, { Component } from "react";
import { Header, Grid, Image, Container, Segment } from "semantic-ui-react";
import Strings from "../../utilities/Strings";
import Colors from "../../utilities/Colors";

export class HowToReceiveHelp extends Component {
  render() {
    return (
      <div id="how-to-receive-help" style={divStyle}>
        <Container text>
          <Header style={mainHeaderTextStyle} textAlign="center">
            {Strings.HOW_TO_RECEIVE_HELP}
          </Header>
          <p style={normalTextStyle}>{Strings.WANT_TO_RECEIVE_HELP_STRING}</p>
        </Container>
        <Grid columns={3} centered doubling stackable stretched>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="cadastrar-rx.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.RECEIVE_HELP_REGISTER}
                  </Header>
                  <p style={normalTextStyle}>
                    {Strings.RECEIVE_HELP_REGISTER_DEC}
                  </p>
                </Container>
              </Segment>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="causas-apoia-rx.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.RECEIVE_HELP_CAUSES}
                  </Header>
                  <p style={normalTextStyle}>
                    {Strings.RECEIVE_HELP_CAUSES_DESC}
                  </p>
                </Container>
              </Segment>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="doacoes-aceita-rx.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.RECEIVE_HELP_DONATIONS}
                  </Header>
                  <p style={normalTextStyle}>
                    {Strings.RECEIVE_HELP_DONATIONS_DESC}
                  </p>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const divStyle = {
  textAlign: "center",
  margin: "4vh 8vw",
};

const mainHeaderTextStyle = {
  fontSize: "3em",
  color: Colors.MAIN_PURPLE,
};

const subHeaderTextStyle = {
  fontSize: "2.5em",
  color: Colors.MAIN_PURPLE,
};

const normalTextStyle = {
  fontSize: "1.4em",
  marginBottom: "4vh",
  color: Colors.TEXT_GREY,
};

export default HowToReceiveHelp;
