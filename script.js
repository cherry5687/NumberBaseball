const inning = document.getElementById("inning");

//횟수를 담는 변수
let count = 1;

//결과를 담는 함수
let result;

//테이블 초기화
function reset() {
  const totalRowCnt = inning.rows.length - 1;
  for (i = 0; i < totalRowCnt; i++) {
    inning.deleteRow(-1);
  }
  count = 1;
}

//번호생성
function randBtn() {
  //다시시작 버튼 누를시 테이블을 초기화 시킨다.
  reset();

  //input에 입력되어 있는 값을 지운다.
  document.getElementById("ask").value = null;

  //정답을 랜덤으로 생성
  answer = [];

  var num_arr=[0,1,2,3,4,5,6,7,8,9];

  while (answer.length < 4) {
    let number = parseInt(Math.random() * 10);
    if (answer.indexOf(num_arr[number]) < 0) {
      answer.push(num_arr[number]);
      num_arr.splice(number,0);
    }
  }

  //맨 앞자리가 0이면 두번째 자리와 index값을 서로 바꿈
  if (answer[0] == 0) {
    [answer[0], answer[1]] = [answer[1], answer[0]];
  }
}

//글자수 최대 4자리
function handleOnInput(el, maxlength) {
  if (el.value.length > maxlength) {
    el.value = el.value.substr(0, maxlength);
  }
}

//숫자입력
function baseball() {
  input = document.getElementById("ask").value;

  //입력한 값을 담을 배열
  ask = [];

  //입력한 값을 Number타입으로 바꿔어서 배열안에 담는다.
  for (i = 0; i < 4; i++) {
    ask.push(Number(input[i]));
  }

  //ask 배열에 중복이 있을 경우 중복을 제외하고 담는다.
  set = new Set(ask);

  //4자리를 모두 입력하지 않아서 Nan값이 담길경우
  if (ask.includes(NaN)) {
    alert("4자리수를 입력하세요!");
  } 
  //4자리 숫자중 중복이 있을 경우
  else if (ask.length != set.size) {
    alert("숫자를 중복으로 입력할 수 없습니다!");
  }

  //오류가 없을 시 실행
  else {
    success();
  }
}

//비교
function compare() {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < answer.length; i++) {
    //변수 index는 ask에 그 값이 있나 확인한다.
    const index = ask.indexOf(answer[i]);
    //index>-1은 값이 있다는걸 의미
    if (index > -1) {
      //값이 존재하면서 answer(랜덤번호)의 index번호와 정확하게 일치하면 strike
      if (index === i) {
        strike++;
        //값이 존재하면서 answer(랜덤번호)의 index번호와 일치하지 않으면 ball
      } else {
        ball++;
      }
    }
  }

  if (strike == 4) {
    result = "정답입니다!";
    console.log(result);
  } else if (strike != 0 && ball == 0) {
    result = `${strike}S`;
    console.log(result);
  } else if (strike == 0 && ball != 0) {
    result = `${ball}B`;
    console.log(result);
  } else if (strike != 0 || ball !== 0) {
    result = `${strike}S ${ball}B`;
    console.log(result);
  } else {
    result = `OUT`;
    console.log(result);
  }
}

//오류가 없을 시 테이블 생성
function success() {
  //출력하면 ,가 나오지 않게 ,를 공백으로 만듬
  //ex)1,2,3,4 ->1234
  var askText = ask.join("");

  //함수 실행시 테이블을 보이게 함
  inning.style.display = "block";

  //테이블 맨 끝에 새로운 행을 추가하는 명령어
  const newRow = inning.insertRow();

  //새로 만든 행 첫번째 칸(index 0번)에 count 값을 출력한다.
  const newCell0 = newRow.insertCell(0);

  newCell0.innerText = `${count}`;
  //새로 만든 행 첫번째 칸(index 1번)에 askText 값을 출력한다.
  const newCell1 = newRow.insertCell(1);
  newCell1.innerText = `${askText}`;

  console.log(ask);

  compare();

  const newCell2 = newRow.insertCell(2);
  newCell2.innerText = `${result}`;

  //input에 입력되어 있는 값을 지운다.
  document.getElementById("ask").value = null;
  count++;
}

//정답확인
function checkAnswer(){
  var answerText = answer.join("");
  alert(`정답은 ${answerText}입니다.`);
}

//페이지 로드시 자동으로 번호 생성
randBtn();