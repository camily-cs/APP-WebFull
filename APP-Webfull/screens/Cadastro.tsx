import * as React from 'react'
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, KeyboardType } from 'react-native' 
import { servidor } from '../config/Caminho';
import { estilo } from '../css/estilo';

//variaveis para guardar dados cadastrais do cliente
let nome = "";
let email = "";
let cpf = "";
let usuario = "";
let senha = "";


export default function Cadastro(){

    //criando estado inicial dos input
    const[nomeCliente, setNomeCliente] = React.useState("");
    const[emailCliente, setEmailCliente] = React.useState("");
    const[cpfCliente, setCPFCliente] = React.useState("");
    const[usuarioCliente, setUsuarioCliente] = React.useState("");
    const[senhaCliente, setSenhaCliente] = React.useState("");

    return (
    <View style={estilo.cadfundo}>
        <View style={estilo.form}>
            <TextInput placeholder="Nome" style={estilo.input} value={nomeCliente} onChangeText={(value)=>setNomeCliente(value)}/>

            <TextInput placeholder="E-mail" keyboardType="email-address" style={estilo.input} value={emailCliente} onChangeText={(value)=>setEmailCliente(value)}/>

            <TextInput placeholder="CPF" keyboardType="number-pad" style={estilo.input} value={cpfCliente} onChangeText={(value)=>setCPFCliente(value)}/>

            <TextInput placeholder="Usuario" style={estilo.input} value={usuarioCliente} onChangeText={(value)=>setUsuarioCliente(value)}/>

            <TextInput placeholder="Senha" secureTextEntry style={estilo.input} value={senhaCliente} onChangeText={(value)=>setSenhaCliente(value)}/>

            <TouchableOpacity style={estilo.btncadastrar} onPress={()=>{

                //passando os dados do formulario para a variavel global
                nome = nomeCliente;
                email = emailCliente;
                cpf = cpfCliente;
                usuario = usuarioCliente;
                senha = senhaCliente;

                //chamando a funcao
                efetuarCadastro();

                //limpando os dados que estao no formulario inserindo novamente o estado inicial dos input
                setNomeCliente("");
                setEmailCliente("");
                setCPFCliente("");
                setUsuarioCliente("");
                setSenhaCliente("");
            }}>


                <Text style={estilo.txtbtncadastrar}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
     </View>
    );
}


{/* Pegando dados do banco de dados */}
function efetuarCadastro(){
    //fetch-busca de dados
    fetch(`${servidor}/cadastro`,{
        method:"POST",
        headers:{
            accept:"application/json",
            "content-type":"application/json"
        },
        //nomenatabeladb:variaveldoformulario
        body:JSON.stringify({
            nome:nome,
            email:email,
            cpf:cpf,
            usuario:usuario,
            senha:senha
        })
    //pegando a resposta e convertendo para json
    }).then((response)=>response.json())
    //colocando a resposta em json na variavel resultado e exibindo para o cliente em um alert
    .then((resultado)=>{
        Alert.alert("Aviso", resultado.msg);
       console.log(resultado)
    //tratamento de erro
    }).catch((erro)=>console.error(`Erro ao executar. ${erro}`))


    //testando se os dados estao vindo para a funcao
    console.log(`${nome} - ${email} - ${cpf} - ${usuario} - ${senha}`)
};
