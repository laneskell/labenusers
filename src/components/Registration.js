import React from "react";
import axios from "axios";
import styled from "styled-components";

export default class Registration extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users ",
        {
          headers: {
            Authorization: "kethreen-lanes-cruz"
          }
        }
      )
      .then((res) => {
        this.setState({ users: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

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
  render() {
    const allUsers = this.state.users.map((users) => (
      <RegisterList key={users.id}>
        {users.name}{" "}
        <button type="button" onClick={() => this.buttonDelUser(users)}>
          Delete
        </button>
      </RegisterList>
    ));

    return (
      <PageRegistration>
        <RegisterUser>{allUsers}</RegisterUser>
      </PageRegistration>
    );
  }
}
// CSS STYLED COMPONENTS
const PageRegistration = styled.div`
  background-color: #d7f5ec;
`;
const RegisterList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: 3%;
`;
const RegisterUser = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;
