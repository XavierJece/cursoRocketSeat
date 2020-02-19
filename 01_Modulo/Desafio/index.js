const express = require('express');

const server = express();
let countRequisitions = 0;

// Middlewares
server.use(express.json());

function idExists(req, res, next){
    const {id} = req.params;

    projects.forEach(project => {
        if(project.id === id){
            next();
        }
    });

    return res.status(400).json({message: "Id not Fount"});
}

function idTitleCorrect(req, res, next){
    const {id, title} = req.body;
    
    if(typeof id !== 'string'){
        return res.status(400).json({message: "Id error"});
    }else if(typeof title !== 'string'){
        return res.status(400).json({message: "Title error"});
    }
    next();
}


server.use((req, res,next) => {
    countRequisitions = countRequisitions + 1;
    console.log(countRequisitions + "ª Requisition");
    next();
});



//Base de dados
projects = [
    {
        "id": "1",
        "title": "Projeto 1",
        "tasks": ["Tec 1", "Tec 2"]
    },
    {
        "id": "2",
        "title": "Projeto 2",
        "tasks": []
    },
];

// routes
server.get('/', (req, res) =>{
    return res.json({desafio: "1"});
});

server.post('/projects', idTitleCorrect, (req, res) => {
    const {id, title} = req.body;

    project = {id, title, "tasks": []};
    projects.push(project);

    return res.json(project);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', idExists, (req, res) => {
    const {id} = req.params 
    const {title} = req.body;

    projects.forEach(project => {
        if(project.id === id){
            project.title = title;
            return res.json(project);
        }
    });
});

server.delete('/projects/:id', idExists, (req, res) => {
    const {id} = req.params;
    let index = 0;

    projects.forEach(project => {
        if(project.id === id){
            projects.splice(index, 1);
            return res.send();
        }
        index = index + 1
    });
});

server.post('/projects/:id/tasks', idExists, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    
    projects.forEach(project => {
        if(project.id === id){
            project.tasks.push(title);
            return res.send(project);
        }
    });
    
});



// Starting server in port 3000
server.listen(3000);