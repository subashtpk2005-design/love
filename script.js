// Floating hearts animation
setInterval(()=>{
  let heart=document.createElement("div");
  heart.className="heart";
  heart.innerHTML="❤️";

  heart.style.left=Math.random()*100+"%";
  heart.style.animationDuration=(3+Math.random()*3)+"s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  },6000);

},400);

const quiz = [
{
question: "Nammaloda Love Ennakki start akichu❤️?",
answers: ["Jan 20", "Feb 12", "Jan 28", "Maranthutu"],
correct: "Jan 28"
},
{
question: "Namma 1st time meet pannum pothu naan enna vangi kuduthen onakku😊",
answers: ["Teddy", "Chocolate", "onnum vangitharla", "Maranthutu"],
correct: "Chocolate"
},
{
question: "En Thangathukku Birthdaykku Enna Gift venum?",
answers: ["Chocolate", "Teddy", "Onnum ventam", "Jimikki"],
correct: "Teddy"
},
{
question: "Onakku pudichathu yaru😁 ?",
answers: ["Unga Appa", "Meee", "Unga Chellam", "Unga Partner"],
correct: "Meee"
},
{
question: "Enna Marriage Pannipala?",
answers: ["Yes", "No", "Pappom"],
correct: "Yes"
}
];

let current=0;
let score=0;

function loadQuestion(){
document.getElementById("question").innerText=quiz[current].question;

let answerBox=document.getElementById("answers");
answerBox.innerHTML="";

quiz[current].answers.forEach(ans=>{
let btn=document.createElement("button");
btn.innerText=ans;

btn.onclick=()=>{
if(ans===quiz[current].correct){
score++;
document.getElementById("score").innerText=score;
}

current++;

if(current<quiz.length) loadQuestion();
else showResult();
};

answerBox.appendChild(btn);
});
}

function showResult(){
document.querySelector(".quiz-box").innerHTML=
`<h2>❤️ I Love You ❤️</h2>
<p>நீ தான் என் வாழ்க்கை 💕</p>`;
}

loadQuestion();
