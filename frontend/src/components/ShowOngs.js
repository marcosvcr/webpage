import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Accordion,
  Icon,
  Container,
  Header,
  Segment,
  Image,
  Grid,
  Label,
  Button,
} from "semantic-ui-react";
import MainMenuBar from "./MainMenuBar";
import Constants from "../utilities/Constants";
import Strings from "../utilities/Strings";
import Colors from "../utilities/Colors";
import Utils from "../utilities/Utils";

let UtilsInstance = new Utils();

export class ShowOngs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ongs: [],
      activeIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.getONGs = this.getONGs.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  getAccordionElement(index, element) {
    return (
      <React.Fragment>
        <Accordion.Title
          active={this.state.activeIndex === index}
          index={index}
          onClick={this.handleClick}
        >
          <p>
            <Icon name="dropdown" />
            <span>ONG: {element.social}</span>
          </p>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === index}>
          <p>CNPJ: {element.cnpj}</p>
          <p>Razão Social: {element.social}</p>
          <p>Endereço: {element.address}</p>
          <p>Número: {element.num}</p>
          <p>Complemento: {element.compl}</p>
          <p>CEP: {element.cep}</p>
          <p>Cidade: {element.city}</p>
          <p>Estado: {element.brState}</p>
          <p>Telefone: {element.tel}</p>
          <p>Email: {element.email}</p>
          <p>Descrição: {element.desc}</p>
          <p>Causas:</p>
          <ul>
            {element.causes.map((cause) => (
              <li>{cause}</li>
            ))}
          </ul>
          <p>Tipos de ajuda:</p>
          <ul>
            {element.helpType.map((type) => (
              <li>{type}</li>
            ))}
          </ul>
          <p>Imagem: </p>
        </Accordion.Content>
      </React.Fragment>
    );
  }

  getONGs() {
    fetch(Constants.ENDPOINT + "/ongs", { mode: "cors" })
      .then(UtilsInstance.checkStatus)
      .then((res) => res.json())
      .then((data) => this.setState({ ongs: data }));
  }

  handleClickOng() {
    this.props.history.push({ pathname: "/ong" });
  }

  componentDidMount() {
    this.getONGs();
  }

  getOng() {
    return (
      <Grid.Column>
        <Segment>
          <Grid columns={2} centered divided verticalAlign="middle">
            <Grid.Row textAlign="left">
              <Grid.Column width={6} verticalAlign="middle">
                <Image src="./dog-image.jpg" size="large" />
              </Grid.Column>
              <Grid.Column width={10}>
                <p style={ongNameStyle}>{Strings.PLACEHOLDER_ONG_NAME}</p>
                <p>
                  <span style={subtextTitle}>{Strings.SUPPORT_DP}</span>
                  <Label
                    horizontal
                    size="large"
                    style={Colors.animalsLabelStyle}
                    content="Animais"
                  />
                </p>
                <p>
                  <span style={subtextTitle}>{Strings.RATING_DP}</span>
                  4.8
                  <Icon name="star" color="yellow" />
                </p>
                <Button size="tiny" color="teal" onClick={this.handleClickOng}>
                  Visualizar
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    );
  }

  getGridRow() {
    return (
      <Grid.Row columns={3}>
        {this.getOng()}
        {this.getOng()}
        {this.getOng()}
      </Grid.Row>
    );
  }

  render() {

    /*
    let ongs = this.state.ongs.map((ong) => {
      counter++;
      return this.getAccordionElement(counter, ong);
    });
*/

    // Vai ter que ter outra barra de menu aqui pro usuário
    // lista com todas as ONGs cadastradas
    return (
      <div>
        <MainMenuBar />
        <div style={divStyle}>
          <Container style={containerStyle}>
            <Header as="h3">
              Buscando por: <span style={searchTermStyle}>Animais</span>
            </Header>
            <p>Montrando ONGs que possuem relação com o termo Animais</p>
            <Grid doubling stackable>
              {this.getGridRow()}
              {this.getGridRow()}
              {this.getGridRow()}
            </Grid>
          </Container>

          <p>Ajuda recebida</p>
          <Label
            horizontal
            size="large"
            style={Colors.moneyLabelStyle}
            content="Dinheiro"
            icon="dollar"
          />
          <Label
            horizontal
            size="large"
            style={Colors.timeLabelStyle}
            content="Tempo"
            icon="hourglass half"
          />
          <Label
            horizontal
            size="large"
            style={Colors.bloodLabelStyle}
            content="Sangue"
            icon="tint"
          />
          <Label
            horizontal
            size="large"
            style={Colors.clothesLabelStyle}
            content="Vestuário"
            icon="user secret"
          />
          <Label
            horizontal
            size="large"
            style={Colors.furnitureLabelStyle}
            content="Móveis"
            icon="bed"
          />
          <Label
            horizontal
            size="large"
            style={Colors.electLabelStyle}
            content="Eletrodomésticos"
            icon="plug"
          />
          <Label
            horizontal
            size="large"
            style={Colors.electronicsLabelStyle}
            content="Eletrônicos"
            icon="computer"
          />
          <Label
            horizontal
            size="large"
            style={Colors.foodLabelStyle}
            content="Alimentos"
            icon="food"
          />
          <Label
            horizontal
            size="large"
            style={Colors.booksLabelStyle}
            content="Livros"
            icon="book"
          />
          <Label
            horizontal
            size="large"
            style={Colors.toysLabelStyle}
            content="Brinquedos"
            icon="gamepad"
          />
          <Label
            horizontal
            size="large"
            style={Colors.hygieneLabelStyle}
            content="Higiene"
            icon="shower"
          />
          <Label
            horizontal
            size="large"
            style={Colors.othersLabelStyle}
            content="Outros"
            icon="discussions"
          />

          <p>Causas que apoia</p>

          <Label
            horizontal
            size="large"
            style={Colors.animalsLabelStyle}
            content="Animais"
            icon="paw"
          />
          <Label
            horizontal
            size="large"
            style={Colors.womenLabelStyle}
            content="Mulheres"
            icon="woman"
          />
          <Label
            horizontal
            size="large"
            style={Colors.childrenLabelStyle}
            content="Crianças"
            icon="child"
          />
          <Label
            horizontal
            size="large"
            style={Colors.elderlyLabelStyle}
            content="Idosos"
            icon="users"
          />
          <Label
            horizontal
            size="large"
            style={Colors.humanRightsLabelStyle}
            content="Direitos Humanos"
            icon="hand spock"
          />
          <Label
            horizontal
            size="large"
            style={Colors.healthLabelStyle}
            content="Saúde"
            icon="heartbeat"
          />
          <Label
            horizontal
            size="large"
            style={Colors.environmentLabelStyle}
            content="Meio ambiente"
            icon="tree"
          />
          <Label
            horizontal
            size="large"
            style={Colors.educationLabelStyle}
            content="Educação"
            icon="graduation"
          />
          <Label
            horizontal
            size="large"
            style={Colors.cultureLabelStyle}
            content="Cultura"
            icon="discussions"
          />
          <Label
            horizontal
            size="large"
            style={Colors.pneLabelStyle}
            content="PNE"
            icon="wheelchair"
          />
        </div>
      </div>
    );
  }
}

const divStyle = {
  height: "91.8vh",
};

const containerStyle = {
  //height: "91.8vh",
  //backgroundColor: "white",
  marginTop: "4vh",
};

const ongNameStyle = {
  fontSize: "1.1em",
  color: Colors.TEXT_GREY,
  fontWeight: "bold",
};

const subtextTitle = {
  color: Colors.TEXT_GREY,
  fontWeight: "bold",
};

const searchTermStyle = {
  color: Colors.MAIN_TEAL,
};

/*
            <Header>ONGs</Header>
            <Accordion fluid styled>
              {ongs}
            </Accordion>
*/

export default withRouter(ShowOngs);
