import { useState } from 'react'
import { ConfirmScreen, LoadingScreen } from './ToolShared'
import { callClaude } from '../../utils/api'
import { saveCampaign, generateId } from '../../utils/storage'

const LOADING_MSGS = [
  "Mapping your content strategy...",
  "Building your TikTok plan...",
  "Finalizing your Instagram strategy...",
  "Crafting content ideas...",
  "Almost done...",
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        copied ? 'bg-[#C8FF57]/20 border-[#C8FF57]/40 text-[#C8FF57]' : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#888880] hover:text-[#F2F0EB] hover:border-[#C8FF57]/30'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy Caption'}
    </button>
  )
}

function ContentIdeaCard({ idea }) {
  const [open, setOpen] = useState(false)
  const platformColors = {
    TikTok: 'text-[#69C9D0]',
    Instagram: 'text-pink-400',
    YouTube: 'text-red-400',
    Twitter: 'text-blue-400',
    X: 'text-blue-400',
  }
  const color = platformColors[idea.platform] || 'text-[#C8FF57]'

  return (
    <div className="bg-[#111] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#151515] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold ${color}`}>{idea.platform}</span>
          <span className="text-sm text-[#F2F0EB]">{idea.idea}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 text-[#888880] transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[#1A1A1A] pt-3 space-y-3">
          <p className="text-xs text-[#888880]">{idea.caption}</p>
          <CopyButton text={idea.caption} />
        </div>
      )}
    </div>
  )
}

function Results({ data, song, onBack }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="mb-8">
          <span className="text-xs font-medium text-[#888880] uppercase tracking-widest">Social Strategy Results</span>
          <h1 className="font-syne font-extrabold text-3xl text-[#F2F0EB] mt-1">{song?.title}</h1>
        </div>

        <div className="space-y-5">
          {/* Overview */}
          <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 fade-in">
            <span className="text-[10px] font-bold text-[#C8FF57] uppercase tracking-widest block mb-2">Strategy Overview</span>
            <p className="text-sm text-[#888880] leading-relaxed">{data.overview}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* TikTok */}
            <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 fade-in" style={{ borderTopColor: '#69C9D0', borderTopWidth: 2 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-syne font-bold text-[#69C9D0]">TikTok Tips</span>
              </div>
              <ul className="space-y-3">
                {data.tiktok?.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#69C9D0]/20 text-[#69C9D0] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-xs text-[#888880]">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram */}
            <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 fade-in" style={{ borderTopColor: '#E1306C', borderTopWidth: 2 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-syne font-bold text-pink-400">Instagram Tips</span>
              </div>
              <ul className="space-y-3">
                {data.instagram?.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-xs text-[#888880]">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Ideas */}
          <div className="fade-in">
            <h2 className="font-syne font-bold text-lg text-[#F2F0EB] mb-4">Content Ideas</h2>
            <div className="space-y-3">
              {data.ideas?.map((idea, i) => <ContentIdeaCard key={i} idea={idea} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SocialStrategy({ song, profile, onBack, existingCampaign }) {
  const [phase, setPhase] = useState(existingCampaign ? 'results' : 'confirm')
  const [results, setResults] = useState(existingCampaign?.results || null)
  const [error, setError] = useState(null)

  const launch = async () => {
    setPhase('loading')
    setError(null)
    try {
      const prompt = `You are a music social media expert. Generate a strategy for ${profile.artistName} - "${song.title}" (${profile.genre}${profile.subgenre ? `, ${profile.subgenre}` : ''}). The song vibes are: ${song.vibes?.join(', ') || 'N/A'}.

Return ONLY this JSON:
{
  "overview": "string (2-3 sentences about the overall strategy)",
  "tiktok": ["tip1", "tip2", "tip3", "tip4", "tip5"],
  "instagram": ["tip1", "tip2", "tip3", "tip4", "tip5"],
  "ideas": [
    {"platform": "TikTok or Instagram", "idea": "string (short title)", "caption": "string (ready-to-post caption with hashtags)"},
    {"platform": "TikTok or Instagram", "idea": "string", "caption": "string"},
    {"platform": "TikTok or Instagram", "idea": "string", "caption": "string"},
    {"platform": "TikTok or Instagram", "idea": "string", "caption": "string"},
    {"platform": "TikTok or Instagram", "idea": "string", "caption": "string"},
    {"platform": "TikTok or Instagram", "idea": "string", "caption": "string"}
  ]
}`

      const data = await callClaude(prompt, 1500)
      const campaign = {
        id: generateId(),
        songId: song.id,
        tool: 'social',
        date: new Date().toISOString(),
        results: data
      }
      saveCampaign(campaign)
      setResults(data)
      setPhase('results')
    } catch (e) {
      setError(e.message || 'Something went wrong. Check your API key.')
      setPhase('confirm')
    }
  }

  if (phase === 'loading') return <LoadingScreen messages={LOADING_MSGS} />

  if (phase === 'results') return (
    <Results data={results} song={song} onBack={onBack} />
  )

  return (
    <ConfirmScreen
      song={song}
      profile={profile}
      toolLabel="Social Strategy"
      onLaunch={launch}
      onBack={onBack}
    >
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
          {error}
        </div>
      )}
    </ConfirmScreen>
  )
}
