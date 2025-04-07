const quizData = [
  {
    question: 'HTML의 의미로 옳은 것은?',
    options: [
      'HyperText Markup Language',
      'HyperText Makeup Language',
      'HighText Machine Language',
      'HyperTransfer Markup Language',
    ],
    answer: ['HyperText Markup Language', 0], //0
  },
  {
    question: 'CSS의 주요 역할로 가장 적합한 것은?',
    options: [
      '웹페이지의 구조를 설계',
      '웹페이지의 콘텐츠 작성',
      '웹페이지의 스타일 및 레이아웃 설정',
      '데이터베이스 관리',
    ],
    answer: ['웹페이지의 스타일 및 레이아웃 설정', 2], //2
  },
  {
    question: '자바스크립트에서 변수를 선언할 때 사용하는 키워드가 아닌 것은?',
    options: ['let', 'const', 'var', 'int'],
    answer: ['int', 3], //3
  },
  {
    question: '다음 중 HTML에서 제목을 나타낼 때 사용하는 태그는?',
    options: ['p', 'h1', 'div', 'span'],
    answer: ['h1', 1], // 1
  },
  {
    question: 'CSS에서 외부 스타일시트를 연결하는 올바른 방법은?',
    options: [
      "link rel='stylesheet' href='style.css'",
      "style src='style.css'></style",
      "stylesheet href='style.css'></stylesheet",
      "script src='style.css'></script",
    ],
    answer: ["link rel='stylesheet' href='style.css'", 1], // 1
  },
  {
    question:
      '자바스크립트에서 엄격한 비교(strict equality)를 수행하는 연산자는 무엇인가?',
    options: ['==', '===', '=', '!=='],
    answer: ['===', 1], // 1
  },
  {
    question: '다음 중 HTML에서 링크를 만드는 태그는 무엇인가?',
    options: ['img', 'a', 'link', 'href'],
    answer: ['a', 1], // 1
  },
  {
    question: 'CSS에서 텍스트를 가운데 정렬할 때 사용하는 속성 값은?',
    options: [
      'text-align: center;',
      'vertical-align: center;',
      'align-text: center;',
      'text-style: center;',
    ],
    answer: ['text-align: center;', 0], // 0
  },
  {
    question: '자바스크립트에서 배열(Array)의 길이를 반환하는 속성은?',
    options: ['.size', '.count', '.length', '.index'],
    answer: ['.length', 2], // 2
  },
  {
    question: 'HTML에서 순서 없는 목록을 나타내는 태그는?',
    options: ['ol', 'ul', 'li', 'dl'],
    answer: ['ul', 1], // 1
  },
];

let currentQuiz = 0; // 현재 퀴즈 번호
let correctCount = 0; // 맞은 개수
let selectedButton = null;
let userAnswers = new Array(quizData.length).fill(-1);
let barStatus = true;

// 0.7v DOM
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const checkButton = document.getElementById('check-btn');
const numButtons = document.querySelectorAll('#bar-main button');

// 추가 DOM (0.8v) - results div 태그 관련 + quizElement
const quizElement = document.getElementById('quiz');

const resultMessage = document.getElementById('result-message');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const summaryElement = document.getElementById('summary');
const retryButton = document.getElementById('retry-btn');

// 추가 0.9v
const barElement = document.getElementById('bar-main');
const questionBar = document.querySelector('.question-bar');
// 퀴즈 초기화 (0.8v)
function initQuiz() {
  // retryButton 입력 시 현재 currentQuiz값 변경
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.fontSize = '20px';
  // 1번 문제로 이동 + 변수 초기화
  currentQuiz = 0; // 현재 퀴즈 번호
  correctCount = 0; // 맞은 개수
  selectedButton = null;
  userAnswers = new Array(quizData.length).fill(-1);
  barStatus = true;

  loadQuiz();
  updateUI();

  quizElement.classList.remove('hide');
  resultsElement.classList.add('hide');
  resultMessage.textContent = '';
  resultMessage.className = '';
}

function resetQuiz() {
  userAnswers = new Array(quizData.length).fill(-1);
}

