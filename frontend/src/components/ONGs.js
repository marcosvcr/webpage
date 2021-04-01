import React, { Component } from "react";
import {
  List,
  Image,
  Container,
  Pagination,
  Dropdown,
  Header,
  Icon,
} from "semantic-ui-react";
import Strings from "../utilities/Strings";
import Constants from "../utilities/Constants";
import Utils from "../utilities/Utils";
import Colors from "../utilities/Colors";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import MainMenuBar from "./MainMenuBar";

let UtilsInstance = new Utils();

export class ONGs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOngs: [],
      currentOngs: [],
      allOngs: [],
      currentPage: 1,
      notFoundHeaderStyle: {
        display: "none",
      },
      selectedCause: "",
      selectedHelpType: "",
    };

    this.retrieveData = this.retrieveData.bind(this);
  }

  async retrieveData() {
    fetch(Constants.ENDPOINT + "requestONGList", { mode: "cors" })
      .then(UtilsInstance.checkStatus)
      .then((res) => res.json())
      .then((data) => {
        // Adicione o atributo de imagem
        for (let i = 0; i < data.length; i++) {
          data[i].image = "./imagem-indisponivel.png";
        }
        this.setState(
          {
            currentOngs: data.sort(
              UtilsInstance.sortBy("fantasyName", false, function (a) {
                return UtilsInstance.treatUppercase(a);
              })
            ),
            allOngs: data.sort(
              UtilsInstance.sortBy("fantasyName", false, function (a) {
                return UtilsInstance.treatUppercase(a);
              })
            ),
          },
          async () => {
            // Já faz a paginação assim que der
            this.buildAndRenderPagination(this.state.currentOngs.length);
            this.buildAndRenderActivePage(this.state.currentPage);

            // Request das imagens
            for (let i = 0; i < this.state.allOngs.length; i++) {
              let imgPOSTData = JSON.stringify({
                idImage: this.state.allOngs[i].cnpj,
                thumbnail: 1,
              });

              let image = await fetch(
                Constants.ENDPOINT + "requestImageProfile",
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: imgPOSTData,
                }
              )
                .then((response) => response.blob())
                .then((images) => {
                  if (images.type !== "application/json") {
                    return URL.createObjectURL(images);
                  } else {
                    return "./imagem-indisponivel.png";
                  }
                });

              this.state.allOngs[i].image = image;

              if (i < this.state.pageOngs.length) {
                this.state.pageOngs[i].image = image;
              }
            }

            this.buildAndRenderPagination(this.state.currentOngs.length);
            this.buildAndRenderActivePage(this.state.currentPage);
          }
        );
      });
  }

  makeListItem = (ong) => {
    return (
      <List.Item
        key={ong.cnpj}
        style={listItemStyle}
        onClick={() => {
          this.handleListItemClick(ong.cnpj);
        }}
      >
        <Image src={ong.image} rounded width="48px" height="48px" />
        <List.Content style={{ marginLeft: "0.5vw" }}>
          <List.Header
            style={{ color: Colors.MAIN_TEAL }}
            content={ong.fantasyName}
          />
          {this.makeListConfirmDescription(ong.confirmed)}
        </List.Content>
      </List.Item>
    );
  };

  makeListImage(ong) {
    if (ong.image !== "") {
      return <Image src={ong.image} rounded width="48px" height="48px" />;
    } else {
      return (
        <Image
          src="./imagem-indisponivel.png"
          rounded
          width="48px"
          height="48px"
        />
      );
    }
  }

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

  handleListItemClick = (cnpj) => {
    // Remove os caracteres especiais do CNPJ
    let ongID = cnpj.replace(/\./g, "");
    ongID = ongID.replace(/-/g, "");
    ongID = ongID.replace(/\//g, "");
    console.log(ongID);

    this.props.history.push({ pathname: "/ong", state: { ongID: ongID } });
  };

  // ---- PAGINATION ----
  buildAndRenderPagination = (numOfOngs) => {
    // Retire a paginação da tela se não existirem ONGs
    if (numOfOngs === 0) {
      ReactDOM.render(
        <span></span>,
        document.getElementById("pagination-container")
      );
    } else {
      let numOfPages = Math.ceil(numOfOngs / Constants.MAX_ONGS_PER_PAGE);
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
    let listBeginMultiplier = 6;
    let listEndMultiplier = 5;
    // Multiples of 6 (starting with 0)
    let listBeg = (activePageNumber - 1) * listBeginMultiplier;
    // Multiples of 5
    let listEnd = listBeg + listEndMultiplier;
    let listToShow = [];

    for (let i = listBeg; i <= listEnd; i++) {
      // If the list size has not been reached yet
      if (i < this.state.currentOngs.length) {
        listToShow.push(this.state.currentOngs[i]);
      }
      // If the list element === undefined
      else {
        break;
      }
    }

    this.setState({ pageOngs: listToShow });
  };

  handlePageChange = (e, { activePage }) => {
    this.setState({ currentPage: activePage }, () => {
      this.buildAndRenderActivePage(this.state.currentPage);
    });
  };

  // ---- DROPDOWN CLICK ----
  handleCausesDropdownChange = (event, { value }) => {
    this.setState({ selectedCause: value }, () => {
      // Se limpou o filtro de causa
      if (value === "") {
        // Se o filtro de tipo de ajuda está ativo, filtre só por ele agora
        if (this.state.selectedHelpType !== "") {
          let filteredOngsList = [];

          // Procure ONGs que correspondem ao filtro de tipo de ajuda
          for (let i = 0; i < this.state.allOngs.length; i++) {
            for (let j = 0; j < this.state.allOngs[i].helpType.length; j++) {
              if (
                this.state.allOngs[i].helpType[j] ===
                this.state.selectedHelpType
              ) {
                filteredOngsList.push(this.state.allOngs[i]);
                break;
              }
            }
          }

          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              this.buildAndRenderActivePage(this.state.currentPage);
            }
          );
        }
        // Se o filtro de tipo de ajuda não está ativo, mostre todas as ONGs
        else {
          this.setState(
            {
              currentPage: 1,
              currentOngs: this.state.allOngs,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              this.buildAndRenderActivePage(this.state.currentPage);
            }
          );
        }
      }
      // Se escolheu uma causa
      else {
        let filteredOngsList = [];

        for (let i = 0; i < this.state.allOngs.length; i++) {
          let alreadyInserted = false;
          // Procure ONGs que correspondem ao filtro de causas selecionado
          for (let j = 0; j < this.state.allOngs[i].causes.length; j++) {
            if (this.state.allOngs[i].causes[j] === value) {
              filteredOngsList.push(this.state.allOngs[i]);
              alreadyInserted = true;
              break;
            }
          }

          // Se o filtro de tipo de ajuda também está selecionado verifique ele também
          // Mas apenas se a ong já não foi escolhida por causa da causa
          if (this.state.selectedHelpType !== "" && !alreadyInserted) {
            for (let j = 0; j < this.state.allOngs[i].helpType.length; j++) {
              if (
                this.state.allOngs[i].helpType[j] ===
                this.state.selectedHelpType
              ) {
                filteredOngsList.push(this.state.allOngs[i]);
                break;
              }
            }
          }
        }

        // Se não encontrou nenhuma ONG, avise o usuário
        if (filteredOngsList.length === 0) {
          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "block",
                marginTop: "10vh",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              // Nesse caso não precisa criar a ActivePage
            }
          );
        }
        // Se encontrou, mostre a lista de ONGs filtrada
        else {
          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderActivePage(this.state.currentPage);
              this.buildAndRenderPagination(this.state.currentOngs.length);
            }
          );
        }
      }
    });
  };

  handleHelpTypeDropdownChange = (event, { value }) => {
    this.setState({ selectedHelpType: value }, () => {
      // Se limpou o filtro de tipo de ajuda
      if (value === "") {
        // Se o filtro de causa está ativo, filtre só por ele agora
        if (this.state.selectedCause !== "") {
          let filteredOngsList = [];

          // Procure ONGs que correspondem ao filtro de causa
          for (let i = 0; i < this.state.allOngs.length; i++) {
            // Comece pesquisando na lista de causas
            for (let j = 0; j < this.state.allOngs[i].causes.length; j++) {
              if (
                this.state.allOngs[i].causes[j] === this.state.selectedCause
              ) {
                filteredOngsList.push(this.state.allOngs[i]);
                break;
              }
            }
          }

          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              this.buildAndRenderActivePage(this.state.currentPage);
            }
          );
        }
        // Se o filtro de causa não está ativo, mostre todas as ONGs
        else {
          this.setState(
            {
              currentPage: 1,
              currentOngs: this.state.allOngs,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              this.buildAndRenderActivePage(this.state.currentPage);
            }
          );
        }
      }
      // Se escolheu um tipo de ajuda
      else {
        let filteredOngsList = [];

        for (let i = 0; i < this.state.allOngs.length; i++) {
          let alreadyInserted = false;
          // Procure ONGs que correspondem ao filtro de tipo de ajuda selecionado
          for (let j = 0; j < this.state.allOngs[i].helpType.length; j++) {
            if (this.state.allOngs[i].helpType[j] === value) {
              filteredOngsList.push(this.state.allOngs[i]);
              alreadyInserted = true;
              break;
            }
          }

          // Se o filtro de causa também está selecionado verifique ele também
          // Mas apenas se a ong já não foi escolhida por causa do tipo de ajuda
          if (this.state.selectedCause !== "" && !alreadyInserted) {
            for (let j = 0; j < this.state.allOngs[i].causes.length; j++) {
              if (
                this.state.allOngs[i].causes[j] === this.state.selectedCause
              ) {
                filteredOngsList.push(this.state.allOngs[i]);
                break;
              }
            }
          }
        }

        // Se não encontrou nenhuma ONG, avise o usuário
        if (filteredOngsList.length === 0) {
          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "block",
                marginTop: "10vh",
              },
            },
            () => {
              this.buildAndRenderPagination(this.state.currentOngs.length);
              // Nesse caso não precisa criar a ActivePage
            }
          );
        }
        // Se encontrou, mostre a lista de ONGs filtrada
        else {
          this.setState(
            {
              currentPage: 1,
              currentOngs: filteredOngsList,
              notFoundHeaderStyle: {
                display: "none",
              },
            },
            () => {
              this.buildAndRenderActivePage(this.state.currentPage);
              this.buildAndRenderPagination(this.state.currentOngs.length);
            }
          );
        }
      }
    });
  };

  // ---- Component Lifecycles -----
  componentDidMount() {
    this.retrieveData();
  }

  render() {
    let listItems = this.state.pageOngs.map((ong) => {
      return this.makeListItem(ong);
    });

    return (
      <div style={divStyle}>
        <MainMenuBar />
        <Container style={containerStyle}>
          <Dropdown
            style={causesAndHelpDropdownStyle}
            placeholder={Strings.FILTER_BY_CAUSE}
            labeled
            scrolling
            clearable
            selection
            search
            options={causesList}
            onChange={this.handleCausesDropdownChange}
          />

          <Dropdown
            style={causesAndHelpDropdownStyle}
            placeholder={Strings.FILTER_BY_HELP}
            labeled
            scrolling
            clearable
            selection
            search
            options={helpList}
            onChange={this.handleHelpTypeDropdownChange}
          />

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
};

const causesAndHelpDropdownStyle = {
  marginTop: "0.5vh",
  marginBottom: "0.5vh",
  marginRight: "0.5vw",
};

const listStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  overflowY: "auto",
  height: "67vh",
};

const listItemStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  paddingLeft: "1vw",
  marginBottom: "1vh",
};

const paginationStyle = {
  margin: "0 auto",
  textAlign: "center",
};

const notFoundStyle = {
  color: Colors.TEXT_GREY,
};

const causesAndHelpList = [
  { key: "animals", text: "Animais", value: "animals", icon: "paw" },
  { key: "women", text: "Mulheres", value: "women", icon: "woman" },
  { key: "children", text: "Crianças", value: "children", icon: "child" },
  { key: "elderlies", text: "Idosos", value: "elderlies", icon: "users" },
  {
    key: "humanRights",
    text: "Direitos humanos",
    value: "humanRights",
    icon: "hand spock",
  },
  { key: "health", text: "Saúde", value: "health", icon: "heartbeat" },
  {
    key: "environment",
    text: "Meio ambiente",
    value: "environment",
    icon: "tree",
  },
  {
    key: "education",
    text: "Educação",
    value: "education",
    icon: "graduation",
  },
  { key: "culture", text: "Cultura", value: "culture", icon: "discussions" },
  {
    key: "pne",
    text: "Portadores de necessidades especiais",
    value: "pne",
    icon: "wheelchair",
  },
  { key: "money", text: "Dinheiro", value: "money", icon: "dollar" },
  { key: "time", text: "Tempo", value: "time", icon: "hourglass half" },
  { key: "blood", text: "Sangue", value: "blood", icon: "tint" },
  { key: "clothes", text: "Vestuário", value: "clothes", icon: "user secret" },
  { key: "furniture", text: "Móveis", value: "furniture", icon: "bed" },
  {
    key: "householdAppl",
    text: "Eletrodomésticos",
    value: "householdAppl",
    icon: "plug",
  },
  {
    key: "electronics",
    text: "Eletrônicos",
    value: "electronics",
    icon: "computer",
  },
  { key: "food", text: "Alimentos", value: "food", icon: "food" },
  { key: "books", text: "Livros", value: "books", icon: "book" },
  { key: "toys", text: "Brinquedos", value: "toys", icon: "gamepad" },
  { key: "hygiene", text: "Higiene", value: "hygiene", icon: "shower" },
  { key: "others", text: "Outros", value: "others", icon: "discussions" },
];

