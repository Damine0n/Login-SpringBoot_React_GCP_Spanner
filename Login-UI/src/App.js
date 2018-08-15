import React from "react";

import Titles from "./components/Titles";

import Form from "./components/Form";

import Weather from "./components/Weather";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      error: undefined
    };
    this.updateLogin=this.updateLogin.bind(this);
    //this.getLoginInfo=this.getLoginInfo.bind(this);
  }


  updateLogin(u, p) {
    console.log(u+p);
    this.setState({
      username: u,
      password: p
    });
  }
  signIn = async (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    const username = this.state.username;
    const password = this.state.password;
    console.log(`htrd`+username);
    console.log(password);
    if ("" === "Sign-in"){
      console.log(`htrd ${username}`);
      console.log(password);
      const user = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`);
      console.log(user);
      const data = await user.json();
      console.log(data);
      if(username){
        if(data){
          this.setState({
            error: "I have logged in!"
          });
        }else{
          this.setState({
            error: "Login information is incorrect."
          });
        }
      } else{
        this.setState ({
          error: "Please enter a Username"
        });
      }
    }
  }

  signUp = async (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    console.log(username);
    console.log(password);
    const stringy = JSON.stringify({"username":username,"password":password});
    const user = await fetch(`http://localhost:8080/signup`, {
      method: 'POST',
      body: stringy,
      headers: {
          'Content-Type': 'application/json'
      }
    });
    const data =  await user.json();
    console.log(data);
  }

  updateUsername = (event) =>{
    this.setState({
      username: event.target.value
    });
  }
  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  handleLogin = (event) =>  {
    event.preventDefault();
    this.props.setLogin(this.state.username,this.state.password);
    this.props.getLoginInfo();
  }

  render(){
      return (
          <div>
              <Titles />
              <Form
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                signIn={this.signIn}
                signUp={this.signUp}/>
              <Weather
                error={this.state.error} />
          </div>
      );
  }
}

export default App;
