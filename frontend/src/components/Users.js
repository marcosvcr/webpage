import React, { Component } from "react";
import { List, Container, Pagination, Header, Icon } from "semantic-ui-react";
import Strings from "../utilities/Strings";
import Constants from "../utilities/Constants";
import Utils from "../utilities/Utils";
import Colors from "../utilities/Colors";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import MainMenuBar from "./MainMenuBar";

let UtilsInstance = new Utils();

export class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
      allUsers: [],
      currentPage: 1,
      notFoundHeaderStyle: {
        display: "none",
      },
    };
  }

  retrieveData = () => {
    fetch(Constants.ENDPOINT + "requestUSERList", { mode: "cors" })
      .then(UtilsInstance.checkStatus)
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            currentUsers: data.sort(
              UtilsInstance.sortBy("name", false, function (a) {
                return UtilsInstance.treatUppercase(a);
              })
            ),
            allUsers: data.sort(
              UtilsInstance.sortBy("name", false, function (a) {
                return UtilsInstance.treatUppercase(a);
              })
            ),
          },
          () => {
            this.buildAndRenderPagination(this.state.currentUsers.length);
            this.buildAndRenderActivePage(this.state.currentPage);
          }
        );
      });
  };

  makeListItem = (user) => {
    return (
      <List.Item
        key={user.cpf}
        style={listItemStyle}
        onClick={() => {
          this.handleListItemClick(user.cpf);
        }}
      >
        <List.Content>
          <List.Header style={listTextStyle} content={user.name} />
          {this.makeListConfirmDescription(user.confirmed)}
        </List.Content>
      </List.Item>
    );
  };

  makeListConfirmDescription = (confirmed) => {
    if (confirmed === "false") {
      return (
        <List.Description style={{ color: "#db2828" }}>
          <span style={notConfirmedSpanStyle}>{Strings.NOT_CONFIRMED}</span>
          <Icon name="times circle" color="red" />
        </List.Description>
      );
    } else {
      return (
        <List.Description>
          <span style={confirmedSpanStyle}>{Strings.CONFIRMED}</span>
          <Icon name="check circle" color="green" />
        </List.Description>
      );
    }
  };

  handleListItemClick = (cpf) => {
    // Remove os caracteres especiais do CPF
    let userID = cpf.replace(/\./g, "");
    userID = userID.replace(/-/g, "");
    userID = userID.replace(/\//g, "");

    this.props.history.push({ pathname: "/user", state: { userID: userID } });
  };

  // ---- PAGINATION ----
  buildAndRenderPagination = (numOfUsers) => {
    // Retire a paginação da tela se não existirem usuários
    if (numOfUsers === 0) {
      ReactDOM.render(
        <span></span>,
        document.getElementById("pagination-container")
      );
    } else {
      let numOfPages = Math.ceil(numOfUsers / Constants.MAX_USERS_PER_PAGE);
      let pagination = (
        <Pagination
          firstItem={null}
          lastItem={null}
          boundaryRange={1}
          defaultActivePage={this.state.currentPage}
          siblingRange={1}
          totalPages={numOfPages}
          onPageChange={this.handlePageChange}
        />
      );
      ReactDOM.render(
        pagination,
        document.getElementById("pagination-container")
      );
    }
  };

  buildAndRenderActivePage = (activePageNumber) => {
    let listBeginMultiplier = 10;
    let listEndMultiplier = 9;
    // Multiples of 10 (starting with 0)
    let listBeg = (activePageNumber - 1) * listBeginMultiplier;
    // Multiples of 9
    let listEnd = listBeg + listEndMultiplier;
    let listToShow = [];

    for (let i = listBeg; i <= listEnd; i++) {
      // If the list size has not been reached yet
      if (i < this.state.allUsers.length) {
        listToShow.push(this.state.allUsers[i]);
      }
      // If the list element === undefined
      else {
        break;
      }
    }

    this.setState({ currentUsers: listToShow });
  };

  handlePageChange = (e, { activePage }) => {
    this.setState({ currentPage: activePage }, () => {
      this.buildAndRenderActivePage(this.state.currentPage);
    });
  };

  // ---- Component Lifecycles -----
  componentDidMount() {
    this.retrieveData();
  }

  render() {
    let listItems = this.state.currentUsers.map((user) =>
      this.makeListItem(user)
    );

    return (
      <div style={divStyle}>
        <MainMenuBar />
        <Container style={containerStyle}>
          <Header as="h1" style={headerTextStyle} textAlign="center">
            Pessoas físicas
          </Header>
          <Header
            style={this.state.notFoundHeaderStyle}
            as="h3"
            icon
            textAlign="center"
          >
            <Icon name="frown outline" style={notFoundStyle} />
            <Header.Subheader style={notFoundStyle}>
              {Strings.NO_ONG_WITH_THAT_FILTER}
            </Header.Subheader>
          </Header>
          <List
            style={listStyle}
            animated
            selection
            verticalAlign="middle"
            items={listItems}
          />
          <div id="pagination-container" style={paginationStyle}></div>
        </Container>
      </div>
    );
  }
}

const divStyle = {
  height: "100vh",
};

const containerStyle = {
  padding: "4vh 0vw",
}

const listStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  overflowY: "auto",
  height: "67vh",
};

const listItemStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "1.5vh 1vw",
  marginBottom: "1vh",
};

const paginationStyle = {
  margin: "0 auto",
  textAlign: "center",
};

const notFoundStyle = {
  color: Colors.TEXT_GREY,
};

const headerTextStyle = {
  color: Colors.MAIN_TEAL,
};

const listTextStyle = {
  color: Colors.TEXT_GREY,
};

const confirmedSpanStyle = {
  color: "#21ba45",
  marginRight: "4px",
};

const notConfirmedSpanStyle = {
  color: "#db2828",
  marginRight: "4px",
};

export default withRouter(Users);
