import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Image } from "semantic-ui-react";
import Strings from "../utilities/Strings";

export class BootstrapMenuBar extends Component {
  constructor(props) {
    super(props);

    this.handleLogoImageClick = this.handleLogoImageClick.bind(this);
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
  }

  handleLogoImageClick() {
    this.props.history.push({ pathname: "/" });
  }

  handleLoginButtonClick() {
    this.props.history.push({ pathname: "/login" });
  }

  render() {
    return (
      <Navbar
        style={menuStyle}
        collapseOnSelect
        expand="lg"
        sticky="top"
        variant="light"
      >
        <Navbar.Brand>
          <Image
            href="#pre-register"
            onClick={this.handleLogoImageClick}
            alt={Strings.LOGO_ALT}
            src="/menu-logo-alt4.png"
            size="small"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {
              // Talvez tirar isso aqui
            }
          </Nav>
          <Nav>
            <Nav.Link href="#pre-register" onClick={this.handleLogoImageClick}>
              {Strings.PRE_REGISTER}
            </Nav.Link>
            <Nav.Link href="#who-we-are" onClick={this.handleLogoImageClick}>
              {Strings.ABOUT_US}
            </Nav.Link>
            <Nav.Link href="#how-to-help" onClick={this.handleLogoImageClick}>
              {Strings.HOW_TO_HELP}
            </Nav.Link>
            <Nav.Link
              href="#how-to-receive-help"
              onClick={this.handleLogoImageClick}
            >
              {Strings.HOW_TO_RECEIVE_HELP}
            </Nav.Link>
            <Nav.Link href="#partners" onClick={this.handleLogoImageClick}>
              {Strings.PARTNERS}
            </Nav.Link>
            <Form inline>
              <Button variant="info" onClick={this.handleLoginButtonClick}>
                {Strings.LOGIN}
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const menuStyle = {
  padding: "2vh 9vw",
  width: "100%",
  fontSize: "1.1em",
  fontWeight: "bold",
  backgroundColor: "white"
};

export default withRouter(BootstrapMenuBar);
