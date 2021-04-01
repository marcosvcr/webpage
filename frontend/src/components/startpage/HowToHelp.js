import React, { Component } from "react";
import { Header, Grid, Image, Container, Segment } from "semantic-ui-react";
import Strings from "../../utilities/Strings";
import Colors from "../../utilities/Colors";

export class HowToHelp extends Component {
  render() {
    return (
      <div id="how-to-help" style={divStyle}>
        <Container text>
          <Header style={mainHeaderTextStyle} textAlign="center">
            {Strings.HOW_TO_HELP}
          </Header>
          <p style={normalTextStyle}>{Strings.HOW_TO_HELP_DESCRIPTION}</p>
        </Container>
        <Grid columns={3} centered doubling stackable>
          <Grid.Row stretched>
            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="trabalho-voluntario-am.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.VOLUNTEER_WORK}
                  </Header>
                  <p style={normalTextStyle}>{Strings.VOLUNTER_WORK_DESC}</p>
                </Container>
              </Segment>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="doar-dinheiro-am.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.MONETARY_HELP}
                  </Header>
                  <p style={normalTextStyle}>{Strings.MONETARY_HELP_DESC}</p>
                </Container>
              </Segment>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <Segment>
                <Container>
                  <Image
                    src="doar-objetos-am.png"
                    size="large"
                    circular
                    centered
                  />
                  <Header style={subHeaderTextStyle}>
                    {Strings.OBJECT_DONATION}
                  </Header>
                  <p style={normalTextStyle}>{Strings.OBJECT_DONATION_DESC}</p>
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
  color: Colors.MAIN_YELLOW,
};

const subHeaderTextStyle = {
  fontSize: "2.5em",
  color: Colors.MAIN_YELLOW,
};

const normalTextStyle = {
  fontSize: "1.4em",
  marginBottom: "4vh",
  color: Colors.TEXT_GREY,
};

export default HowToHelp;
