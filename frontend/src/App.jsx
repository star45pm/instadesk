import React, { useState } from 'react'
export default function App(){
  const [tab,setTab]=useState('home')
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="h-16 border-b bg-white flex items-center justify-between px-6"><div className="font-bold text-xl">InstaDesk</div><div className="text-xs bg-black text-white px-3 py-1.5 rounded-full">● Live instar.xrocket.kr</div></header>
      <div className="flex"><nav className="w-56 border-r bg-white min-h-[calc(100vh-64px)] p-4 space-y-2">{[['home','홈'],['create','콘텐츠 생성'],['calendar','캘린더'],['inbox','인박스']].map(([id,l])=>(<button key={id} onClick={()=>setTab(id)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm ${tab===id?'bg-black text-white':'hover:bg-zinc-100'}`}>{l}</button>))}</nav>
      <main className="flex-1 p-8"><h1 className="text-2xl font-bold mb-4">{tab}</h1><div className="bg-white border rounded-2xl p-6">InstaDesk 배포 성공! 이제 원래 디자인을 다시 입히면 돼요.</div><div className="mt-4 text-sm">API: <span id="api"></span></div><script>{fetch('/api/health').then(r=>r.json()).then(d=>document.getElementById('api').innerText=JSON.stringify(d))}</script></main></div>
    </div>
  )
}
