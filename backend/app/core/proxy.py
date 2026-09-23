
# PRD 3.3 프록시 정책: 모든 Meta 호출은 앱서버 -> 프록시 게이트웨이 -> graph.instagram.com
import httpx, os
PROXY_URL = os.getenv("PROXY_GATEWAY_URL")
def get_client():
    # 고정 IP, 헬스체크, 서킷브레이커는 게이트웨이에서 처리
    if PROXY_URL:
        return httpx.AsyncClient(proxies=PROXY_URL, timeout=30)
    return httpx.AsyncClient(timeout=30)

# 금지: 주거용 IP 로테이션으로 비공식 탐지 우회 금지
