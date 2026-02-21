const quiz = [
  {
    question: "When did I first fall for you?",
    answers: ["Jan 20", "Feb 12", "Jan 28", "I don't remember"],
    correct: "Jan 28"
  },
  {
    question: "My favourite color?",
    answers: ["Red", "Blue", "Black", "Pink"],
    correct: "Black"
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  document.getElementById("question").innerText =
    quiz[current].question;

  let answerBox = document.getElementById("answers");
  answerBox.innerHTML = "";

  quiz[current].answers.forEach(ans => {
    let btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = () => {
      if(ans === quiz[current].correct){
        score++;
        document.getElementById("score").innerText = score;
      }
      current++;
      if(current < quiz.length) loadQuestion();
      else alert("Quiz finished ❤️ Score: " + score);
    };

    answerBox.appendChild(btn);
  });
}

loadQuestion();