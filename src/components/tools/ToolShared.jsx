import { useEffect, useState } from 'react'

export function LoadingScreen({ messages }) {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    if (!messages?.length) return
    const id = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 2000)
    return () => clearInterval(id)
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center">
      {/* Glow orb */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full bg-[#C8FF57]/10 blur-2xl animate-pulse" />
        <div className="relative w-32 h-32 rounded-full border-2 border-[#C8FF57]/30 border-t-[#C8FF57] spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="#C8FF57" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="#C8FF57" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      <p className="font-syne font-bold text-xl text-[#F2F0EB] text-center px-6 mb-3 transition-all">
        {messages?.[msgIdx]}
      </p>
      <div className="flex gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-[#C8FF57] dot-1" />
        <div className="w-2 h-2 rounded-full bg-[#C8FF57] dot-2" />
        <div className="w-2 h-2 rounded-full bg-[#C8FF57] dot-3" />
      </div>
    </div>
  )
}

export function ConfirmScreen({ song, profile, toolLabel, onLaunch, onBack, children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="mb-6">
          <span className="text-xs font-medium text-[#888880] uppercase tracking-widest">{toolLabel}</span>
          <h1 className="font-syne font-extrabold text-3xl text-[#F2F0EB] mt-1 mb-1">Ready to launch?</h1>
          <p className="text-sm text-[#888880]">Review your details and fire off your campaign.</p>
        </div>

        {/* Song card */}
        <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 mb-4">
          <p className="text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">Song</p>
          <p className="font-syne font-bold text-lg text-[#F2F0EB]">{song?.title}</p>
          {song?.vibes?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {song.vibes.slice(0, 4).map(v => (
                <span key={v} className="text-[10px] bg-[#1A1A1A] text-[#888880] px-2 py-0.5 rounded-full border border-[#2A2A2A]">{v}</span>
              ))}
            </div>
          )}
          {song?.description && <p className="text-xs text-[#888880] mt-2">{song.description}</p>}
        </div>

        {/* Artist card */}
        <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 mb-6">
          <p className="text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">Artist</p>
          <p className="font-syne font-bold text-lg text-[#F2F0EB]">{profile?.artistName}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#888880]">
            {profile?.genre && <span>{profile.genre}{profile?.subgenre ? ` · ${profile.subgenre}` : ''}</span>}
            {profile?.city && <span>📍 {profile.city}</span>}
            {profile?.listeners && <span>{profile.listeners} monthly listeners</span>}
          </div>
        </div>

        {children}

        <button
          onClick={onLaunch}
          className="w-full py-4 rounded-xl font-syne font-bold text-base bg-[#C8FF57] text-[#0A0A0A] hover:bg-[#d4ff6a] hover:shadow-xl hover:shadow-[#C8FF57]/20 transition-all active:scale-[0.98] pulse-glow"
        >
          Launch Campaign →
        </button>
      </div>
    </div>
  )
}
