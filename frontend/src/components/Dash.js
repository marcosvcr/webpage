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

export class Dash extends Component {
  handleClick = (page) => {
    switch (page) {
      case "phys":
        this.props.history.push({ pathname: "/users" });
        break;
      case "ong":
        this.props.history.push({ pathname: "/ongs" });
        break;
      case "statistics":
        console.log("statistics");
        break;
      default:
        console.log("nada");
        break;
    }
  };

  render() {
    return (
      <div>
        <MainMenuBar />

        <Container text>
          <Divider horizontal style={dividerStyle}>
            <Header as="h2" textAlign="center" style={headerStyle}>
              {Strings.DASHBOARD}
            </Header>
          </Divider>

          <Grid columns={2} doubling stackable centered>
            <Grid.Row>
              <Grid.Column stretched>
                <Button basic onClick={() => this.handleClick("phys")}>
                  <Header
                    as="h2"
                    dividing
                    textAlign="center"
                    content={Strings.PHYS_PERSON}
                    style={physHeaderStyle}
                  />
                  <Image
                    src="./pessoa-fisica-dashboard.png"
                    size="small"
                    centered
                  />
                </Button>
              </Grid.Column>
              <Grid.Column stretched>
                <Button basic onClick={() => this.handleClick("ong")}>
                  <Header
                    as="h2"
                    dividing
                    textAlign="center"
                    content={Strings.ONG}
                    style={ongHeaderStyle}
                  />
                  <Image src="./ong-dashboard.png" size="small" centered />
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column stretched>
                <Button basic onClick={() => this.handleClick("statistics")}>
                  <Header
                    as="h2"
                    dividing
                    textAlign="center"
                    content="Estatísticas"
                    style={statisticsHeaderStyle}
                  />
                  <Image
                    src="./estatisticas-dashboard.png"
                    size="small"
                    centered
                  />
                </Button>
              </Grid.Column>
              <Grid.Column stretched></Grid.Column>
            </Grid.Row>
          </Grid>
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

export default withRouter(Dash);
