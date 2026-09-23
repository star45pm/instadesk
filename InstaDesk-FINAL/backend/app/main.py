
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, ig, content, publish, comments, insights, export, feedback, workspace

app = FastAPI(title="InstaDesk API", version="1.0.0", description="인스타그램 운영 자동화 - Meta 공식 API 기반 - instar.xrocket.kr")

app.add_middleware(CORSMiddleware, allow_origins=["https://instar.xrocket.kr","http://localhost:5173","http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(workspace.router, prefix="/api/workspaces", tags=["Workspace"])
app.include_router(ig.router, prefix="/api/ig", tags=["Instagram"])
app.include_router(content.router, prefix="/api/content", tags=["Content"])
app.include_router(publish.router, prefix="/api/publish", tags=["Publish"])
app.include_router(comments.router, prefix="/api/comments", tags=["Comments"])
app.include_router(insights.router, prefix="/api/insights", tags=["Insights"])
app.include_router(export.router, prefix="/api/exports", tags=["Export"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["Feedback"])

@app.get("/health")
def health(): return {"status":"ok","domain":"instar.xrocket.kr","compliance":"Meta Official API Only","version":"1.0.0"}

@app.get("/")
def root(): return {"service":"InstaDesk","frontend":"https://instar.xrocket.kr","docs":"/docs"}
