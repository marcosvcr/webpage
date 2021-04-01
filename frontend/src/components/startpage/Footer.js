import React, { Component } from "react";
import { Header, Image, Segment } from "semantic-ui-react";
import Colors from "../../utilities/Colors";
import Strings from "../../utilities/Strings";

export class Footer extends Component {
  render() {
    return (
      <Segment style={footerStyle} vertical textAlign="center" padded>
        <Header as="h4" style={textStyle}>
          <Image src="logo512.png" size="small" />
          {Strings.FOOTER_TEXT}
        </Header>
        <p style={{ textAlign: "center" }}>
          Algumas das ilustrações utilizadas neste site foram criadas por{" "}
          <a href="https://stories.freepik.com/people">Freepik Stories.</a>
        </p>
      </Segment>
    );
  }
}

const footerStyle = {
  width: "100%",
};

const textStyle = {
  color: Colors.TEXT_GREY,
};

export default Footer;
