import React from "react";
import axios from "axios";
import styled from "styled-components";

export default class CreateUser extends React.Component {
  state = {
    users: [],
    inputValue: "",
    inputValueEmail: "",
    screen: "CreateUser"
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  handleInputChangeEmail = (e) => {
    this.setState({ inputValueEmail: e.target.value });
  };

  /* Função para criar usuário no banco*/
  createUser = () => {
    const body = {
      name: this.state.inputValue,
      email: this.state.inputValueEmail
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        body,
        {
          headers: {
            Authorization: "kethreen-lanes-cruz"
          }
        }
      )
      .then((res) => {
        alert("Usuário cadastrado com sucesso!");
        this.setState({ inputValue: "" });
        this.setState({ inputValueEmail: "" });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  /* Função para deletar usuário do banco*/
  buttonDelUser = (users) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluír ${users.name} da lista de usuários?`
      )
    ) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${users.id}`,
          {
            headers: {
              Authorization: "kethreen-lanes-cruz"
            }
          }
        )
        .then((res) => {
          alert("Usuário Excluído!");
          this.getAllUsers();
        })
        .catch((err) => {
          alert(err.response.data.message, "Tente novamente!");
        });
    }
  };
  /* Adicionando uma função para funcionar com enter além do click */
  onKeyPressEnter = (event) => {
    if (event.key === "Enter") {
      this.createUser();
    }
  };

  render() {
    return (
      <div>
        <PageLogin className="CreateUser">
          <input
            placeholder={"Nome do usuario"}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <input
            placeholder={"e-mail do usuario"}
            value={this.state.inputValueEmail}
            onChange={this.handleInputChangeEmail}
            onKeyDown={this.onKeyPressEnter}
          />
          <button onClick={this.createUser}>Criar Usuario</button>
        </PageLogin>
      </div>
    );
  }
}

// CSS STYLED COMPONENTS
const PageLogin = styled.div`
  width: 300px;
  height: 120px;
  background-color: #added0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 10px;
`;
