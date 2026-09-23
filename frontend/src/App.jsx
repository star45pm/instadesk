import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Sparkles, Calendar as CalIcon, Inbox, BarChart3, Settings,
  Bell, ChevronDown, Plus, Zap, AlertTriangle, Clock, MessageSquare,
  Play, Image as ImageIcon, Wand2, Send, Check, X, MoreHorizontal,
  TrendingUp, Users, Eye, Target, Download, Shield, Key, Globe,
  UserCheck, Lock, Layers, Filter, Search, ExternalLink, Info,
  ChevronRight, Video, FileText, Heart, Bookmark, Share2, Activity,
  Cpu, Server, Timer, Flag, Smile, Frown, HelpCircle, Star, Trash2,
  Sun, Moon, LogOut, ArrowUpRight, ArrowDownRight, Sparkle, LayoutGrid,
  List, GripVertical, MessageCircle, ThumbsUp, AlertCircle
} from 'lucide-react';

// Types
type View = 'home' | 'create' | 'calendar' | 'inbox' | 'performance' | 'settings';
type Tier = 'Free' | 'Starter' | 'Pro' | 'Agency';
type ContentStatus = 'draft' | 'pending' | 'scheduled' | 'published' | 'failed';
type CreateMode = 'shorts' | 'cardnews';
type InboxTab = 'unprocessed' | 'draft' | 'auto' | 'escalation';
type CalendarView = 'month' | 'week';

// Mock Data
const mockAccounts = [
  { id: '1', username: 'brand_a_official', avatar: 'https://i.pravatar.cc/100?img=32', followers: '24.3K', type: '비즈니스', verified: true },
  { id: '2', username: 'brand_a_store', avatar: 'https://i.pravatar.cc/100?img=33', followers: '8.7K', type: '비즈니스', verified: false },
  { id: '3', username: 'brand_b_kr', avatar: 'https://i.pravatar.cc/100?img=47', followers: '152K', type: '크리에이터', verified: true },
];

const mockWorkspaces = ['에이전시 알파', '브랜드 A 본사', '브랜드 B 캠페인'];

const todoItems = [
  { id: 1, type: 'schedule', title: '예약 임박', desc: '2건이 30분 내 게시 예정', count: 2, color: 'bg-blue-500', icon: Clock },
  { id: 2, type: 'comment', title: '미처리 댓글', desc: '12건이 답변 대기 중', count: 12, color: 'bg-amber-500', icon: MessageSquare },
  { id: 3, type: 'failed', title: '실패한 게시', desc: '형식 오류 1건 확인 필요', count: 1, color: 'bg-red-500', icon: AlertTriangle },
  { id: 4, type: 'slot', title: '추천 슬롯', desc: '수요일 19:30 도달률 +34%', count: null, color: 'bg-gradient-to-br from-[#E1306C] to-[#F77737]', icon: Zap },
];

const initialEvents = [
  { id: '1', time: '방금', type: 'worker', msg: '워커: @brand_a_official 릴스 게시 성공', status: 'success' },
  { id: '2', time: '2분 전', type: 'comment', msg: '댓글: @minji_kim 문의 - 배송 언제?', intent: '질문', status: 'pending' },
  { id: '3', time: '5분 전', type: 'publish', msg: '컨테이너 생성: cardnews_042 완료', status: 'info' },
  { id: '4', time: '8분 전', type: 'insight', msg: 'Insights 동기화: 도달 +12.3% 상승', status: 'success' },
  { id: '5', time: '12분 전', type: 'worker', msg: '워커: 예약 큐 처리 5건 완료', status: 'success' },
];

const mockComments = [
  { id: 1, user: 'jessica._.lee', avatar: 'https://i.pravatar.cc/100?img=5', text: '이 제품 어디서 구매할 수 있나요? 링크 좀 알려주세요!', intent: '질문', time: '3분 전', likes: 2, aiDraft: '안녕하세요 @jessica._.lee 님! 프로필 링크에서 공식몰로 바로 가실 수 있어요 🛍️ 오늘 자정까지 10% 쿠폰도 적용됩니다!' },
  { id: 2, user: 'foodie_hyun', avatar: 'https://i.pravatar.cc/100?img=8', text: '이번 카드뉴스 진짜 유용해요 ㅠㅠ 저장했어요', intent: '칭찬', time: '12분 전', likes: 15, aiDraft: '@foodie_hyun 님 진심 감사합니다! 다음 주에는 심화편도 준비 중이니 기대해주세요 ✨' },
  { id: 3, user: 'angry_customer_1', avatar: 'https://i.pravatar.cc/100?img=15', text: '배송 5일째 안 오는데 CS는 연락도 안 됨. 실망입니다.', intent: '불만', time: '27분 전', likes: 4, aiDraft: '@angry_customer_1 님 불편을 드려 죄송합니다. DM으로 주문번호 알려주시면 즉시 확인하여 배송 상황 안내드리겠습니다. 🙏' },
  { id: 4, user: 'shop_link_bot', avatar: 'https://i.pravatar.cc/100?img=20', text: '👉👉 https://fake-shop.xyz 저렴하게 구매하세요!!!', intent: '스팸', time: '1시간 전', likes: 0, aiDraft: '' },
  { id: 5, user: 'design_lover', avatar: 'https://i.pravatar.cc/100?img=26', text: '폰트 정보 알려주실 수 있을까요? 너무 예뻐요', intent: '질문', time: '2시간 전', likes: 7, aiDraft: '@design_lover 님! Pretendard Bold + Gmarket Sans 조합이에요. 브랜드킷 가이드 공유드릴게요!' },
];

