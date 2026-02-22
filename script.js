let selectedCorrect = 0;
let current=0;
let score=0;

// ❤️ Floating hearts animation
setInterval(()=>{
  let heart=document.createElement("div");
  heart.className="heart";
  heart.innerHTML="❤️";

  heart.style.left=Math.random()*100+"%";
  heart.style.animationDuration=(3+Math.random()*3)+"s";

  document.querySelector(".hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
},400);


// ❤️ HEART BURST
function heartBurst(x,y){
  for(let i=0;i<6;i++){
    let h=document.createElement("div");
    h.className="burst";
    h.innerHTML="❤️";
    h.style.left=x+"px";
    h.style.top=y+"px";

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1000);
  }
}


// 🎉 CONFETTI
function showConfetti(){
  for(let i=0;i<30;i++){
    let c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;

    document.body.appendChild(c);
    setTimeout(()=>c.remove(),1000);
  }
}


// ❤️ LOVE PROGRESS BAR
function updateLoveBar(){
  let percent=(score/quiz.length)*100;
  document.getElementById("loveBar").style.width=percent+"%";
}


// QUIZ DATA
const quiz=[
{
question:"Nammaloda Love Ennakki start akichu❤️?",
answers:[
{ text:"Jan 20", msg:"❌ Ooo Ithuva" },
{ text:"Feb 12", msg:" 😡Maranthutingala Madam!" },
{ text:"sep 26", msg:"😍 Parava illa niyabagam Vachirukinga ❤️", correct:true },
{ text:"Maranthutu", msg:"😡 Nerla va onakku irukku👊👊👊!" }
]
},
{
question:"Namma 1st time meet pannum pothu naan enna vangi kuduthen onakku😊",
answers:[
{ text:"Teddy", msg:"Ithuvaa thanthen😒" },
{ text:"Chocolate", msg:"🍫 Yes correct!", correct:true },
{ text:"onnum vangitharla", msg:" Apdiya enta annaiki yaru vanguna😾?" },
{ text:"Maranthutu", msg:"😤 Yosichu paru" }
]
},
{
question:"En Thangathukku Birthdaykku Enna Gift venum 🎁?",
multi:true,
answers:[
{ text:"Chocolate", msg:"🍫 OK Notted Select 1 more",correct:true },
{ text:"Teddy", msg:"🧸 OK Notted Select 1 more", correct:true },
{ text:"Onnum ventam", msg:"😒 Olunga select pannu!" },
{ text:"Jimikki", msg:"🎁 OK Notted Select 1 more",correct:true }
]
},
{
question:"Onakku pudichathu yaru😁 ?",
answers:[
{ text:"Unga Appa", msg:"Ithu Therinjathu Than" },
{ text:"Meee", msg:"Unga Chellamum Pakathula Irukangala😅", correct:true },
{ text:"Unga Chellam", msg:"Nenachennn😁" },
{ text:"Unga Partner", msg:"Guess pannathu than" }
]
}
];


// LOAD QUESTION
function loadQuestion(){

selectedCorrect=0;

let countBox=document.getElementById("multiCount");

if(quiz[current].multi){
let totalCorrect=quiz[current].answers.filter(a=>a.correct).length;
countBox.style.display="block";
countBox.innerText=`Selected: 0 / ${totalCorrect}`;
}else{
countBox.style.display="none";
}

document.getElementById("question").innerText=quiz[current].question;

let answerBox=document.getElementById("answers");
answerBox.innerHTML="";

quiz[current].answers.forEach(ans=>{
let btn=document.createElement("button");
btn.innerText=ans.text;

if(quiz[current].multi) btn.classList.add("multi-btn");

btn.onclick=(e)=>handleAnswer(btn,ans,e);
answerBox.appendChild(btn);
});
}


// MESSAGE POPUP
function showMsg(text){
document.getElementById("msgText").innerText=text;
document.getElementById("msgBox").style.display="flex";
}

function closeMsg(){
document.getElementById("msgBox").style.display="none";

if(!quiz[current].multi){
nextQuestion();
}
}

// ✨ sparkle burst effect
function showSparkles(x,y){

for(let i=0;i<12;i++){

let s=document.createElement("div");
s.className="sparkle";

s.style.left=x+"px";
s.style.top=y+"px";

s.style.background=`hsl(${Math.random()*360},100%,70%)`;

document.body.appendChild(s);

setTimeout(()=>s.remove(),800);
}
}
// HANDLE ANSWER
function handleAnswer(btn,ans,e){

heartBurst(e.clientX,e.clientY);
document.getElementById("clickSound").play();

// ⭐ MULTI SELECT
if(quiz[current].multi){

if(btn.disabled) return;
btn.disabled=true;

let totalCorrect=quiz[current].answers.filter(a=>a.correct).length;

if(ans.correct){

document.getElementById("correctSound").play();
showSparkles(e.clientX,e.clientY); // ⭐ ADD THIS
btn.classList.add("correct");

selectedCorrect++;

document.getElementById("multiCount").innerText=
`Selected: ${selectedCorrect} / ${totalCorrect}`;

showMsg(ans.msg);

setTimeout(()=>msgBox.style.display="none",800);

if(selectedCorrect===totalCorrect){
score++;
document.getElementById("score").innerText=score;
updateLoveBar();

showConfetti();

setTimeout(()=>{
nextQuestion();
},800);
}

}else{

document.getElementById("wrongSound").play();
btn.classList.add("wrong","shake");
shakeQuiz(); // ⭐ ADD THIS
showMsg(ans.msg);

}

return;
}


// ⭐ SINGLE QUESTION
let buttons=document.querySelectorAll("#answers button");
buttons.forEach(b=>b.disabled=true);

if(ans.correct){

document.getElementById("correctSound").play();
showSparkles(e.clientX,e.clientY); // ⭐ ADD THIS
btn.classList.add("correct");
score++;
document.getElementById("score").innerText=score;
updateLoveBar();

showConfetti();
setTimeout(()=>showMsg(ans.msg),300);

}else{

document.getElementById("wrongSound").play();

btn.classList.add("wrong","shake");
shakeQuiz(); // ⭐ ADD THIS
setTimeout(()=>showMsg(ans.msg),300);

}
}
// ❌ shake effect
function shakeQuiz(){
let box=document.querySelector(".quiz-box");

box.classList.add("shake");

setTimeout(()=>{
box.classList.remove("shake");
},400);
}

// NEXT QUESTION
function nextQuestion(){
current++;
if(current<quiz.length) loadQuestion();
else showResult();
}


// RESULT
function showResult(){
document.querySelector(".quiz-box").innerHTML=
`<h2>❤️ I Love You ❤️</h2>
<p>நீ தான் என் வாழ்க்கை 💕</p>
<h3>Final Score: ${score}</h3>`;
}

updateLoveBar();
loadQuestion();
