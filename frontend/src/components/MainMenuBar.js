import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Icon } from "semantic-ui-react";
import Colors from "../utilities/Colors";

export class MainMenuBar extends Component {
  handleLogoutClick = () => {
    // Faz os rolezinho de deslogar e manda pra página inicial
    this.props.history.push({ pathname: "/" });
  };

  render() {
    return (
      <Navbar
        style={menuStyle}
        collapseOnSelect
        variant="dark"
        className="justify-content-end"
      >
        <Nav.Item>
          <Icon
            name="power off"
            link
            size="large"
            style={iconStyle}
            onClick={() => {
              this.handleLogoutClick();
            }}
          />
        </Nav.Item>
      </Navbar>
    );
  }
}

const menuStyle = {
  padding: "2vh 2vw",
  width: "100%",
  fontSize: "1.1em",
  fontWeight: "bold",
  backgroundColor: Colors.MAIN_TEAL,
};

const iconStyle = {
  color: "white",
};

export default withRouter(MainMenuBar);
