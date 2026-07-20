import { useState } from 'react'
import { VIBE_CHIPS } from '../../utils/constants'
import { generateId } from '../../utils/storage'

export default function AddSongModal({ onSave, onClose, initial }) {
  const [form, setForm] = useState(
    initial
      ? { title: initial.title || '', description: initial.description || '', vibes: initial.vibes || [], spotifyLink: initial.spotifyLink || '' }
      : { title: '', description: '', vibes: [], spotifyLink: '' }
  )

  const toggleVibe = (v) => {
    setForm(f => ({
      ...f,
      vibes: f.vibes.includes(v) ? f.vibes.filter(x => x !== v) : [...f.vibes, v]
    }))
  }

  const handleSave = () => {
    if (!form.title.trim()) return
    onSave({
      id: generateId(),
      ...form,
      title: form.title.trim(),
      dateAdded: new Date().toISOString()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 shadow-2xl fade-in max-h-[90vh] overflow-y-auto scroll-hide">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-bold text-xl text-[#F2F0EB]">Add a Song</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#888880] hover:text-[#F2F0EB] flex items-center justify-center transition-colors text-sm">✕</button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Song Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Enter song title"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the song — vibe, story, what makes it special..."
              rows={3}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">Vibe</label>
            <div className="flex flex-wrap gap-2">
              {VIBE_CHIPS.map(v => (
                <button
                  key={v}
                  onClick={() => toggleVibe(v)}
                  className={`py-1.5 px-3 rounded-full text-xs font-medium border transition-all ${
                    form.vibes.includes(v)
                      ? 'bg-[#C8FF57] text-[#0A0A0A] border-[#C8FF57]'
                      : 'bg-transparent text-[#888880] border-[#2A2A2A] hover:border-[#C8FF57]/50 hover:text-[#F2F0EB]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Spotify Link</label>
            <input
              type="url"
              value={form.spotifyLink}
              onChange={e => setForm(f => ({ ...f, spotifyLink: e.target.value }))}
              placeholder="https://open.spotify.com/track/..."
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-syne font-bold text-sm bg-[#1A1A1A] text-[#888880] hover:text-[#F2F0EB] border border-[#2A2A2A] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.title.trim()}
            className={`flex-1 py-3 rounded-xl font-syne font-bold text-sm transition-all ${
              form.title.trim()
                ? 'bg-[#C8FF57] text-[#0A0A0A] hover:bg-[#d4ff6a]'
                : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
            }`}
          >
            Save Song
          </button>
        </div>
      </div>
    </div>
  )
}
