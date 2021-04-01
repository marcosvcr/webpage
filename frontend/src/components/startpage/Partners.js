import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Image, Header, Container } from "semantic-ui-react";
import Colors from "../../utilities/Colors";
import Strings from "../../utilities/Strings";

export class Partners extends Component {
  render() {
    return (
      <Container id="partners" style={containerStyle} text>
        <Header style={mainHeaderTextStyle}>{Strings.PARTNERS}</Header>
        <Carousel
          style={carouselStyle}
          nextIcon={
            <span
              style={controlsStyle}
              aria-hidden="true"
              className="carousel-control-next-icon"
            />
          }
          prevIcon={
            <span
              style={controlsStyle}
              aria-hidden="true"
              className="carousel-control-prev-icon"
            />
          }
        >
          <Carousel.Item>
            <Image
              src="/sucao-logo.png"
              size="medium"
              centered
              href="http://www.sucao.com.br/home-ong/"
              target="_blank"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

const containerStyle = {
  textAlign: "center",
  margin: "8vh 2vw",
};

const mainHeaderTextStyle = {
  fontSize: "2em",
  color: Colors.TEXT_GREY,
};

const carouselStyle = {
  paddingTop: "2vh",
  paddingBottom: "4vh",
};

const controlsStyle = {
  filter: "invert(100%)",
};

export default Partners;
