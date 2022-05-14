import * as React from 'react';
import { View,Text, ScrollView, Image, TouchableOpacity } from 'react-native' ;
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { servidor } from '../config/Caminho';
import { estilo } from '../css/estilo';
import Atualizar from './Atualizar';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigationContainerRef } from '@react-navigation/native';



const Stack = createNativeStackNavigator();
let rs = ""

 export default function Home({route}){

    const {dados} = route.params;
    rs = dados[2];

    return(
    /* empilhamento independente */
     <NavigationContainer independent={true}> 
         <Stack.Navigator>
             <Stack.Screen name="Clientes" component={TelaHome}></Stack.Screen>
             <Stack.Screen name="Atualizar" component={Atualizar}></Stack.Screen>
         </Stack.Navigator>
     </NavigationContainer>
 )}




function TelaHome({navigation}){

    console.log(`Dados na tela Home. ${rs}`);

    //lista de clientes
    const [lstClientes, setLstClientes] = React.useState([]);

    

    //validacao de token
    React.useEffect(()=>{
        //buscando dados no servidor
        fetch(`${servidor}`, {
            method: "GET",
            headers:{
                accept: "application/json",
                "content-type" : "application/json",
                "token": rs
            }
        })

        //pegando a resposta e convertendo para json
        .then((response)=>response.json())
        .then((result)=>{
            //mostrando a resposta na tela de console
            console.log(result)
            setLstClientes(result.msg);
        })

        //tratamento de erro
        .catch((erro)=>console.error(`Erro ao ler a API. ${erro}`))
    },[])
    
    return(
    <View style={estilo.container}>
        {/* scrollview - rolagem */}
        <ScrollView horizontal = {false} style={estilo.scrollview}>
            <Image source={require("../assets/imgClientes.jpg")} style={estilo.imgCliente}/>

            <View>
                { lstClientes.map((item,index)=>(

                    <View style={estilo.cliente} key={index}> 
                        <Text style={estilo.nome}>{item.nome} </Text>
                        <Text style={estilo.cpf}>CPF:  {item.cpf} </Text>
                        <Text style={estilo.email}>EMAIL:  {item.email} </Text>
                        <Text style={estilo.usuario}>USUARIO:  {item.usuario} </Text>
                        {/* btn que envia para a tela ATUALIZAR os dados do cliente e o token */}
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Atualizar", {cliente: item, token:rs});
                        }}>
                            <AntDesign name="edit" size={24} color="black" style={estilo.iconEdit} />
                        </TouchableOpacity>
                    </View>
                ))
                }
            </View>
        </ScrollView>
    </View>
    );
}