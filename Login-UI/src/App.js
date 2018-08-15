import React from "react";

import Titles from "./components/Titles";

import Form from "./components/Form";

import Message from "./components/Message";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      error: undefined
    };
  }

  signIn = async (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const user = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`);
    const data = await user.json();
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
  };

  signUp = async (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const stringy = JSON.stringify({"username":username,"password":password});
    const user = await fetch(`http://localhost:8080/signup`, {
      method: 'POST',
      body: stringy,
      headers: {
          'Content-Type': 'application/json'
      }
    });
    const data =  await user.json();
      if(username){
          if(data){
              this.setState({
                  error: "User has been created!"
              });
          }else{
              this.setState({
                  error: "User already exists."
              });
          }
      } else{
          this.setState ({
              error: "Please enter a Username"
          });
      }
  };

  updateUsername = (event) =>{
    this.setState({
      username: event.target.value
    });
  };
  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  render(){
      return (
          <div>
              <Titles />
              <Form
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                username={this.username}
                password={this.password}
                signIn={this.signIn}
                signUp={this.signUp}/>
              <Message
                error={this.state.error} />
          </div>
      );
  }
}

export default App;
