import { StyleSheet } from "react-native";

export const estilo=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e0ffff'
    },
    
    imglogo:{
        width:100,
        height:100,
        resizeMode:"cover",
        borderRadius:80,
        elevation:50
    },

    input:{
        borderBottomColor:'#ddd',
        borderBottomWidth: 1,
        padding:5,
        marginBottom:10,
        fontSize:15
    }, 

    controles:{
        width:'80%',
        padding:10,
        margin:20,
        shadowColor:'black',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.8,
        shadowRadius:10,
        elevation:50,
        backgroundColor:'white'
    },

    btnlogar:{
        padding:30,

    },
    
    txtbtnlogar:{
        textAlign:'center',
        color:'teal',
        fontWeight:'bold'
    },

    btncadastrar:{
        /* position:"relative", */
        bottom:30,
        backgroundColor:'#00221c',
        padding:12,
        borderRadius:50,
        marginTop:70,
        elevation:50

    },

    txtbtncadastrar:{
        textAlign: 'center',
        fontSize:14,
        fontWeight:'bold',
        color:'white',
        textTransform:'uppercase'
    },
        
    cadfundo:{
        backgroundColor:"#e0ffff",
        flex:1
    },

    form:{
        marginTop: 120,
        margin:10,
        padding:15,
        backgroundColor: 'white',
        shadowColor:'black',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.8,
        shadowRadius:10,
        elevation:50,
    },



    //Tela home
    scrollview:{
        width:"100%"
    },

    imgCliente:{
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },

    cliente:{
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "black", //sombra
        shadowOffset:{width:10,height:10}, //largura e altura da sombra
        shadowOpacity:1, //opacidade da sombra
        /* elevation: 50, */
        marginBottom: 5
    },

    nome:{
        fontSize: 20,
        fontWeight: "bold",
        color: "teal",
    },

    cpf:{
        fontSize: 13,
        color: "#00221c",
        fontWeight: "bold"
    },

    email:{
        fontSize: 13,
        color: "#00221c",
        fontWeight: "bold"
    },

    usuario:{
        fontSize: 13,
        color: "#00221c",
        fontWeight: "bold"
    },

    iconEdit:{
        marginLeft: "90%"
    },

    titulo:{
        fontSize:20,
        fontWeight: "bold",
        color: "teal",
        marginTop: -220
    },

    

    //Tela atualizar
    formAtualizar:{
        width: 290,
        height: 170,
        marginTop: -120,
        margin:10,
        padding:15,
        backgroundColor: 'white',
        shadowColor:'black',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.8,
        shadowRadius:10,
        elevation:50
        },

    btnAtualizar:{
        marginTop:10,
        marginLeft:"35%",
    },

    txtAtualizar:{
        fontSize: 15,
        color:"teal",
        marginLeft: "2%",
        fontWeight: "bold"
    },

    iconApagar:{
        textAlign:"center"
    },


    btnApagar:{
        backgroundColor: "white",
        textAlign:"center",
        padding:20,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'red'
    },

    txtbtnapagar:{
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold"
    },  
});