const causesList = [
  { key: "animals", text: "Animais", value: "animals", icon: "paw" },
  { key: "women", text: "Mulheres", value: "women", icon: "woman" },
  { key: "children", text: "Crianças", value: "children", icon: "child" },
  { key: "elderlies", text: "Idosos", value: "elderlies", icon: "users" },
  {
    key: "humanRights",
    text: "Direitos humanos",
    value: "humanRights",
    icon: "hand spock",
  },
  { key: "health", text: "Saúde", value: "health", icon: "heartbeat" },
  {
    key: "environment",
    text: "Meio ambiente",
    value: "environment",
    icon: "tree",
  },
  {
    key: "education",
    text: "Educação",
    value: "education",
    icon: "graduation",
  },
  { key: "culture", text: "Cultura", value: "culture", icon: "discussions" },
  {
    key: "pne",
    text: "Portadores de necessidades especiais",
    value: "pne",
    icon: "wheelchair",
  },
];

const helpList = [
  { key: "money", text: "Dinheiro", value: "money", icon: "dollar" },
  { key: "time", text: "Tempo", value: "time", icon: "hourglass half" },
  { key: "blood", text: "Sangue", value: "blood", icon: "tint" },
  { key: "clothes", text: "Vestuário", value: "clothes", icon: "user secret" },
  { key: "furniture", text: "Móveis", value: "furniture", icon: "bed" },
  {
    key: "householdAppl",
    text: "Eletrodomésticos",
    value: "householdAppl",
    icon: "plug",
  },
  {
    key: "electronics",
    text: "Eletrônicos",
    value: "electronics",
    icon: "computer",
  },
  { key: "food", text: "Alimentos", value: "food", icon: "food" },
  { key: "books", text: "Livros", value: "books", icon: "book" },
  { key: "toys", text: "Brinquedos", value: "toys", icon: "gamepad" },
  { key: "hygiene", text: "Higiene", value: "hygiene", icon: "shower" },
  { key: "others", text: "Outros", value: "others", icon: "discussions" },
];

const confirmedSpanStyle = {
  color: "#21ba45",
  marginRight: "4px",
};

const notConfirmedSpanStyle = {
  color: "#db2828",
  marginRight: "4px",
};

export default withRouter(ONGs);
