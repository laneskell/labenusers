import React from "react";
import styled from "styled-components";
import CreateUser from "./components/CreateUser";
import Registration from "./components/Registration";

export default class App extends React.Component {
  state = {
    users: [],
    inputValue: "",
    inputValueEmail: "",
    screen: "CreateUser"
  };

  backToCreateUser = () => {
    this.setState({ screen: "CreateUser" });
  };

  goToRegistration = () => {
    this.setState({ screen: "Registration" });
  };

  render() {
    const renderizaTelaCorreta = () => {
      switch (this.state.screen) {
        case "CreateUser":
          return <CreateUser />;

        case "Registration":
          return <Registration />;
        default:
          return <div>Erro! Página não encontrada</div>;
      }
    };
    return (
      <AppContainer className="App">
        <BtnSuper onClick={this.goToRegistration}>
          Registro de Usúarios
        </BtnSuper>
        <BtnSuper onClick={this.backToCreateUser}>Voltar </BtnSuper>
        {renderizaTelaCorreta()}
      </AppContainer>
    );
  }
}

// CSS STYLED COMPONENTS
const AppContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 6%;
`;
const BtnSuper = styled.button`
  display: flex;
  background-color: #498574;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  justify-content: center;
`;
