import React, { Component } from "react";
import { Image, Grid, Header, Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Strings from "../../utilities/Strings";
import Colors from "../../utilities/Colors";

export class LandingContent extends Component {
  constructor(props) {
    super(props);
    this.handlePhysPreSignupClick = this.handlePhysPreSignupClick.bind(this);
    this.handleONGPreSignupClick = this.handleONGPreSignupClick.bind(this);
  }

  handlePhysPreSignupClick() {
    this.props.history.push({ pathname: "/pre-cadastro-doador" });
  }

  handleONGPreSignupClick() {
    this.props.history.push({ pathname: "/pre-cadastro-ong" });
  }

  render() {
    return (
      <Grid
        id="pre-register"
        style={gridStyle}
        centered
        columns={2}
        doubling
        stackable
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column textAlign="center" width="7">
            <Header style={headerTextStyle} content={Strings.WELCOME_TO_DOAR} />
            <Header
              style={subheaderTextStyle}
              content={Strings.WELCOME_TO_DOAR_2}
            />
            <Header
              style={subheaderTextStyle}
              content={Strings.PRE_SIGNUP_AVAILABLE}
            />
            <Form>
              <Form.Button
                size="big"
                style={buttonStyle}
                onClick={this.handlePhysPreSignupClick}
              >
                {Strings.PHYS_SIGNUP_BUTTON}
              </Form.Button>
              <Form.Button
                size="big"
                style={buttonStyle}
                onClick={this.handleONGPreSignupClick}
              >
                {Strings.ONG_BUTTON}
              </Form.Button>
            </Form>
          </Grid.Column>

          <Grid.Column width="9">
            <Image src="/main-image.png" size="massive" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const gridStyle = {
  margin: "8vh 8vw",
};

const headerTextStyle = {
  fontSize: "3em",
  color: Colors.MAIN_TEAL,
};

const subheaderTextStyle = {
  fontSize: "1.5em",
  color: Colors.TEXT_GREY,
};

const buttonStyle = {
  color: "white",
  backgroundColor: Colors.MAIN_TEAL,
};

export default withRouter(LandingContent);
