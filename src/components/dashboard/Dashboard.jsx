import { useState } from 'react'
import Nav from '../shared/Nav'
import AddSongModal from './AddSongModal'
import { TOOL_CARDS } from '../../utils/constants'
import { getSongs, saveSongs, getCampaigns } from '../../utils/storage'

function SongCard({ song, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-52 bg-[#111] border border-[#2A2A2A] rounded-xl p-4 cursor-pointer hover:border-[#C8FF57]/40 hover:bg-[#151515] transition-all group"
    >
      <div className="w-full aspect-square rounded-lg bg-[#1A1A1A] flex items-center justify-center mb-3 overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-[#C8FF57]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5l12-2v13" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="#C8FF57" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="#C8FF57" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      <p className="text-sm font-semibold text-[#F2F0EB] truncate mb-1">{song.title}</p>
      <div className="flex flex-wrap gap-1">
        {song.vibes?.slice(0, 2).map(v => (
          <span key={v} className="text-[10px] bg-[#2A2A2A] text-[#888880] px-2 py-0.5 rounded-full">{v}</span>
        ))}
      </div>
      <p className="text-[10px] text-[#444] mt-2">{new Date(song.dateAdded).toLocaleDateString()}</p>
    </div>
  )
}

function ToolCard({ tool, onLaunch }) {
  return (
    <div className={`relative bg-[#111] border rounded-xl p-5 transition-all group ${
      tool.active
        ? 'border-[#2A2A2A] hover:border-[#C8FF57]/40 hover:bg-[#151515] cursor-pointer'
        : 'border-[#1A1A1A] opacity-50 cursor-not-allowed'
    }`}>
      {tool.pro && (
        <span className="absolute top-3 right-3 text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full tracking-wider">PRO</span>
      )}
      {!tool.active && (
        <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#1A1A1A] text-[#444] border border-[#2A2A2A] px-2 py-0.5 rounded-full tracking-wider">SOON</span>
      )}
      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        {tool.key === 'playlist' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 8 12 3 7 8" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
        {tool.key === 'press' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 22H18C19.1 22 20 21.1 20 20V8L14 2H6C4.9 2 4 2.9 4 4V22Z" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="15" x2="15" y2="15" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="11" x2="12" y2="11" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
        {tool.key === 'booking' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
        {tool.key === 'social' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.67 2 12.1 2.67 12.1 4.5L12 8H8V12H12V22H16V12H19.5L20 8H16V5C16 4.45 16.45 4 17 4H20V2H18Z" stroke="#C8FF57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </div>
      <h3 className={`font-syne font-bold text-sm mb-1 ${tool.active ? 'text-[#F2F0EB]' : 'text-[#444]'}`}>{tool.label}</h3>
      <p className={`text-xs mb-4 ${tool.active ? 'text-[#888880]' : 'text-[#333]'}`}>{tool.desc}</p>
      {tool.active && (
        <button
          onClick={() => onLaunch(tool.key)}
          className="w-full py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-[#C8FF57] text-xs font-semibold hover:bg-[#C8FF57] hover:text-[#0A0A0A] transition-all"
        >
          Launch
        </button>
      )}
    </div>
  )
}

function SongSelectorModal({ songs, toolKey, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 shadow-2xl fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-bold text-xl text-[#F2F0EB]">Select a Song</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#888880] hover:text-[#F2F0EB] flex items-center justify-center transition-colors text-sm">✕</button>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto scroll-hide">
          {songs.map(song => (
            <button
              key={song.id}
              onClick={() => onSelect(song)}
              className="w-full text-left px-4 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#C8FF57]/10 border border-[#2A2A2A] hover:border-[#C8FF57]/40 transition-all group"
            >
              <p className="text-sm font-semibold text-[#F2F0EB]">{song.title}</p>
              {song.vibes?.length > 0 && (
                <p className="text-xs text-[#888880] mt-0.5">{song.vibes.slice(0, 3).join(' · ')}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ profile, onEditProfile, onSongClick, onToolLaunch }) {
  const [songs, setSongsState] = useState(getSongs)
  const [showAddSong, setShowAddSong] = useState(false)
  const [songSelector, setSongSelector] = useState(null)
  const campaigns = getCampaigns().slice(0, 3)

  const handleAddSong = (song) => {
    const updated = [...songs, song]
    saveSongs(updated)
    setSongsState(updated)
    setShowAddSong(false)
  }

  const handleToolLaunch = (toolKey) => {
    if (songs.length === 0) {
      setShowAddSong(true)
      return
    }
    if (songs.length === 1) {
      onToolLaunch(toolKey, songs[0])
    } else {
      setSongSelector(toolKey)
    }
  }

  const toolLabelMap = { playlist: 'Playlist Pitching', press: 'Press & Blog', social: 'Social Strategy' }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav profile={profile} onEditProfile={onEditProfile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* My Songs */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-syne font-bold text-xl text-[#F2F0EB]">My Songs</h2>
            <button
              onClick={() => setShowAddSong(true)}
              className="text-xs font-semibold text-[#C8FF57] hover:text-[#d4ff6a] transition-colors"
            >
              + Add Song
            </button>
          </div>

          {songs.length === 0 ? (
            <div
              onClick={() => setShowAddSong(true)}
              className="h-36 border-2 border-dashed border-[#2A2A2A] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#C8FF57]/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-full border border-[#2A2A2A] group-hover:border-[#C8FF57]/40 flex items-center justify-center text-[#444] group-hover:text-[#C8FF57] text-xl transition-all">+</div>
              <p className="text-sm text-[#888880]">Add your first song</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scroll-hide pb-2">
              {songs.map(song => (
                <SongCard key={song.id} song={song} onClick={() => onSongClick(song)} />
              ))}
              <div
                onClick={() => setShowAddSong(true)}
                className="flex-shrink-0 w-52 h-full min-h-[160px] border-2 border-dashed border-[#2A2A2A] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#C8FF57]/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-full border border-[#2A2A2A] group-hover:border-[#C8FF57]/40 flex items-center justify-center text-[#444] group-hover:text-[#C8FF57] text-xl transition-all">+</div>
                <p className="text-xs text-[#888880]">Add Song</p>
              </div>
            </div>
          )}
        </section>

        {/* Your Tools */}
        <section>
          <h2 className="font-syne font-bold text-xl text-[#F2F0EB] mb-5">Your Tools</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOL_CARDS.map(tool => (
              <ToolCard key={tool.key} tool={tool} onLaunch={handleToolLaunch} />
            ))}
          </div>
        </section>

        {/* Recent Campaigns */}
        <section>
          <h2 className="font-syne font-bold text-xl text-[#F2F0EB] mb-5">Recent Campaigns</h2>
          {campaigns.length === 0 ? (
            <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-8 text-center">
              <p className="text-[#888880] text-sm">No campaigns yet. Launch a tool to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map(c => {
                const song = getSongs().find(s => s.id === c.songId)
                return (
                  <div
                    key={c.id}
                    className="bg-[#111] border border-[#2A2A2A] rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#C8FF57]/30 transition-all cursor-pointer"
                    onClick={() => {
                      if (song) onSongClick(song)
                    }}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#F2F0EB]">{song?.title || 'Unknown Song'}</p>
                      <p className="text-xs text-[#888880] mt-0.5">{toolLabelMap[c.tool] || c.tool} · {new Date(c.date).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs text-[#C8FF57] font-medium">View Results →</span>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {showAddSong && <AddSongModal onSave={handleAddSong} onClose={() => setShowAddSong(false)} />}
      {songSelector && (
        <SongSelectorModal
          songs={songs}
          toolKey={songSelector}
          onSelect={(song) => { setSongSelector(null); onToolLaunch(songSelector, song) }}
          onClose={() => setSongSelector(null)}
        />
      )}
    </div>
  )
}
