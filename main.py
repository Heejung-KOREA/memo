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

app.mount("/", StaticFiles(directory="static", html=True), name="static")