function loadQuiz() {
  const quizQuestion = quizData[currentQuiz]; // 현재 퀴즈 데이터 가져오기
  //quizNum.innerHTML = currentQuiz + 1;

  questionElement.innerHTML = quizData[currentQuiz].question;

  optionsContainer.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    // 선택지 보여줄 div 태그 생성
    // (동적 생성: 계속해서 변경될 것이므로 여기서 생성)
    const optionElements = document.createElement('div');
    optionElements.className = 'option';
    optionElements.textContent = quizData[currentQuiz].options[i];
    optionElements.dataset.index = i;
    if (userAnswers[currentQuiz] === i) {
      optionElements.classList.add('selected');
    }
    optionElements.addEventListener('click', selectOption);
    optionsContainer.appendChild(optionElements);
  }

  // updateUI로 이동 (v0.8)
  // if (currentQuiz === 0) {
  //   // 첫번째 문제 일 때, prev 버튼 비활성화
  //   prevButton.disabled = true;
  // } else {
  //   prevButton.disabled = false;
  // }

  // if (currentQuiz === quizData.length - 1) {
  //   // 마지막 문제일 때, next 버튼 비활성화
  //   nextButton.disabled = true;
  // } else {
  //   nextButton.disabled = false;
  // }

  // numButtons[currentQuiz].style.border = "3px solid black";
  // numButtons[currentQuiz].style.fontSize = "23px";

  //console.log(userAnswers);
}

// 이전 버튼
prevButton.onclick = () => {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.fontSize = '20px';
  currentQuiz--;
  loadQuiz();
  updateUI();
};

// 다음 버튼
nextButton.onclick = () => {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.fontSize = '20px';
  currentQuiz++;
  loadQuiz();
  updateUI();
};

// 문제 번호 버튼
numButtons.forEach((button, index) => {
  button.addEventListener('click', () => numButtonClick(index));
});

function numButtonClick(n) {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.fontSize = '20px';

  currentQuiz = n;
  loadQuiz();
  updateUI();
}

// 옵션 선택
function selectOption() {
  const selectedIndex = parseInt(this.dataset.index);
  const options = document.querySelectorAll('.option');

  options.forEach((option) => option.classList.remove('selected'));
  this.classList.add('selected');
  userAnswers[currentQuiz] = selectedIndex;

  // 푼 문제 버튼 배경 색 변경
  numButtons[currentQuiz].style.backgroundColor = 'lightyellow';

  updateUI();
}

submitButton.onclick = () => {
  correctCount = 0;
  barStatus = false;
  let summary = '';

  updateUI();

  for (let i = 0; i < 10; i++) {
    let myAnswer = userAnswers[i];
    if (userAnswers[i] == quizData[i].answer[1]) {
      correctCount++;
    }

    const isCorrect = myAnswer === quizData[i].answer[1];
    console.log(isCorrect);

    summary += `<div class="summary-item ${
      isCorrect ? 'correct' : 'incorrect'
    }">
        <h2><strong>문제 ${i + 1}:</strong> ${quizData[i].question}</h2>
        <p><strong>내 답변: ${
          myAnswer !== -1 ? quizData[i].options[myAnswer] : '응답 없음'
        }<strong></p>
        <p class="font-red">정답: ${quizData[i].answer[0]}</p>
    </div>`;
  }

  quizElement.classList.add('hide');
  resultsElement.classList.remove('hide');

  scoreElement.textContent = `${correctCount}/${quizData.length}`;
  summaryElement.innerHTML = summary;
};

checkButton.onclick = () => {
  if (userAnswers[currentQuiz] == quizData[currentQuiz].answer[1]) {
    alert('정답 ^_^');
  } else {
    alert('다시 생각하세요');
  }
};

function updateUI() {
  console.log(currentQuiz);

  if (currentQuiz === 0) {
    console.log('첫페이지');
  }
  if (currentQuiz === 0) {
    // 첫번째 문제 일 때, prev 버튼 비활성화
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentQuiz === quizData.length - 1) {
    // 마지막 문제일 때, next 버튼 비활성화
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
  if (!barStatus) {
    questionBar.style.display = 'none';
  } else {
    questionBar.style.display = 'block';
  }

  numButtons[currentQuiz].style.border = '3px solid red';
  numButtons[currentQuiz].style.fontSize = '23px';
}

retryButton.addEventListener('click', () => {
  window.location.href = `test.html`;
});

initQuiz();
