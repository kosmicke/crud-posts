import React from "react";
import authService from "../../services/auth.service";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Iniciando o state com os valores dos campos vazios
    this.state = {
      userName: "",
      password: "",
    };
  }

  // Função responsável por realizar o login
  async sendLogin(event) {
    event.preventDefault();

    const data = {
      nickName: this.state.userName,
      password: this.state.password,
    };

    if (!data.nickName || data.nickName == "") {
      window.alert("Nome de usuário é obrigatório");
      return;
    }

    if (!data.password || data.password == "") {
      window.alert("Senha é obrigatória");
      return;
    }

    try {
      let res = await authService.sendLogin(data);
      authService.setLoggedUser(res.data.data);
      this.props.onLogin();
      this.props.history.replace("/");
    } catch (error) {
      window.alert("Não foi possível efetuar o login.");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={(e) => this.sendLogin(e)}>
              <div className="form-group">
                <label htmlFor="userName">Nome de usuário</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Insira seu nome de usuário"
                  value={this.state.userName}
                  onChange={(e) => this.setState({ userName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Insira sua senha"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
