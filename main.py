from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class Memo(BaseModel):
    id: int
    content: str

memos = []

#memos 라는 post 요청을 보냈을 때,
@app.post("/memos")
def create_memo(memo:Memo): #값을 Memo로 받음
    memos.append(memo)
    return "메모 추가 성공"

@app.get("/memos")
def read_memo():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:  #기존 메모의 id랑 전달 받은 id값이 같을 때,
            memo.content = req_memo.content
            return '성공했습니다'
        return '실패'
    
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
        for index, memo in enumerate(memos):    #enumerate -> 배열의 인덱스 값과 값을 같이 뽑아주는 함수
            if memo.id == memo.id:  #기존 메모의 id랑 전달 받은 id값이 같을 때,
                memos.pop(index)
                return '성공했습니다'
        return '실패'

app.mount("/", StaticFiles(directory="static", html=True), name="static")