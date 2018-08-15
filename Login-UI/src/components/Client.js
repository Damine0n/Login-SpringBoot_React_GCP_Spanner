export default class Client{
  login(){
    let result = new Promise((resolve,reject)=>{
      let request = new XMLHttpRequest();
      request.open("GET","http://localhost:8080/login");
      request.onreadystatechange = () =>{
        let raw = request.responseText;
        let objectified = JSON.parse(raw);
        resolve(objectified);
      }
      request.send();
    });
    return result;
  }
}
