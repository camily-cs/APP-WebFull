/* Construcao de um servidor usando o modulo express, que executa e manipula o servidor node */


/* importando Mongoose: */
const  mongoose  = require("mongoose");
/* importando o modulo bcrypt para criptografia de senhas: */
const bcrypt = require("bcrypt");
/* importando o modulo do hash jsonwebtoken para criar seções seguras e privadas em um projeto. 
o jwt é gerado atraves de alguns elementos*/
const jwt = require("jsonwebtoken");
/* importando config.js */
const cfn = require("./config");

/* conectando ao banco de dados */
const url="mongodb+srv://camilycruz:ylimac2003@clustercliente.athp4.mongodb.net/primeiraapi?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})



/*  criando estrutura da tabela clientes com o comando de Schema */
const tabela = mongoose.Schema({
    nome:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    cpf:{type:String, required:true, unique:true},
    usuario:{type:String, required:true, unique:true},
    senha:{type:String, required:true}
});

//Aplicacao da criptografia do bcrypt na tabela de cadastro de clientes sera feita antes do salvamento dos dados do cliente
tabela.pre("save", function(next){
    let cliente = this;
    if(!cliente.isModified('senha')) return next()
    bcrypt.hash(cliente.senha, 10, (erro,rs)=>{
        if(erro) return console.log(`Erro ao gerar a senha ${erro}`);
        cliente.senha = rs;
        return next();
    })
})

/* execucao da tabela */
const Cliente = mongoose.model("tbcliente", tabela);

//importando o cors:
const cors = require("cors");
/* importando o modulo express: */
const express = require("express");
//importando arquivo config.js
const config = require("./config");
/* referencia do servidor express: */
const app = express();
/* Preparando o servidor express receber e tratar dados no formato json: */
app.use(express.json());
app.use(cors());




/* Rotas para os verbos GET, POST, PUT, DELETE: 
        REQ-request 
        RES-response*/

/* GET-LISTAR TODOS OS CLIENTES */
/* find-localizar */
app.get("/api/cliente/", jwtverificacao, (req,res)=>{
    /* res.send("Você está na rota do verbo GET"); */

    Cliente.find((erro,dados)=>{
        if(erro){
            return res.status(400).send({msg:`Erro ao tentar listar os clientes " ${erro}"`})
        }
        res.status(200).send({msg:dados});
    }
    );
});


/* GET-LISTAR UM CLIENTE */
app.get("/api/cliente/:id",(req,res)=>{
    Cliente.find(req.params.id,(erro,dados)=>{
        if(erro){
            return res.status(400).send({msg:`Erro ao tentar listar os clientes " ${erro}"`})
        }
        res.status(200).send({msg:dados});
    }
    );
});



/* POST-CADASTRAR */
app.post("/api/cliente/cadastro",(req,res)=>{
    //mostrando os dados cadastrados pelo cliente:
    /* res.send(`Os dados enviados foram ${req.body.nome}`); */

    //criando var cliente
    const cliente = new Cliente(req.body);
    //salvando cliente e retornando statuscode 201
    cliente.save().then(()=>{
        const gerado = criaToken(req.body.usuario,req.body.nome)
        res.status(201).send({msg:`Cliente cadastrado com sucesso`, tokenGerado:gerado});
    })
    //tratamento de erro
    /* .catch((erro)=>res.status(400).send({msg:`Erro ao tentar cadastrar cliente : ${erro}`})) */
    .catch((erro)=>res.status(400).send({msg:`Erro ao tentar cadastrar`, msgErro:erro}))
});



/* POST-LOGIN */
//payload:dados importantes exibidos para o usuario
app.post("/api/cliente/login",(req,res)=>{
    //criando var p usuario e senha
    const us = req.body.usuario;
    const sh = req.body.senha;

    //procurando usuario
    Cliente.findOne({usuario:us},(erro,dados)=>{
        //caso nao encontre o usuario
        if(erro){
            return res.status(400).send({msg:`Usuario não encontrado : ${erro}`});
        }
        //caso usuario e senha estejam certo
        /* if(dados.senha == sh){
            return res.status(200).send({msg:`Logado`,payload:dados});
        } */

        //comparando a senha digitada pelo cliente com a senha criptografada ja salva no db
        bcrypt.compare(sh,dados.senha,(erro,igual)=>{
            //em caso de erro
            if(erro) return res.status(400).send({msg:`Erro ao tentar logar : ${erro}`});
            //caso as senhas nao sejam iguais
            if(!igual) return res.status(400).send({msg:`Erro ao tentar logar : ${erro}`});

            const gerado = criaToken(dados.usuario,dados.nome);
            res.status(200).send({msg:`Logado`, payload:dados, token:gerado});
        })
        /* res.status(400).send({msg:`Senha incorreta. Tente novamente`}); */
    });
});


/* PUT-ATUALIZAR */
app.put("/api/cliente/atualizar/:id", jwtverificacao, (req,res)=>{
    /* res.send(`O id passado foi ${req.params.id} e os dados para atualizar são ${req.body}`); */

    Cliente.findByIdAndUpdate(req.params.id, req.body,(erro,dados)=>{
        if(erro){
            return res.status(400).send({msg:`Erro ao tentar atualizar ${erro}`});
        }
        res.status(200).send({msg:`Dados atualizados`});
    })
});



/* DELETE-APAGAR*/
app.delete("/api/cliente/apagar/:id", jwtverificacao, (req,res)=>{
   /*  res.send(`O id passado foi ${req.params.id}`); */

   Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
       if(erro){
           return res.status(400).send({msg:`Erro ao tentar apagar cliente ${erro}`})
       }
       res.status(204).send({msg:"Cliente deletado com sucesso"});
   });
});



/* GET-GERAR TOKEN */
//expiresIn-tempo de expiração
const criaToken=(usuario, nome)=>{
    return jwt.sign({usuario:usuario,nome:nome},  cfn.jwtkey, {expiresIn:cfn.jwtexpires});
};


//GET-VERIFICACAO DO TOKEN
function jwtverificacao (req,res,next){
    const tokenGerado = req.headers.token;
    if(!tokenGerado){
        return res.status(401).send({msg:`Não há token`})
    }
    /* verificando se o token e valido */
    jwt.verify(tokenGerado, cfn.jwtkey, (erro,dados)=>{
        if(erro){
            return res.status(401).send({msg:`Token inválido`});
        }
        /* res.status(200).send({msg:`Autorizado`, payload:`Olá, ${dados.nome}`}); */
        next();
    });
};

/* Porta de comunicacao para o servidor: 3000 */
app.listen(3000,()=>console.log("Servidor online"));0