const kpiData = [
  { label: '팔로워', value: '184.2K', delta: '+2.3%', up: true },
  { label: '순증감', value: '+1,243', delta: '+18%', up: true },
  { label: '도달', value: '892K', delta: '+12.4%', up: true },
  { label: '노출', value: '1.4M', delta: '+8.1%', up: true },
  { label: '프로필 방문', value: '23.4K', delta: '-2.1%', up: false },
  { label: '웹사이트 탭', value: '5.2K', delta: '+31%', up: true },
  { label: '저장', value: '8.9K', delta: '+15%', up: true },
  { label: '공유', value: '3.1K', delta: '+9%', up: true },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeAccount, setActiveAccount] = useState(mockAccounts[0]);
  const [workspace, setWorkspace] = useState(mockWorkspaces[0]);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [createMode, setCreateMode] = useState<CreateMode>('shorts');
  const [inboxTab, setInboxTab] = useState<InboxTab>('unprocessed');
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<any>(null);
  const [aiLabel, setAiLabel] = useState(true);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [excelProgress, setExcelProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('기능요청');
  const [oauthStep, setOauthStep] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [formData, setFormData] = useState({
    topic: '신제품 런칭 - 여름 에디션 무선 이어폰',
    brand: 'Brand A / AURA Buds',
    tone: '정보',
    length: '30',
    lang: '한국어',
    forbidden: '최저가, 완판, 대박'
  });

  const eventRef = useRef<HTMLDivElement>(null);

  // SSE simulation
  useEffect(() => {
    const messages = [
      { type: 'worker', msg: '워커: @brand_b_kr 카드뉴스 게시 성공', status: 'success' },
      { type: 'comment', msg: '댓글: 신규 문의 2건 감지 (의도: 질문)', status: 'pending' },
      { type: 'publish', msg: '컨테이너 생성: reels_088 대기열 진입', status: 'info' },
      { type: 'insight', msg: 'L3 Insights: 저장 수 +24% 급상승', status: 'success' },
      { type: 'worker', msg: '프록시 게이트웨이: 헬스체크 정상', status: 'success' },
      { type: 'comment', msg: '댓글: @user_99 칭찬 감지 - 자동 초안 생성', status: 'pending' },
      { type: 'publish', msg: 'Publish: media_id 1798... 게시 완료', status: 'success' },
    ];
    const interval = setInterval(() => {
      const random = messages[Math.floor(Math.random() * messages.length)];
      const newEvent = { id: Date.now().toString(), time: '방금', ...random };
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Excel export mock
  const handleExcelExport = () => {
    setIsExporting(true);
    setExcelProgress(0);
    const interval = setInterval(() => {
      setExcelProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 300);
  };

  // Generate mock content
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (createMode === 'shorts') {
        setGenerated({
          scenes: [
            { id: 1, sec: '0-5s', desc: '제품 클로즈업 - 화이트 배경 슬로우 줌', narration: '여름, 당신의 일상을 바꿀 사운드', subtitle: '여름을 듣다' },
            { id: 2, sec: '5-12s', desc: '야외 라이프스타일 - 한강 러닝', narration: '汗에도, 비에도 흔들리지 않는', subtitle: 'IPX5 방수 | 30시간 재생' },
            { id: 3, sec: '12-22s', desc: '노캔 데모 - 카페 소음 차단 비교', narration: '당신에게만 집중되는 순간', subtitle: '액티브 노이즈 캔슬링' },
            { id: 4, sec: '22-30s', desc: 'CTA - 제품 + 가격 + QR', narration: 'AURA Buds Summer - 지금 만나보세요', subtitle: '프로필 링크에서 10% OFF' },
          ],
          captions: {
            main: '여름은 소리로 기억된다. 🎧 AURA Buds Summer Edition으로 당신의 플레이리스트에 계절을 담아보세요. 러닝할 때도, 카페에서도, 당신의 음악에만 집중할 수 있도록.',
            hashtags: {
              core: ['#무선이어폰', '#노이즈캔슬링', '#여름에디션'],
              sub: ['#러닝템', '#카페BGM', '#데일리템'],
              loc: ['#한강러닝', '#서울카페']
            }
          },
          thumbnails: ['여름, 들리니?', '소음 OFF\n집중 ON', '30시간의 자유']
        });
      } else {
        setGenerated({
          slides: [
            { id: 1, header: '여름에도 흔들림 없는 사운드', body: 'AURA Buds가 여름을 위해 재해석되었습니다. 가볍고, 강하고, 오래갑니다.', type: 'cover' },
            { id: 2, header: '스펙 한눈에 보기', body: '• 30시간 재생\n• IPX5 방수\n• ANC + ENC 통화\n• 6g 초경량', type: 'list' },
            { id: 3, header: '러닝 테스트 결과', body: '5km 러닝 중 이탈 0건, 땀으로 인한 음질 저하 없음. 실제 크루 12명 테스트.', type: 'chart' },
            { id: 4, header: '비교: 이전 세대 vs Summer', body: '배터리 +40%, 무게 -15%, 방수 등급 UP', type: 'compare' },
            { id: 5, header: '오늘만 10% OFF', body: '프로필 링크에서 쿠폰 코드 SUMMER10 입력\n기간: 6/3~6/9', type: 'cta' },
          ]
        });
      }
      setIsGenerating(false);
    }, 1800);
  };

  const navItems = [
    { id: 'home' as View, label: '홈', icon: Home },
    { id: 'create' as View, label: '만들기', icon: Sparkles },
    { id: 'calendar' as View, label: '캘린더', icon: CalIcon },
    { id: 'inbox' as View, label: '수신함', icon: Inbox, badge: 12 },
    { id: 'performance' as View, label: '성과', icon: BarChart3 },
    { id: 'settings' as View, label: '설정', icon: Settings },
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen w-full font-pretendard antialiased ${isDark ? 'bg-[#0a0a0b] text-zinc-100' : 'bg-[#f8f7f5] text-zinc-900'} transition-colors duration-300`} style={{ fontFamily: "'Pretendard', -apple-system, sans-serif", paddingTop: 'var(--safe-area-inset-top, 0px)' }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideIn { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform: translateY(0);} }
        .animate-slideIn { animation: slideIn 0.4s ease-out; }
      `}</style>

      {/* Top Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
        <div className="h-[64px] px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center shadow-lg">
                <Sparkle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[17px] tracking-tight hidden md:block">InstaDesk</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>v1.0</span>
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 hidden md:block" />

            {/* Workspace Switcher */}
            <div className="relative">
              <button onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isDark ? 'hover:bg-zinc-800 bg-zinc-900' : 'hover:bg-zinc-100 bg-zinc-50'} border ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                <span className="hidden md:block max-w-[120px] truncate">{workspace}</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
              {showWorkspaceMenu && (
                <div className={`absolute top-full mt-2 w-64 rounded-2xl shadow-2xl border p-2 z-50 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  {mockWorkspaces.map(ws => (
                    <button key={ws} onClick={() => { setWorkspace(ws); setShowWorkspaceMenu(false); }} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between ${workspace === ws ? (isDark ? 'bg-zinc-800' : 'bg-zinc-100') : ''} hover:bg-zinc-100 dark:hover:bg-zinc-800`}>
                      <span>{ws}</span>
                      {workspace === ws && <Check className="w-4 h-4 text-[#E1306C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Active IG Account */}
            <div className="relative">
              <button onClick={() => setShowAccountMenu(!showAccountMenu)} className={`flex items-center gap-2 pl-1 pr-2 md:pr-3 py-1 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
                <img src={activeAccount.avatar} alt={activeAccount.username} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-sm font-medium hidden md:block">@{activeAccount.username}</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden md:block" />
              </button>
              {showAccountMenu && (
                <div className={`absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl border p-2 z-50 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  {mockAccounts.map(acc => (
                    <button key={acc.id} onClick={() => { setActiveAccount(acc); setShowAccountMenu(false); }} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeAccount.id === acc.id ? (isDark ? 'bg-zinc-800' : 'bg-zinc-50') : ''} hover:bg-zinc-50 dark:hover:bg-zinc-800`}>
                      <img src={acc.avatar} className="w-10 h-10 rounded-full" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">@{acc.username}</div>
                        <div className="text-xs opacity-60">{acc.followers} · {acc.type}</div>
                      </div>
                      {activeAccount.id === acc.id && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </button>
                  ))}
                  <div className={`mt-2 pt-2 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-100'} `}>
                    <button onClick={() => setCurrentView('settings')} className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
                      <Plus className="w-4 h-4" /> 계정 연결하기
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-zinc-800' : 'bg-zinc-900 text-white'}`}>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E1306C] to-[#F77737] flex items-center justify-center text-[10px]">P</div>
              Pro
            </div>

            <button className={`relative p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-zinc-800 bg-zinc-900' : 'hover:bg-zinc-100 bg-white border border-zinc-200'}`}>
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E1306C] text-white text-[11px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>

            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-zinc-800 bg-zinc-900' : 'hover:bg-zinc-100 bg-white border border-zinc-200'}`}>
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-zinc-200 dark:ring-zinc-700 hidden md:block">
              <img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:flex flex-col w-[260px] shrink-0 sticky top-[64px] h-[calc(100vh-64px)] p-4 gap-2 ${isDark ? 'bg-[#0a0a0b]' : 'bg-[#f8f7f5]'}`}>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all text-left w-full ${active ? (isDark ? 'bg-white text-black shadow-sm' : 'bg-zinc-900 text-white shadow-sm') : (isDark ? 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100' : 'hover:bg-white text-zinc-500 hover:text-zinc-900')}`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="text-xs bg-[#E1306C] text-white px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            {/* Publishing Limit */}
            <div className={`rounded-2xl p-4 border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium opacity-60">콘텐츠 발행 한도</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>MOCK</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold">87</span>
                <span className="text-sm opacity-60">/100</span>
                <span className="text-xs opacity-50 ml-1">남음</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full w-[87%] bg-gradient-to-r from-[#E1306C] to-[#F77737] rounded-full" />
              </div>
              <div className="text-[11px] opacity-50 mt-2">공식 API 연동 시 실제 호출</div>
            </div>

            <div className={`rounded-2xl p-3 flex items-center gap-3 ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
              <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full" alt="" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">김민준 · Admin</div>
                <div className="text-xs opacity-60 truncate">minjun@alpha.agency</div>
              </div>
              <LogOut className="w-4 h-4 opacity-40" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[1280px] mx-auto p-4 md:p-6 pb-[88px] md:pb-6">
            {/* 홈 */}
            {currentView === 'home' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-[22px] md:text-[28px] font-bold tracking-tight">오늘의 운영 현황</h1>
                    <p className="text-sm opacity-60 mt-1">6월 3일 월요일 · 최근 업데이트 1분 전 · L1 실시간</p>
                  </div>
                  <div className={`hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    L1 SSE 연결됨
                  </div>
                </div>

                {/* Todo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {todoItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className={`rounded-[20px] p-5 border shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${item.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {item.count !== null && <span className="text-2xl font-bold">{item.count}</span>}
                        </div>
                        <h3 className="font-semibold text-[15px]">{item.title}</h3>
                        <p className="text-[13px] opacity-60 mt-1 leading-snug">{item.desc}</p>
                        <button className="mt-4 w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                          지금 이어서 하기 <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                  {/* Realtime Feed */}
                  <div className={`rounded-[20px] border shadow-sm overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="p-5 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#E1306C]" />
                        <h3 className="font-semibold">L1 실시간 이벤트</h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">SSE</span>
                      </div>
                      <span className="text-xs opacity-50">매 3초 갱신</span>
                    </div>
                    <div ref={eventRef} className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[380px] overflow-y-auto scrollbar-hide">
                      {events.map(ev => (
                        <div key={ev.id} className="p-4 flex gap-3 animate-slideIn hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${ev.status === 'success' ? 'bg-emerald-500' : ev.status === 'pending' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] leading-snug truncate">{ev.msg}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] opacity-50">{ev.time}</span>
                              {ev.intent && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600">{ev.intent}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimization & Stats */}
                  <div className="space-y-4">
                    <div className={`rounded-[20px] border p-5 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> 최적화 점수</h3>
                        <span className="text-xs opacity-50">오늘 기준</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20 -rotate-90">
                            <circle cx="40" cy="40" r="32" fill="none" stroke={isDark ? "#27272a" : "#e4e4e7"} strokeWidth="8" />
                            <circle cx="40" cy="40" r="32" fill="none" stroke="url(#grad)" strokeWidth="8" strokeDasharray={`${72 * 2.01} 201`} strokeLinecap="round" />
                            <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E1306C" /><stop offset="100%" stopColor="#F77737" /></linearGradient></defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold">72</span>
                            <span className="text-[10px] opacity-60">/100</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2.5">
                          {['해시태그 다양성 개선', '릴스 자막 가독성 +CTA', '수요일 19:30 슬롯 활용'].map((t, i) => (
                            <div key={i} className="flex gap-2 text-[13px]">
                              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                              <span className="leading-snug">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: '팔로워', value: '184.2K', sub: '+2.3%' },
                        { label: '도달', value: '892K', sub: '+12%' },
                        { label: '예약 성공률', value: '98.7%', sub: '12/12' },
                      ].map(k => (
                        <div key={k.label} className={`rounded-2xl p-4 border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                          <div className="text-[11px] opacity-60">{k.label}</div>
                          <div className="text-[18px] font-bold mt-1">{k.value}</div>
                          <div className="text-[11px] text-emerald-600 mt-0.5">{k.sub}</div>
                        </div>
                      ))}
                    </div>

                    <div className={`rounded-[20px] border p-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <div className="text-xs font-medium mb-3 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> 게시 파이프라인</div>
                      <div className="flex items-center gap-1">
                        {['검증', 'URL', '컨테이너', '대기', '발행', '저장', 'Insights'].map((s, i) => (
                          <React.Fragment key={s}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-emerald-500 text-white' : i === 5 ? 'bg-blue-500 text-white animate-pulse' : 'bg-zinc-200 dark:bg-zinc-700'}`}>{i + 1}</div>
                            {i < 6 && <div className={`flex-1 h-0.5 ${i < 5 ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-700'}`} />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        {['검증', 'URL', '컨테이너', '대기', '발행', '저장', 'Insights'].map(s => <span key={s} className="text-[9px] opacity-50 w-7 text-center truncate">{s}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 만들기 */}
            {currentView === 'create' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[24px] font-bold tracking-tight">콘텐츠 만들기</h1>
                    <p className="text-sm opacity-60 mt-1">브랜드킷 기반 AI 초안 생성 · 공식 API 연동 시 자동 게시</p>
                  </div>
                  <div className={`inline-flex p-1 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <button onClick={() => setCreateMode('shorts')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${createMode === 'shorts' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow' : 'opacity-60'}`}>
                      <Video className="w-4 h-4" /> 숏츠(릴스)
                    </button>
                    <button onClick={() => setCreateMode('cardnews')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${createMode === 'cardnews' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow' : 'opacity-60'}`}>
                      <LayoutGrid className="w-4 h-4" /> 카드뉴스
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
                  {/* Left Form */}
                  <div className="space-y-4">
                    <div className={`rounded-[20px] border p-5 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Wand2 className="w-4 h-4 text-[#E1306C]" /> 입력 정보</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium opacity-70">주제</label>
                          <textarea value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E1306C]/20 ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} rows={2} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium opacity-70">브랜드/제품</label>
                            <input value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
                          </div>
                          <div>
                            <label className="text-xs font-medium opacity-70">톤</label>
                            <select value={formData.tone} onChange={e => setFormData({ ...formData, tone: e.target.value })} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <option>정보</option><option>유머</option><option>감성</option><option>긴급</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium opacity-70">길이</label>
                            <select value={formData.length} onChange={e => setFormData({ ...formData, length: e.target.value })} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <option>15</option><option>30</option><option>60</option><option>90</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-medium opacity-70">언어</label>
                            <select value={formData.lang} onChange={e => setFormData({ ...formData, lang: e.target.value })} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <option>한국어</option><option>English</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium opacity-70">금지 표현</label>
                          <input value={formData.forbidden} onChange={e => setFormData({ ...formData, forbidden: e.target.value })} placeholder="쉼표로 구분" className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
                        </div>
                      </div>
                      <button onClick={handleGenerate} disabled={isGenerating} className="mt-5 w-full py-3 rounded-xl bg-gradient-to-br from-[#E1306C] to-[#F77737] text-white font-medium text-sm shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                        {isGenerating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 초안 생성 중...</> : <><Sparkles className="w-4 h-4" /> 초안 만들기</>}
                      </button>
                    </div>

                    <div className={`rounded-[20px] border p-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Layers className="w-4 h-4" /> 브랜드킷</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs">AURA</div>
                          <div className="text-xs">
                            <div className="font-medium">로고: Primary</div>
                            <div className="opacity-60">PNG 1024px / 여백 24px</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {['#0a0a0b', '#E1306C', '#F5F5F0', '#FFB800'].map(c => <div key={c} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />)}
                        </div>
                        <div className="text-xs space-y-1 opacity-70">
                          <div>자막: Pretendard Bold 24pt + 그림자 20%</div>
                          <div>안전영역: 상하 140px</div>
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-[20px] border p-4 flex items-center justify-between ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-amber-50 border-amber-200'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${aiLabel ? 'bg-amber-500 text-white' : 'bg-zinc-200'}`}><Sparkle className="w-4 h-4" /></div>
                        <div>
                          <div className="text-sm font-medium">AI 생성 표시</div>
                          <div className="text-[11px] opacity-60">라벨 자동 부착 & 로그 기록</div>
                        </div>
                      </div>
                      <button onClick={() => setAiLabel(!aiLabel)} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${aiLabel ? 'bg-amber-500' : 'bg-zinc-300'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${aiLabel ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Right Preview */}
                  <div className={`rounded-[20px] border shadow-sm min-h-[600px] ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    {!generated ? (
                      <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E1306C]/10 to-[#F77737]/10 flex items-center justify-center mb-4">
                          <Wand2 className="w-8 h-8 text-[#E1306C]" />
                        </div>
                        <h3 className="font-semibold">초안을 생성해보세요</h3>
                        <p className="text-sm opacity-60 mt-1 max-w-[320px]">주제와 브랜드를 입력하면 스토리보드, 캡션, 해시태그, 썸네일 카피를 한번에 생성합니다.</p>
                        <div className="mt-6 grid grid-cols-3 gap-2 text-[11px]">
                          <div className={`px-3 py-2 rounded-full border ${isDark ? 'border-zinc-700 bg-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>4개 씬 구성</div>
                          <div className={`px-3 py-2 rounded-full border ${isDark ? 'border-zinc-700 bg-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>해시태그 3종</div>
                          <div className={`px-3 py-2 rounded-full border ${isDark ? 'border-zinc-700 bg-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>썸네일 3안</div>
                        </div>
                      </div>
                    ) : createMode === 'shorts' ? (
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">숏츠 스토리보드 (30s)</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 font-medium">MOCK · 공식 API 연동 시 실제 호출</span>
                        </div>
                        <div className="grid gap-3">
                          {generated.scenes.map((s: any) => (
                            <div key={s.id} className={`rounded-xl border p-4 flex gap-4 ${isDark ? 'border-zinc-800 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'}`}>
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-white text-xs font-bold shrink-0`}>{s.sec}</div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium opacity-60">{s.desc}</div>
                                <div className="text-sm font-medium mt-1">🎙️ {s.narration}</div>
                                <div className="text-sm mt-1 px-2 py-1 rounded bg-black text-white inline-block">💬 {s.subtitle}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className={`rounded-xl p-4 border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                            <div className="text-xs font-bold opacity-60 mb-2">캡션</div>
                            <p className="text-sm leading-relaxed">{generated.captions.main}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {[...generated.captions.hashtags.core, ...generated.captions.hashtags.sub, ...generated.captions.hashtags.loc].map((h: string) => (
                                <span key={h} className="text-xs px-2 py-1 rounded-full bg-[#E1306C]/10 text-[#E1306C]">{h}</span>
                              ))}
                            </div>
                          </div>
                          <div className={`rounded-xl p-4 border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                            <div className="text-xs font-bold opacity-60 mb-2">썸네일 카피 3안</div>
                            <div className="space-y-2">
                              {generated.thumbnails.map((t: string, i: number) => (
                                <div key={i} className={`p-3 rounded-lg bg-black text-white text-sm font-bold text-center leading-tight ${i === 1 ? 'text-amber-300' : ''}`}>{t}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium">내부승인 요청</button>
                          <button className="flex-1 py-3 rounded-xl bg-gradient-to-br from-[#E1306C] to-[#F77737] text-white text-sm font-medium">예약하기</button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">카드뉴스 미리보기 1080x1080</h3>
                          <div className="flex gap-1">
                            {generated.slides.map((_: any, i: number) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#E1306C]' : 'bg-zinc-300'}`} />)}
                          </div>
                        </div>
                        <div className="aspect-square max-w-[420px] mx-auto rounded-[20px] overflow-hidden border shadow-lg bg-white text-zinc-900">
                          <div className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-zinc-50 to-white">
                            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">AURA</div>
                            <div>
                              <h2 className="text-2xl font-bold leading-tight">{generated.slides[0].header}</h2>
                              <p className="text-sm opacity-70 mt-3 leading-relaxed">{generated.slides[0].body}</p>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-xs opacity-50">1 / {generated.slides.length}</span>
                              <span className="text-xs font-medium">swipe →</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                          {generated.slides.map((slide: any) => (
                            <div key={slide.id} className={`min-w-[200px] rounded-xl border p-4 ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <div className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-white inline-block mb-2">{slide.type}</div>
                              <div className="text-sm font-semibold leading-tight">{slide.header}</div>
                              <div className="text-xs opacity-70 mt-1 whitespace-pre-line">{slide.body}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 캘린더 */}
            {currentView === 'calendar' && (
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[24px] font-bold">콘텐츠 캘린더</h1>
                    <p className="text-sm opacity-60 mt-1">드래그로 예약 · 15분 이내 충돌 경고 · 파이프라인 가시화</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex p-1 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <button onClick={() => setCalendarView('month')} className={`px-3 py-1.5 rounded-full text-sm ${calendarView === 'month' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'opacity-60'}`}>월간</button>
                      <button onClick={() => setCalendarView('week')} className={`px-3 py-1.5 rounded-full text-sm ${calendarView === 'week' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'opacity-60'}`}>주간</button>
                    </div>
                    <button className={`p-2 rounded-xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}><Filter className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className={`rounded-[20px] border shadow-sm overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                      <h3 className="font-semibold">2025년 6월</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600">최적 시간 히트맵 ON</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-7 gap-px text-center mb-2">
                        {['월', '화', '수', '목', '금', '토', '일'].map(d => <div key={d} className="text-[11px] font-medium opacity-50 py-2">{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-px">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const day = i + 1;
                          const isToday = day === 3;
                          const hasConflict = day === 5;
                          const items = day === 3 ? [{ type: '릴스', status: 'scheduled' }, { type: '카드뉴스', status: 'pending' }] : day === 4 ? [{ type: '릴스', status: 'published' }] : day === 5 ? [{ type: '릴스', status: 'scheduled' }, { type: '릴스', status: 'scheduled' }] : day === 10 ? [{ type: '카드뉴스', status: 'draft' }] : [];
                          return (
                            <div key={i} onClick={() => { setSelectedSlot(`6월 ${day}일 19:30`); setShowSlotModal(true); }} className={`min-h-[110px] p-2 border rounded-xl cursor-pointer hover:shadow-sm transition-all ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-100 bg-white'} ${isToday ? 'ring-2 ring-[#E1306C]/30' : ''} ${hasConflict ? 'bg-red-50 dark:bg-red-950/20' : ''} ${day % 7 === 2 ? 'bg-amber-50/50 dark:bg-amber-950/10' : ''}`}>
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-medium ${isToday ? 'w-6 h-6 rounded-full bg-[#E1306C] text-white flex items-center justify-center' : ''}`}>{day}</span>
                                {hasConflict && <AlertTriangle className="w-3 h-3 text-red-500" />}
                              </div>
                              <div className="mt-2 space-y-1">
                                {items.map((it, idx) => (
                                  <div key={idx} className={`text-[10px] px-1.5 py-1 rounded-full font-medium truncate ${it.status === 'scheduled' ? 'bg-blue-500 text-white' : it.status === 'pending' ? 'bg-amber-400 text-black' : it.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                                    {it.type}
                                  </div>
                                ))}
                              </div>
                              {day % 7 === 2 && <div className="mt-1 text-[9px] text-amber-600 font-medium">🔥 최적</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className={`rounded-[20px] border p-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-3">상태 범례</h3>
                      <div className="space-y-2">
                        {[
                          { label: '초안', color: 'bg-zinc-300', count: 4 },
                          { label: '승인 대기', color: 'bg-amber-400', count: 2 },
                          { label: '예약됨', color: 'bg-blue-500', count: 8 },
                          { label: '게시됨', color: 'bg-emerald-500', count: 23 },
                          { label: '실패', color: 'bg-red-500', count: 1 },
                        ].map(s => (
                          <div key={s.label} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${s.color}`} />{s.label}</div>
                            <span className="font-medium">{s.count}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`mt-4 p-3 rounded-xl border text-xs ${isDark ? 'bg-red-950/30 border-red-900/50 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        <div className="flex gap-1.5 font-medium"><AlertTriangle className="w-4 h-4" /> 충돌 경고</div>
                        <div className="mt-1 opacity-80">6/5 19:30 @brand_a_official 2건 15분 이내 중복 예약</div>
                      </div>
                    </div>

                    <div className={`rounded-[20px] border p-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-3">발행 파이프라인</h3>
                      <div className="space-y-3">
                        {[
                          { step: '1. 검증', desc: '형식/권한/한도 체크', done: true },
                          { step: '2. URL 업로드', desc: '미디어 URL 생성', done: true },
                          { step: '3. 컨테이너 생성', desc: 'IG Graph API', done: true },
                          { step: '4. FINISHED 대기', desc: '최대 60초 폴링', done: false, active: true },
                          { step: '5. publish', desc: 'media_publish', done: false },
                          { step: '6. ID 저장', desc: 'ig_media_id 보관', done: false },
                          { step: '7. Insights 예약', desc: '1~15분 후 폴링', done: false },
                        ].map(item => (
                          <div key={item.step} className="flex gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.done ? 'bg-emerald-500 text-white' : item.active ? 'bg-blue-500 text-white animate-pulse' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                              {item.done ? <Check className="w-3.5 h-3.5" /> : <span className="text-[10px]">{item.step[0]}</span>}
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${item.active ? 'text-blue-600 dark:text-blue-400' : ''}`}>{item.step}</div>
                              <div className="text-xs opacity-60">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 수신함 */}
            {currentView === 'inbox' && (
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[24px] font-bold">수신함 · 댓글 운영</h1>
                    <p className="text-sm opacity-60 mt-1">DM 대량발송 제외 · 댓글 스레드만 운영 · 기본 승인 모드</p>
                  </div>
                  <div className={`inline-flex p-1 rounded-full border text-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    {[
                      { id: 'unprocessed', label: '미처리', count: 12 },
                      { id: 'draft', label: '초안대기', count: 5 },
                      { id: 'auto', label: '자동처리', count: 34 },
                      { id: 'escalation', label: '에스컬레이션', count: 2 },
                    ].map(t => (
                      <button key={t.id} onClick={() => setInboxTab(t.id as InboxTab)} className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${inboxTab === t.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow' : 'opacity-60'}`}>
                        {t.label} <span className={`text-[11px] px-1 py-0.5 rounded-full ${inboxTab === t.id ? 'bg-white/20' : 'bg-zinc-200 dark:bg-zinc-700'}`}>{t.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
                  {/* Rules Engine */}
                  <div className={`rounded-[20px] border p-5 h-fit sticky top-[80px] ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-[#E1306C]" /> 규칙 엔진</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold opacity-60 mb-2">조건 (AND)</div>
                        <div className="space-y-2">
                          {[
                            { icon: Search, label: '키워드: 배송, 주문, 언제' },
                            { icon: HelpCircle, label: '의도: 질문' },
                            { icon: Globe, label: '언어: ko' },
                            { icon: UserCheck, label: '작성자: 팔로워' },
                          ].map(c => (
                            <div key={c.label} className={`flex items-center gap-2 text-xs p-2.5 rounded-xl border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <c.icon className="w-3.5 h-3.5 opacity-60" />{c.label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold opacity-60 mb-2">액션</div>
                        <div className={`p-3 rounded-xl border-2 border-dashed ${isDark ? 'border-zinc-700 bg-zinc-800/50' : 'border-zinc-300 bg-amber-50/50'}`}>
                          <div className="text-xs font-medium flex items-center gap-1.5"><Wand2 className="w-3.5 h-3.5" /> AI 초안 생성 + 배정</div>
                          <div className="text-[11px] opacity-60 mt-1">담당자: CS팀 · 템플릿: 배송문의_v2</div>
                        </div>
                      </div>
                      <div className={`rounded-xl p-3 border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                        <div className="text-xs font-bold opacity-60 mb-2 flex items-center gap-1"><Shield className="w-3 h-3" /> 안전장치</div>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between"><span>금칙어 필터</span><span className="text-emerald-600">ON</span></div>
                          <div className="flex justify-between"><span>쿨다운</span><span>5분</span></div>
                          <div className="flex justify-between"><span>시간당 상한</span><span>30건</span></div>
                          <div className="flex justify-between"><span>야간 OFF</span><span>22:00-08:00</span></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-medium">규칙 저장</button>
                        <button className={`px-3 py-2 rounded-xl border text-xs ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>미리보기</button>
                      </div>
                      <div className={`text-[11px] p-2.5 rounded-xl ${isDark ? 'bg-amber-950/30 text-amber-300 border border-amber-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                        ⚠️ 자동 발송은 규칙별 Opt-in 필요. 기본값은 승인 모드입니다.
                      </div>
                    </div>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-3">
                    {mockComments.map(c => (
                      <div key={c.id} className={`rounded-[20px] border p-5 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <div className="flex gap-3">
                          <img src={c.avatar} alt={c.user} className="w-10 h-10 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">@{c.user}</span>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${c.intent === '질문' ? 'bg-blue-500/10 text-blue-600' : c.intent === '칭찬' ? 'bg-emerald-500/10 text-emerald-600' : c.intent === '불만' ? 'bg-red-500/10 text-red-600' : 'bg-zinc-500/10 text-zinc-600'}`}>{c.intent}</span>
                              <span className="text-xs opacity-50">{c.time}</span>
                              <span className="text-xs opacity-50 flex items-center gap-1"><Heart className="w-3 h-3" />{c.likes}</span>
                            </div>
                            <p className="text-[14px] mt-2 leading-relaxed">{c.text}</p>
                            {c.aiDraft && (
                              <div className={`mt-3 rounded-xl p-3 border-l-4 ${isDark ? 'bg-zinc-800 border-l-[#E1306C] border-zinc-700' : 'bg-violet-50 border-l-[#E1306C] border-violet-100'}`}>
                                <div className="flex items-center gap-1.5 text-xs font-medium mb-1"><Sparkles className="w-3.5 h-3.5 text-[#E1306C]" /> AI 초안 · 승인 대기</div>
                                <p className="text-[13px] leading-relaxed">{c.aiDraft}</p>
                              </div>
                            )}
                            <div className="mt-3 flex gap-2">
                              <button className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-medium flex items-center gap-1.5">
                                <Send className="w-3.5 h-3.5" /> 초안 보내기
                              </button>
                              <button className={`px-3 py-2 rounded-xl border text-xs ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}`}>숨김 제안</button>
                              <button className={`px-3 py-2 rounded-xl border text-xs ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}`}>무시</button>
                            </div>
                          </div>
                          <button className={`p-1.5 rounded-lg h-fit ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}><MoreHorizontal className="w-4 h-4 opacity-50" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 성과 */}
            {currentView === 'performance' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[24px] font-bold">성과 대시보드</h1>
                    <p className="text-sm opacity-60 mt-1">L1/L2/L3 데이터 파이프라인 · 기준 시각 표시</p>
                  </div>
                  <button onClick={handleExcelExport} disabled={isExporting} className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium flex items-center gap-2 shadow-sm disabled:opacity-50">
                    <Download className="w-4 h-4" /> {isExporting ? `내보내는 중 ${Math.round(excelProgress)}%` : '엑셀로 받기'}
                  </button>
                </div>

                {/* L1/L2/L3 Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { level: 'L1', title: '앱 이벤트 즉시', desc: 'SSE · 0~1초 · 게시/댓글/워커', color: 'from-emerald-500 to-teal-600', time: '방금 · 14:23:11' },
                    { level: 'L2', title: '운영큐 5초', desc: '예약 처리 · 상태 동기화', color: 'from-blue-500 to-indigo-600', time: '5초 전 · 14:23:06' },
                    { level: 'L3', title: 'Insights 1~15분 폴링', desc: 'Meta Graph API · 도달/노출', color: 'from-violet-500 to-purple-600', time: '3분 전 · 14:20:12' },
                  ].map(l => (
                    <div key={l.level} className={`rounded-[16px] border p-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${l.color} text-white flex items-center justify-center text-xs font-bold`}>{l.level}</div>
                        <span className="text-[11px] opacity-60">{l.time}</span>
                      </div>
                      <div className="font-semibold text-sm">{l.title}</div>
                      <div className="text-xs opacity-60 mt-1">{l.desc}</div>
                    </div>
                  ))}
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {kpiData.map(k => (
                    <div key={k.label} className={`rounded-[16px] border p-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <div className="text-[11px] opacity-60">{k.label}</div>
                      <div className="text-[20px] font-bold mt-1">{k.value}</div>
                      <div className={`text-xs mt-1 flex items-center gap-1 ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>
                        {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.delta}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Reach Heatmap */}
                  <div className={`rounded-[20px] border p-5 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className="font-semibold text-sm mb-4">도달 히트맵 (요일 × 시간)</h3>
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="min-w-[520px]">
                        <div className="flex gap-1 mb-1 ml-[40px]">
                          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="flex-1 text-[10px] opacity-40 text-center">{6 + i * 2}:00</div>)}
                        </div>
                        {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                          <div key={day} className="flex gap-1 mb-1 items-center">
                            <div className="w-[32px] text-[11px] font-medium shrink-0">{day}</div>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const intensity = Math.random();
                              const isHot = (day === '수' && i >= 14 && i <= 16) || (day === '금' && i >= 18);
                              return <div key={i} className="flex-1 h-6 rounded-[4px]" style={{ background: isHot ? '#E1306C' : `rgba(225,48,108,${0.05 + intensity * 0.4})` }} title={`${day} ${Math.floor(i / 2) + 6}:${i % 2 ? '30' : '00'}`} />;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs opacity-60">최적 슬롯: 수 19:30 · 금 20:00 · 토 11:00</div>
                      <div className="flex gap-1 items-center text-[10px] opacity-50"><div className="w-3 h-3 rounded-sm bg-[#E1306C]/10" /> 낮음 <div className="w-3 h-3 rounded-sm bg-[#E1306C]" /> 높음</div>
                    </div>
                  </div>

                  {/* Content Type Performance */}
                  <div className="space-y-4">
                    <div className={`rounded-[20px] border p-5 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-4">콘텐츠 유형 성과</h3>
                      <div className="space-y-3">
                        {[
                          { type: '릴스', reach: 78, color: 'bg-[#E1306C]' },
                          { type: '카드뉴스', reach: 62, color: 'bg-violet-500' },
                          { type: '이미지', reach: 45, color: 'bg-zinc-400' },
                        ].map(c => (
                          <div key={c.type}>
                            <div className="flex justify-between text-xs mb-1"><span>{c.type}</span><span className="font-medium">{c.reach}% 도달률</span></div>
                            <div className={`h-2 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'} overflow-hidden`}><div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.reach}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-[20px] border p-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-3">계정 비교</h3>
                      <div className="space-y-2">
                        {mockAccounts.map(acc => (
                          <div key={acc.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><img src={acc.avatar} className="w-6 h-6 rounded-full" alt="" /><span className="text-xs font-medium">@{acc.username}</span></div>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="opacity-60">{acc.followers}</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${acc.id === '1' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{acc.id === '1' ? '+12%' : '+3%'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-[20px] border p-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <h3 className="font-semibold text-sm mb-3">Top 5 최적 시간</h3>
                      <div className="space-y-2.5">
                        {[
                          { time: '수요일 19:30', reason: '퇴근 후 도달 +34%', score: 94 },
                          { time: '금요일 20:00', reason: '주말 계획 탐색', score: 89 },
                          { time: '토요일 11:00', reason: '브런치 타임 저장 ↑', score: 86 },
                          { time: '화요일 12:30', reason: '점심시간 노출 ↑', score: 82 },
                          { time: '일요일 21:00', reason: '다음주 준비 검색', score: 78 },
                        ].map(s => (
                          <div key={s.time} className="flex items-center justify-between">
                            <div><div className="text-xs font-medium">{s.time}</div><div className="text-[11px] opacity-60">{s.reason}</div></div>
                            <div className={`text-xs font-bold px-2 py-1 rounded-full ${s.score > 90 ? 'bg-[#E1306C] text-white' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{s.score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export progress */}
                {isExporting && (
                  <div className={`rounded-[16px] border p-4 flex items-center gap-4 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="flex-1">
                      <div className="text-sm font-medium">엑셀 내보내기 작업 진행 중...</div>
                      <div className="text-xs opacity-60 mt-1">기간: 2025-05-01~2025-06-03 · 계정: 전체 · L3 기준 시각 포함</div>
                      <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#E1306C] to-[#F77737] transition-all duration-300" style={{ width: `${excelProgress}%` }} /></div>
                    </div>
                    <div className="text-lg font-bold">{Math.round(excelProgress)}%</div>
                  </div>
                )}
              </div>
            )}

            {/* 설정 */}
            {currentView === 'settings' && (
              <div className="space-y-6 max-w-[960px]">
                <div>
                  <h1 className="text-[24px] font-bold">설정</h1>
                  <p className="text-sm opacity-60 mt-1">계정 연결 · 팀 · 프록시 게이트웨이 · 보안</p>
                </div>

                {/* IG Account */}
                <div className={`rounded-[20px] border p-6 shadow-sm ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold flex items-center gap-2"><Key className="w-4 h-4 text-[#E1306C]" /> 계정 연결 · OAuth</h3>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600">공식 API만 사용</span>
                  </div>

                  {oauthStep === 'idle' ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-3">
                        {mockAccounts.map(acc => (
                          <div key={acc.id} className={`rounded-xl border p-4 flex items-center gap-3 ${isDark ? 'border-zinc-800 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'}`}>
                            <img src={acc.avatar} className="w-10 h-10 rounded-full" alt="" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">@{acc.username}</div>
                              <div className="text-xs opacity-60">{acc.type} · {acc.followers}</div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { setOauthStep('connecting'); setTimeout(() => setOauthStep('connected'), 2200); }} className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#1877F2] text-white text-sm font-medium flex items-center gap-2 justify-center shadow-sm">
                        <ExternalLink className="w-4 h-4" /> Meta OAuth로 계정 연결하기
                      </button>
                      <div className="text-[11px] opacity-50">연결 해제 시 예약된 콘텐츠는 동결(freeze)됩니다. 토큰은 AES-GCM + KMS로 암호화되어 Vault에 보관됩니다.</div>
                    </div>
                  ) : oauthStep === 'connecting' ? (
                    <div className="py-12 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center animate-pulse"><span className="text-white font-bold text-xl">f</span></div>
                      <div className="text-sm font-medium">Meta OAuth 인증 중...</div>
                      <div className="text-xs opacity-60">instagram_basic, instagram_content_publish, instagram_manage_comments 스코프 요청</div>
                      <div className="flex gap-1 mt-2"><div className="w-2 h-2 rounded-full bg-[#1877F2] animate-bounce" /><div className="w-2 h-2 rounded-full bg-[#1877F2] animate-bounce delay-100" /><div className="w-2 h-2 rounded-full bg-[#1877F2] animate-bounce delay-200" /></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`rounded-xl border p-4 ${isDark ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'}`}>
                        <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300"><Check className="w-4 h-4" /> 연결 완료 · 토큰 Vault 저장됨 (마스킹)</div>
                        <div className="mt-3 grid md:grid-cols-2 gap-3 text-xs font-mono">
                          <div><span className="opacity-60">ig_user_id:</span> 1784140•••••••</div>
                          <div><span className="opacity-60">username:</span> @brand_a_official</div>
                          <div><span className="opacity-60">type:</span> BUSINESS</div>
                          <div><span className="opacity-60">followers:</span> 24.3K</div>
                          <div className="md:col-span-2"><span className="opacity-60">scopes:</span> instagram_basic, content_publish, manage_comments, insights</div>
                          <div className="md:col-span-2"><span className="opacity-60">token:</span> EAAGm0••••••••••••••••••••••••••••••••••••••••••••••••••• (AES-GCM+KMS)</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setOauthStep('idle')} className={`px-4 py-2 rounded-xl border text-sm ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>연결 해제 (예약 동결)</button>
                        <button className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm">계정 별칭 설정</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`rounded-[20px] border p-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Server className="w-4 h-4" /> 프록시 게이트웨이</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="opacity-60">Tenant 라우팅</span><span className="font-medium">고정 IP · KR-01</span></div>
                      <div className="flex justify-between"><span className="opacity-60">헬스체크</span><span className="text-emerald-600 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> 정상 (23ms)</span></div>
                      <div className="flex justify-between"><span className="opacity-60">서킷 브레이커</span><span className="font-medium">ON · 임계 5회</span></div>
                      <div className="flex justify-between"><span className="opacity-60">로그 마스킹</span><span className="font-medium">PII 자동 마스킹</span></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className={`flex-1 py-2 rounded-xl border text-xs font-medium ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>게이트웨이 로그</button>
                      <button className="flex-1 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-medium">IP 교체</button>
                    </div>
                  </div>

                  <div className={`rounded-[20px] border p-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> 보안 & 감사</h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between"><span>비밀번호 해시</span><span className="font-mono opacity-70">Argon2id</span></div>
                      <div className="flex justify-between"><span>토큰 암호화</span><span className="font-mono opacity-70">AES-GCM + KMS</span></div>
                      <div className="flex justify-between"><span>2FA TOTP</span><span className="flex items-center gap-2"><span className="text-emerald-600">활성</span><div className="w-8 h-4 rounded-full bg-emerald-500 p-0.5"><div className="w-3 h-3 rounded-full bg-white ml-auto" /></div></span></div>
                      <div className="flex justify-between"><span>감사 로그</span><span className="opacity-70">최근 1,243건 보관</span></div>
                    </div>
                    <button className={`mt-4 w-full py-2 rounded-xl border text-xs ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>감사 로그 다운로드</button>
                  </div>
                </div>

                <div className={`rounded-[20px] border p-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <h3 className="font-semibold text-sm mb-4">멤버십 & 역할</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-xs opacity-60 border-b border-zinc-200 dark:border-zinc-800"><th className="text-left py-2 font-medium">역할</th><th className="text-left py-2 font-medium">권한</th><th className="text-left py-2 font-medium">티어 제한</th></tr></thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        <tr><td className="py-2.5 font-medium">Admin</td><td className="py-2.5 text-xs opacity-70">전체 관리 · 결제 · 계정 연결</td><td className="py-2.5"><span className="text-xs px-2 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black">모든 티어</span></td></tr>
                        <tr><td className="py-2.5 font-medium">담당자</td><td className="py-2.5 text-xs opacity-70">콘텐츠 생성 · 댓글 답변</td><td className="py-2.5"><span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">Starter 이상</span></td></tr>
                        <tr><td className="py-2.5 font-medium">승인자</td><td className="py-2.5 text-xs opacity-70">승인/반려 · 예약 확정</td><td className="py-2.5"><span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">Pro 이상</span></td></tr>
                        <tr><td className="py-2.5 font-medium">뷰어</td><td className="py-2.5 text-xs opacity-70">열람만 가능</td><td className="py-2.5"><span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">Free 이상</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                    {[
                      { tier: 'Free', spec: '1계정 · 15개/월' },
                      { tier: 'Starter', spec: '3계정 · 90개/월' },
                      { tier: 'Pro', spec: '10계정 · 400개/월', active: true },
                      { tier: 'Agency', spec: '무제한 · 맞춤' },
                    ].map(t => (
                      <div key={t.tier} className={`rounded-xl p-3 border ${t.active ? 'border-[#E1306C] bg-[#E1306C]/5' : isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                        <div className="text-xs font-bold">{t.tier} {t.active && '✓'}</div>
                        <div className="text-[11px] opacity-60 mt-1">{t.spec}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-[20px] border p-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <h3 className="font-semibold text-sm mb-3">실패 분류 & 재시도 정책</h3>
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    {[
                      { type: '형식 오류', color: 'bg-amber-500', retry: '재시도 불가 · 수정 필요' },
                      { type: '권한 오류', color: 'bg-red-500', retry: '토큰 재발급 필요' },
                      { type: '한도 초과', color: 'bg-orange-500', retry: '24시간 후 재시도' },
                      { type: '일시 장애', color: 'bg-blue-500', retry: '지수 백오프 재시도 (2^n초)' },
                      { type: '정책 거부', color: 'bg-zinc-500', retry: '재시도 불가 · 가이드 확인' },
                    ].map(f => (
                      <div key={f.type} className={`p-3 rounded-xl border flex items-center justify-between ${isDark ? 'border-zinc-800 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'}`}>
                        <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${f.color}`} />{f.type}</div>
                        <span className="opacity-60">{f.retry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Nav Mobile */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl ${isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`} style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        <div className="flex justify-around py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button key={item.id} onClick={() => setCurrentView(item.id)} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl relative ${active ? 'text-[#E1306C]' : 'opacity-60'}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
                {item.badge && <span className="absolute -top-1 -right-0 w-4 h-4 bg-[#E1306C] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Calendar Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSlotModal(false)} />
          <div className={`relative w-full max-w-md rounded-[20px] border shadow-2xl p-6 animate-slideIn ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">이 시간에 예약</h3>
              <button onClick={() => setShowSlotModal(false)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}><X className="w-4 h-4" /></button>
            </div>
            <div className="text-sm font-medium mb-4 flex items-center gap-2"><Clock className="w-4 h-4" />{selectedSlot} · 최적 슬롯</div>
            <div className="space-y-3">
              <select className={`w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                <option>@brand_a_official</option><option>@brand_b_kr</option>
              </select>
              <select className={`w-full rounded-xl border px-3 py-2.5 text-sm ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                <option>릴스</option><option>카드뉴스</option><option>이미지</option>
              </select>
            </div>
            <button onClick={() => setShowSlotModal(false)} className="mt-5 w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium">예약 슬롯 확정</button>
          </div>
        </div>
      )}

      {/* Feedback Widget */}
      <div className="fixed bottom-[84px] md:bottom-6 right-4 z-30 flex flex-col items-end gap-3">
        {feedbackOpen && (
          <div className={`w-[320px] rounded-[20px] border shadow-2xl p-5 animate-slideIn ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">의견 보내기</h4>
              <button onClick={() => setFeedbackOpen(false)}><X className="w-4 h-4 opacity-50" /></button>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {['버그', '불편', '기능요청', '정책오해', '칭찬'].map(t => (
                <button key={t} onClick={() => setFeedbackType(t)} className={`text-xs px-2.5 py-1 rounded-full border ${feedbackType === t ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white' : isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>{t}</button>
              ))}
            </div>
            <textarea placeholder="어떤 점이 불편하셨나요? 자세히 알려주세요..." className={`w-full rounded-xl border p-3 text-sm h-[80px] resize-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
            <button className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-br from-[#E1306C] to-[#F77737] text-white text-sm font-medium">보내기</button>
          </div>
        )}
        <button onClick={() => setFeedbackOpen(!feedbackOpen)} className="px-4 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="w-4 h-4" /> 의견
        </button>
      </div>
    </div>
  );
}
