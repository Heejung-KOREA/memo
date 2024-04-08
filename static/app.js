//작성했던 메모 수정하기
async function editMemo(event) {
    const id = event.target.dataset.id; //id값을 가져옴
    const editInput = prompt('수정할 값을 입력하세요');
    //수정한 값 서버 업데이트 요청
    const res = await fetch('/memos/${id}', {
        method: "PUT",  //값 수정 메소드
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,     //id: id인 경우 생략해도 됨
            content: editInput,
        }),
    });

    readMemo();
}

//메모 삭제
async function deleteMemo(event) {
    const id = event.target.dataset.id; //id값을 가져옴
    //삭제한 값 서버 업데이트 요청
    const res = await fetch('/memos/${id}', {
        method: "DELETE",  //값 삭제 메소드
    });

    readMemo();
}

//가져온 메모 보여주기
function displayMemo(memo) {
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");    //li 태그 생성
    li.innerHTML = `[id:${memo.id}] ${memo.content}`;

    //수정하기
    const editBtn = document.createElement("button");
    editBtn.innerText = "수정하기";
    editBtn.addEventListener("click", editMemo);
    editBtn.dataset.id = memo.id;

    //삭제하기
    const delbtn = document.createElement("button");
    delbtn.innerText = "삭제";
    delbtn.addEventListener("click", deleteMemo);
    delbtn.dataset.id = memo.id;

    ul.appendChild(li); //ul에 추가한 li 넣기
    li.appendChild(editBtn)  //추가한 button  넣기
    li.appendChild(delbtn)
}

//작성했던 메모 가져오기
async function readMemo() {
    const res = await fetch("/memos")
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemo);
}

//메모 생성 함수
async function createMemo(value) {
    //const res = await fetch("/memos"); //get 방식 --> '서버에서' 값을 '전송 받음'
    const res = await fetch("/memos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
        }),
    }); //post 방식 --> '서버에' 값을 '전송' 함.    console.log("값은?", value);

    readMemo();
}

function handleSubmit(event) {
    event.preventDefault(); //전송 후 새로고침 되는 이벤트를 금지함
    const input = document.querySelector("#memo-input");
    createMemo(input.value); //input에 들어있는 값을 함수로 넘겨줌
    input.value = "";   //제출 하고 나면 input을 초기화 함.
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit) //폼에 있는 값이 제출 됐을때 발생하는 이벤트 생성

readMemo();