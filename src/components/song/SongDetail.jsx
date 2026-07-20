import { useState } from 'react'
import Nav from '../shared/Nav'
import AddSongModal from '../dashboard/AddSongModal'
import { getCampaignsBySongAndTool, getSongs, saveSongs } from '../../utils/storage'

const COLUMNS = [
  { key: 'playlist', label: 'Playlist Pitching', active: true },
  { key: 'press', label: 'Press & Blog', active: true },
  { key: 'booking', label: 'Show Booking', active: false },
  { key: 'social', label: 'Social Strategy', active: true },
]

function KanbanColumn({ col, songId, onRunTool, onViewResults }) {
  const campaigns = getCampaignsBySongAndTool(songId, col.key)
  const latest = campaigns[0]

  return (
    <div className={`bg-[#111] rounded-xl border p-4 flex flex-col gap-3 ${
      col.active ? 'border-[#2A2A2A]' : 'border-[#1A1A1A] opacity-50'
    }`} style={col.active && latest ? { borderTopColor: '#C8FF57', borderTopWidth: 2 } : {}}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${col.active ? 'bg-[#C8FF57]' : 'bg-[#2A2A2A]'}`} />
        <span className="text-xs font-syne font-bold text-[#F2F0EB] uppercase tracking-wider">{col.label}</span>
        {!col.active && <span className="ml-auto text-[9px] bg-[#1A1A1A] text-[#444] border border-[#2A2A2A] px-2 py-0.5 rounded-full">SOON</span>}
      </div>

      {!col.active ? (
        <p className="text-xs text-[#444] mt-1">Coming soon...</p>
      ) : latest ? (
        <div className="space-y-3">
          <div>
            <span className="text-[10px] bg-[#C8FF57]/10 text-[#C8FF57] border border-[#C8FF57]/20 px-2 py-0.5 rounded-full font-semibold tracking-wider">IN PROGRESS</span>
          </div>
          <p className="text-xs text-[#888880]">Last run {new Date(latest.date).toLocaleDateString()}</p>
          {latest.results?.contacts && (
            <p className="text-xs text-[#888880]">{latest.results.contacts} targeted</p>
          )}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onViewResults(col.key, latest)}
              className="w-full py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-[#F2F0EB] hover:border-[#C8FF57]/40 transition-all"
            >
              View Results →
            </button>
            <button
              onClick={() => onRunTool(col.key)}
              className="w-full py-2 rounded-lg bg-[#C8FF57]/10 border border-[#C8FF57]/20 text-xs text-[#C8FF57] hover:bg-[#C8FF57]/20 transition-all"
            >
              Run Again →
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-[#888880]">Not Started</p>
          <button
            onClick={() => onRunTool(col.key)}
            className="w-full py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-[#C8FF57] hover:border-[#C8FF57]/40 transition-all"
          >
            Run Now →
          </button>
        </div>
      )}
    </div>
  )
}

export default function SongDetail({ song: initialSong, profile, onBack, onEditProfile, onRunTool, onViewResults }) {
  const [song, setSong] = useState(initialSong)
  const [editing, setEditing] = useState(false)

  const handleEdit = (updated) => {
    const songs = getSongs()
    const idx = songs.findIndex(s => s.id === song.id)
    if (idx >= 0) {
      songs[idx] = { ...song, ...updated }
      saveSongs(songs)
      setSong({ ...song, ...updated })
    }
    setEditing(false)
  }

  const handleDelete = () => {
    if (!confirm(`Delete "${song.title}"? This cannot be undone.`)) return
    const songs = getSongs().filter(s => s.id !== song.id)
    saveSongs(songs)
    onBack()
  }

  const allCampaigns = COLUMNS.flatMap(col => getCampaignsBySongAndTool(song.id, col.key))
  const toolLabelMap = { playlist: 'Playlist Pitching', press: 'Press & Blog', social: 'Social Strategy' }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav profile={profile} onEditProfile={onEditProfile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Dashboard
        </button>

        {/* Song header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F2F0EB] mb-2">{song.title}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile?.genre && (
                <span className="text-xs bg-[#C8FF57]/10 text-[#C8FF57] border border-[#C8FF57]/20 px-3 py-1 rounded-full font-medium">{profile.genre}</span>
              )}
              {song.vibes?.map(v => (
                <span key={v} className="text-xs bg-[#1A1A1A] text-[#888880] border border-[#2A2A2A] px-3 py-1 rounded-full">{v}</span>
              ))}
            </div>
            {song.description && <p className="text-sm text-[#888880] max-w-xl">{song.description}</p>}
            {song.spotifyLink && (
              <a
                href={song.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#1DB954] hover:text-[#1ed760] mt-2 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Open on Spotify
              </a>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-[#F2F0EB] hover:border-[#C8FF57]/40 transition-all"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-red-400 hover:border-red-400/40 transition-all"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col.key}
              col={col}
              songId={song.id}
              onRunTool={(toolKey) => onRunTool(toolKey, song)}
              onViewResults={(toolKey, campaign) => onViewResults(toolKey, song, campaign)}
            />
          ))}
        </div>

        {/* Campaign History */}
        {allCampaigns.length > 0 && (
          <section>
            <h2 className="font-syne font-bold text-lg text-[#F2F0EB] mb-4">Campaign History</h2>
            <div className="space-y-3">
              {allCampaigns.map(c => (
                <div
                  key={c.id}
                  onClick={() => onViewResults(c.tool, song, c)}
                  className="bg-[#111] border border-[#2A2A2A] rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#C8FF57]/30 transition-all cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#F2F0EB]">{toolLabelMap[c.tool] || c.tool}</p>
                    <p className="text-xs text-[#888880] mt-0.5">{new Date(c.date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs text-[#C8FF57] font-medium">View Results →</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {editing && (
        <AddSongModal
          onSave={handleEdit}
          onClose={() => setEditing(false)}
          initial={song}
        />
      )}
    </div>
  )
}
