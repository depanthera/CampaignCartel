import { useState } from 'react'
import { ConfirmScreen, LoadingScreen } from './ToolShared'
import { callClaude } from '../../utils/api'
import { BLOG_URLS } from '../../utils/constants'
import { saveCampaign, generateId } from '../../utils/storage'

const LOADING_MSGS = [
  "Scanning active music blogs...",
  "Finding journalists for your sound...",
  "Writing your press pitches...",
  "Crafting the perfect angle...",
  "Almost ready...",
]

const BLOG_NAMES = Object.keys(BLOG_URLS)

function CopyButton({ text, label }) {
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
      {copied ? '✓ Copied' : label}
    </button>
  )
}

function PressCard({ press }) {
  const submissionUrl = BLOG_URLS[press.publication] || BLOG_URLS['Earmilk']

  return (
    <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 fade-in hover:border-[#C8FF57]/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-syne font-bold text-[#F2F0EB]">{press.publication}</p>
          <p className="text-xs text-[#888880]">{press.journalistName}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-[10px] bg-[#1A1A1A] text-[#888880] border border-[#2A2A2A] px-2 py-0.5 rounded-full">{press.beat}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4 text-xs text-[#888880]">
        <span>Reach: {press.reach}</span>
        <span className="flex items-center gap-1">
          Match: <span className="text-[#C8FF57] font-bold">{press.matchScore}%</span>
        </span>
      </div>
      <div className="mb-3 p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A]">
        <p className="text-[10px] text-[#888880] uppercase tracking-widest mb-1 font-medium">Subject Line</p>
        <p className="text-xs text-[#F2F0EB]">{press.subjectLine}</p>
      </div>
      <div className="mb-4 p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] max-h-32 overflow-y-auto scroll-hide">
        <p className="text-[10px] text-[#888880] uppercase tracking-widest mb-1 font-medium">Pitch Body</p>
        <p className="text-xs text-[#888880] whitespace-pre-wrap">{press.pitchBody}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton text={press.subjectLine} label="Copy Subject" />
        <CopyButton text={press.pitchBody} label="Copy Body" />
        <CopyButton text={`Subject: ${press.subjectLine}\n\n${press.pitchBody}`} label="Copy Full Email" />
        <a
          href={submissionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#C8FF57]/10 border border-[#C8FF57]/20 text-[#C8FF57] hover:bg-[#C8FF57]/20 transition-all"
        >
          Submit on SubmitHub →
        </a>
      </div>
    </div>
  )
}

function Results({ data, song, onBack }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="mb-8">
          <span className="text-xs font-medium text-[#888880] uppercase tracking-widest">Press & Blog Results</span>
          <h1 className="font-syne font-extrabold text-3xl text-[#F2F0EB] mt-1">{song?.title}</h1>
          <p className="text-sm text-[#888880] mt-1">4 publications targeted</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.press?.map((p, i) => <PressCard key={i} press={p} />)}
        </div>
      </div>
    </div>
  )
}

export default function PressAndBlog({ song, profile, onBack, existingCampaign }) {
  const [phase, setPhase] = useState(existingCampaign ? 'results' : 'confirm')
  const [results, setResults] = useState(existingCampaign?.results || null)
  const [error, setError] = useState(null)

  const launch = async () => {
    setPhase('loading')
    setError(null)
    try {
      const blogList = BLOG_NAMES.join(', ')
      const prompt = `You are a music PR expert. Generate realistic press pitches for this artist.

Artist: ${profile.artistName}
Genre: ${profile.genre}${profile.subgenre ? ` (${profile.subgenre})` : ''}
Location: ${profile.city}
Monthly Listeners: ${profile.listeners}
Song: "${song.title}"
Vibes: ${song.vibes?.join(', ') || 'N/A'}
Description: ${song.description || 'N/A'}

You MUST only use publication names from this exact list: ${blogList}

Return ONLY valid JSON:
{
  "press": [
    {
      "publication": "string (must be from the list above)",
      "journalistName": "string",
      "beat": "string",
      "reach": "string (e.g. '50K monthly readers')",
      "matchScore": number (75-99),
      "subjectLine": "string",
      "pitchBody": "string (3-4 paragraphs, personalized, professional)"
    }
  ]
}
Generate exactly 4 press contacts using different publications from the list.`

      const data = await callClaude(prompt, 2000)
      const campaign = {
        id: generateId(),
        songId: song.id,
        tool: 'press',
        date: new Date().toISOString(),
        results: { ...data, contacts: 4 }
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
      toolLabel="Press & Blog"
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
