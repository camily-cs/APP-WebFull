//Escondendo a chave secreta "chavesecreta"
const cfn = ()=>{
    return{
        //chave do token
        jwtkey:"chavesecreta",
        jwtexpires:"2d"
    }   
}
module.exports = cfn();