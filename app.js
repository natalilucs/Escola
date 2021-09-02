var express = require("express"); 
var mongoose = require("mongoose"); 

const app = express(); 
const port = 3000; 

mongoose.connect("mongodb+srv://natali_lucas:natali_lucas@cluster0.pk7gr.mongodb.net/escola?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true}) //7 conectando o banco de dados, use... evita a depreciação do mongoose, são chamadas de flag e agem igual ao meta do html

const Professores = mongoose.model("professores", {
    nome: String,    
    materia: String,
    turma: String,
    periodo: String,
});


app.set("view engine", "ejs"); 
app.set("views", __dirname , "/views"); 
app.use(express.urlencoded());
app.use(express.json()); 


app.get("/", (req, res) => { 
    res.send("Página inicial");

});

app.get("/listarprofessores", (req, res)=>{ 
    let consulta = Professores.find({}, (err, elemento)=>{ // 16 - configurando para encontrar e retornar para a listagem
        console.log(consulta);
        if(err)
            return res.status(500).send("Erro ao consultar professor")
        res.render("listaprofessores", {lista_professores:elemento});
    }) 
    
});

//rota para reenderizar a pagina de formulario de cadastro
app.get("/cadastrarProfessor", (req, res)=>{
    res.render("formprofessor")
})

//metodo post para salvar os produtos no banco, através do name.
app.post("/cadastrarProfessor" , (req, res)=>{ //15 - método informado no formulario que servirá para guardar o formulario enviado 
    let professor = new Professores(); // criando um objeto do tipo Produtos que vem do const Produtos module.

    professor.nome = req.body.nome;     
    professor.materia = req.body.materia;
    professor.turma = req.body.turma;
    professor.periodo = req.body.periodo;
    
    
    professor.save((err) =>{
        if(err)
            return res.status(500).send("Erro ao efetuar o cadastro") // 500 erro do servidor
        return res.redirect("/listarprofessores");;

    })
})

//definindo a porta que irei acessar a minha aplicacao

app.listen(port, ()=> {
    console.log("Servidor rodando na porta " + port); //4ele faz a escuta e seleciona a porta para enviar o meu conteudo.
});

