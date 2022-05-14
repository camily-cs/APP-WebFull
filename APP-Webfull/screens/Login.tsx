import * as React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { estilo } from '../css/estilo';
import { servidor } from '../config/Caminho';


//variavel global
let us = "";
let sh = "";
let resultado : any = [];


export default function Login({navigation}) {

    //estados inicial dos input
    const [usuario, setUsuario] = React.useState("");
    const [senha, setSenha] = React.useState("");

    return (
        <View style={estilo.container}>
            <Image source={require ("../assets/icon.png")} style={estilo.imglogo}/>

            <View style={estilo.controles}>
                <TextInput placeholder="Usuario" style={estilo.input} value={usuario} onChangeText={(value)=>setUsuario(value)}/>

                <TextInput placeholder="Senha" style={estilo.input} secureTextEntry value={senha} onChangeText={(value)=>setSenha(value)}/>
                
                {/* btnlogin */}
                <TouchableOpacity style={estilo.btnlogar} onPress={()=>{

                    //passando os dados para a variavel global
                    us = usuario;
                    sh = senha;
                    let retorno = efetuarLogin();

                    
                    //enviando o cliente e os dados(logado, payload, token) para a tela Home:
                    if(retorno[0] == "Logado"){
                        navigation.navigate("Home", {dados:retorno});
                    }  
                }}>
                    <Text style={estilo.txtbtnlogar}>Logar</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={estilo.btncadastrar} onPress={()=>{
                navigation.navigate("Cadastro");
            }}>
                    <Text  style={estilo.txtbtncadastrar}>Cadastre-se</Text>
                </TouchableOpacity>

        </View>
    );
}

//Pegando dados do banco de dados 
function efetuarLogin(){
    fetch(`${servidor}/login`, {
        method: "POST",
        headers:{
            accept: "application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            usuario:us,
            senha:sh
        })
    })
    //pegando a resposta e convertendo para json
    .then((response)=>response.json())

    //mostrando as respostas(msg, payload e token) 
    .then((rs)=>{
        //console.log(rs);
        resultado[0] = rs.msg;
        resultado[1] = rs.payload;
        resultado[2] = rs.token;
    })
    //tratamento de erro
    .catch((erro)=>console.error(`Erro ao tentar buscar a API. ${erro}`))

    return resultado;
};