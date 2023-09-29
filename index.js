import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = process.env.PORT;

const options = {  year: 'numeric', month: 'short', day: 'numeric' };
var currentDate =  new Date().toLocaleDateString('en-US', options);

//create arrays for tasks
var todayList = [];
var workList = [];

//add function to add the notes to the array
function addNotes(list, noteToBeAdded){
    list.push(noteToBeAdded);
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, ()=>{
    console.log(`Running at port ${port}`);
})

app.get("/", (req, res) =>{
    res.render("index.ejs", {currentDate: currentDate, todayList:todayList});

});

app.get("/worklist", (req, res) =>{
    res.render("work-list.ejs", {workList: workList});

});

//submit req from today list
app.post("/submit", (req, res)=>{
   
    addNotes(todayList, req.body["to-do"]);
    res.render("index.ejs", {currentDate: currentDate, todayList : todayList});
});

//submit req from work list

app.post("/submitwork", (req, res)=>{ 
    addNotes(workList, req.body["work-to-do"]);
    res.render("work-list.ejs", {workList : workList});
    
});






