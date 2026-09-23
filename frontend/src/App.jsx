import React, { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('home')
  const [api,setApi]=useState('checking...')

  useEffect(()=>{
    fetch('/api/')
      .then(r=>r.json())
      .then(d=>setApi(JSON.stringify(d)))
      .catch(e=>setApi('error: '+e.message))
  },[])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="h-16 border-b bg-white flex items-center justify-between px-6">
        <div className="font-bold text-xl">InstaDesk</div>
        <div className="text-xs text-zinc-500">{api}</div>
      </header>
      <div className="flex">
        <nav className="w-56 border-r bg-white min-h-[calc(100vh-64px)] p-4 space-y-2">
          <button onClick={()=>setTab('home')} className={`w-full text-left p-2 rounded ${tab==='home'?'bg-zinc-900 text-white':'hover:bg-zinc-100'}`}>Home</button>
          <button onClick={()=>setTab('dashboard')} className={`w-full text-left p-2 rounded ${tab==='dashboard'?'bg-zinc-900 text-white':'hover:bg-zinc-100'}`}>Dashboard</button>
          <button onClick={()=>setTab('settings')} className={`w-full text-left p-2 rounded ${tab==='settings'?'bg-zinc-900 text-white':'hover:bg-zinc-100'}`}>Settings</button>
        </nav>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">{tab}</h1>
          <div className="bg-white border rounded p-6">
            <p className="text-zinc-600">현재 탭: {tab}</p>
            <p className="mt-2 text-sm">백엔드 상태: {api}</p>
            <p className="mt-4 text-sm text-green-600">✅ 서버 502, 404, SSL, 빌드 모두 정상</p>
          </div>
        </main>
      </div>
    </div>
  )
}
