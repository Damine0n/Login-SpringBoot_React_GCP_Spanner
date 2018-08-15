import React from "react";

class Form extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <form>
        <input type="text" name="username" placeholder="Username" onChange={this.props.updateUsername} value={this.props.username}/>
        <input type="password" name="password" placeholder="Password" onChange={this.props.updatePassword} value={this.props.password}/>
        <br/><button name="submit" value="Sign-in" onClick={this.props.signIn}>Sign-in</button>
        <br/><button name="submit" value="Sign-up" onClick={this.props.signUp}>Sign-up</button>
      </form>
    );
  }
}

export default Form;
