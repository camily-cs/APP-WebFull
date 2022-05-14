import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { estilo } from '../css/estilo';
import {servidor} from '../config/Caminho';
import { AntDesign } from '@expo/vector-icons';


//variaveis globais
let idCliente = "";
let nome = "";
let email = "";
let rsToken = "";

export default function Atualizar({route}){

    //Recebendo os dados do cliente  que esta vindo da tela HOME
    const {cliente} = route.params;
    /* console.log(`Tela atualizar ${cliente.cpf}`); */

    //Recebendo o token do cliente que esta vindo da tela HOME
    const {token} = route.params
    /* console.log(`Tela atualizar ${token}`); */

    //inserindo o token na var global rsToken
    rsToken = token;

    //estado inical do imput do formAtualizar
    const [nomeCliente,setNomeCliente] = React.useState(cliente.nome);
    const [emailCliente,setEmailCliente] =  React.useState(cliente.email)
    //_id=nome que o mongodb da para a coluna do id
    idCliente = cliente._id;

    return (
        <View style={estilo.container}>
            <View>
                <View style={estilo.formAtualizar}> 
                    {/* atualizar nome */}
                    <TextInput placeholder="Nome do cliente" style={estilo.input} value={nomeCliente} onChangeText={(value) => setNomeCliente(value)}></TextInput>
                    {/* atualizar email */}
                    <TextInput placeholder="E-Mail" keyboardType="email-address" style={estilo.input} value={emailCliente} onChangeText={(value) => setEmailCliente(value)}></TextInput>
                    <TouchableOpacity style={estilo.btnAtualizar} onPress={() => {
                        nome=nomeCliente,
                        email=emailCliente,
                        
                        efetuarAtualizacao();

                        setNomeCliente("");
                        setEmailCliente("");
                    }}>
                        <Text style={estilo.txtAtualizar}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* btn apagar cliente */}
            <TouchableOpacity style={estilo.btnApagar} onPress={() => {
                excluirUsuario();
            }}>
                <AntDesign style={estilo.iconApagar}  name="delete" size={24} color="black"/>
                <Text style={estilo.txtbtnapagar}>Excluir conta</Text>
                
            </TouchableOpacity>
        </View>
    );
}

//funcao para atualizar dados do usuario
function efetuarAtualizacao(){
    //buscando dados no servidor
    fetch(`${servidor}/atualizar/${idCliente}`,{
        method:'PUT',
        headers:{
            accept: 'application/json',
            'content-type':'application/json',
            "token": rsToken
        },
        body:JSON.stringify({
            nome:nome,
            email:email
        })
    })

    //pegando a resposta e convertendo para json
    .then((response) => response.json())
    .then((rs) =>{
        //mostrando a resposta na tela de console
       /*  console.log(rs); */
        Alert.alert("Atualização", rs.msg)
    })

    //tratamento de erro
    .catch((erro) => console.error(`Erro ao tentar ler a API. ${erro}`))
}


//funcao para excluir usuario
function excluirUsuario(){

    //Criando caixa de confirmacao para apagar usuario
    Alert.alert("Atenção", "Você realmente deseja excluir esta conta?", [
        {
            text: "Cancelar",
            onPress: () => {},
        },
        {
            text: "Excluir",
            onPress: ()  => {
                fetch(`${servidor}/apagar/${idCliente}`,{
                    method: "DELETE",
                    headers:{
                        accept: "application/json",
                        "content-type":"application/json",
                        "token": rsToken
                    }
                })
        
                .then((response) => response.status)
                .then ((dados) => {
                    if(dados.toString() == "204") {
                        Alert.alert("Apagado", "Conta excluida");
                    } 
                    else {
                        Alert.alert("Atenção", "Não foi possível excluir a conta");
                    }
                })
        
                .catch((erro) => console.log(`Erro ao ler a API.  ${erro}`));
            }
        }  
    ]);
}