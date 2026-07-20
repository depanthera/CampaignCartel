import { useState } from 'react'
import { ConfirmScreen, LoadingScreen } from './ToolShared'
import { callClaude } from '../../utils/api'
import { PLATFORM_URLS } from '../../utils/constants'
import { saveCampaign, generateId } from '../../utils/storage'

const LOADING_MSGS = [
  "Your Cartel is pulling up...",
  "Locking in your targets...",
  "Campaign loading — let's eat...",
  "Finding the right curators...",
  "Analyzing your sound...",
]

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

function TrendDetail({ trend, onBack }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <span className="text-xs font-medium text-[#888880] uppercase tracking-widest">Trend Report</span>
        <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F2F0EB] mt-2 mb-4 leading-tight">{trend.title}</h1>

        {trend.stat && (
          <div className="bg-[#C8FF57]/10 border border-[#C8FF57]/20 rounded-xl p-5 mb-6">
            <p className="font-syne font-bold text-2xl text-[#C8FF57]">{trend.stat}</p>
          </div>
        )}

        {trend.pullQuote && (
          <blockquote className="border-l-4 border-[#C8FF57] pl-4 mb-6">
            <p className="text-lg text-[#F2F0EB] italic">"{trend.pullQuote}"</p>
          </blockquote>
        )}

        <p className="text-[#888880] leading-relaxed mb-6">{trend.body}</p>

        {trend.actionSteps?.length > 0 && (
          <div>
            <h3 className="font-syne font-bold text-sm uppercase tracking-widest text-[#F2F0EB] mb-3">Action Steps</h3>
            <ul className="space-y-2">
              {trend.actionSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C8FF57] text-[#0A0A0A] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-[#888880]">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function TrendReport({ data, onTrendClick }) {
  return (
    <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-6 mb-8">
      <h2 className="font-syne font-bold text-lg text-[#F2F0EB] mb-5">Trend Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {data.trendingStyles?.map((trend, i) => (
          <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
            <span className="text-[10px] font-bold text-[#C8FF57] uppercase tracking-widest block mb-1">Trending</span>
            <p className="text-sm text-[#F2F0EB] font-medium mb-2">{trend.title}</p>
            <p className="text-xs text-[#888880] mb-3">{trend.body?.slice(0, 80)}...</p>
            <button
              onClick={() => onTrendClick(trend)}
              className="text-xs text-[#C8FF57] hover:underline"
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {data.curatorInsights?.map((insight, i) => (
          <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">Curator Insight</span>
            <p className="text-sm text-[#888880]">{insight}</p>
          </div>
        ))}
      </div>
      {data.proTip && (
        <div className="bg-[#C8FF57]/5 border border-[#C8FF57]/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-[#C8FF57] uppercase tracking-widest block mb-1">Pro Tip</span>
          <p className="text-sm text-[#F2F0EB]">{data.proTip}</p>
        </div>
      )}
    </div>
  )
}

function CuratorCard({ curator }) {
  const submissionUrl = PLATFORM_URLS[curator.platform] || PLATFORM_URLS['SubmitHub']

  return (
    <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 fade-in hover:border-[#C8FF57]/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-syne font-bold text-[#F2F0EB]">{curator.curatorName}</p>
          <p className="text-xs text-[#888880]">{curator.playlistName}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-[10px] bg-[#1A1A1A] text-[#888880] border border-[#2A2A2A] px-2 py-0.5 rounded-full">{curator.platform}</span>
          {curator.trending && (
            <span className="text-[10px] bg-[#C8FF57]/10 text-[#C8FF57] border border-[#C8FF57]/20 px-2 py-0.5 rounded-full">🔥 Trending</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4 text-xs text-[#888880]">
        <span>{curator.followers?.toLocaleString()} followers</span>
        <span className="flex items-center gap-1">
          Match: <span className="text-[#C8FF57] font-bold">{curator.matchScore}%</span>
        </span>
      </div>
      <div className="mb-3 p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A]">
        <p className="text-[10px] text-[#888880] uppercase tracking-widest mb-1 font-medium">Subject Line</p>
        <p className="text-xs text-[#F2F0EB]">{curator.subjectLine}</p>
      </div>
      <div className="mb-4 p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] max-h-32 overflow-y-auto scroll-hide">
        <p className="text-[10px] text-[#888880] uppercase tracking-widest mb-1 font-medium">Pitch Body</p>
        <p className="text-xs text-[#888880] whitespace-pre-wrap">{curator.pitchBody}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton text={curator.subjectLine} label="Copy Subject" />
        <CopyButton text={curator.pitchBody} label="Copy Body" />
        <CopyButton text={`Subject: ${curator.subjectLine}\n\n${curator.pitchBody}`} label="Copy Full Email" />
        <a
          href={submissionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#C8FF57]/10 border border-[#C8FF57]/20 text-[#C8FF57] hover:bg-[#C8FF57]/20 transition-all"
        >
          Open Submission Page →
        </a>
      </div>
    </div>
  )
}

function Results({ data, song, onBack }) {
  const [trendDetail, setTrendDetail] = useState(null)

  if (trendDetail) return <TrendDetail trend={trendDetail} onBack={() => setTrendDetail(null)} />

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#F2F0EB] transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="mb-8">
          <span className="text-xs font-medium text-[#888880] uppercase tracking-widest">Playlist Pitching Results</span>
          <h1 className="font-syne font-extrabold text-3xl text-[#F2F0EB] mt-1">{song?.title}</h1>
          <p className="text-sm text-[#888880] mt-1">4 curators targeted</p>
        </div>

        {data.trendReport && <TrendReport data={data.trendReport} onTrendClick={setTrendDetail} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.curators?.map((c, i) => <CuratorCard key={i} curator={c} />)}
        </div>
      </div>
    </div>
  )
}

export default function PlaylistPitching({ song, profile, onBack, existingCampaign }) {
  const [phase, setPhase] = useState(existingCampaign ? 'results' : 'confirm')
  const [results, setResults] = useState(existingCampaign?.results || null)
  const [error, setError] = useState(null)

  const launch = async () => {
    setPhase('loading')
    setError(null)
    try {
      // Call 1: curators only — short pitches to stay well under token limit
      const curatorPrompt = `You are a music industry expert. Generate playlist curator pitches for this artist.

Artist: ${profile.artistName}
Genre: ${profile.genre}${profile.subgenre ? ` (${profile.subgenre})` : ''}
Location: ${profile.city}
Monthly Listeners: ${profile.listeners}
Song: "${song.title}"
Vibes: ${song.vibes?.join(', ') || 'N/A'}
Description: ${song.description || 'N/A'}

Return ONLY valid JSON:
{
  "curators": [
    {
      "curatorName": "string",
      "playlistName": "string",
      "followers": number,
      "platform": "string",
      "matchScore": number (75-99),
      "trending": boolean,
      "subjectLine": "string",
      "pitchBody": "string (max 100 words, 2 short paragraphs, personalized)"
    }
  ]
}
Generate exactly 4 curators. Use only these platforms: SubmitHub, Groover, Musosoup, Playlist Push, Soundplate, Daily Playlists, Spotify for Artists. Keep pitchBody under 100 words each.`

      const curatorData = await callClaude(curatorPrompt, 3000)

      // Call 2: trend report separately
      const trendPrompt = `You are a music industry analyst. Generate a trend report for a ${profile.genre}${profile.subgenre ? ` / ${profile.subgenre}` : ''} artist releasing a song called "${song.title}" with vibes: ${song.vibes?.join(', ') || 'N/A'}.

Return ONLY valid JSON:
{
  "trendingStyles": [
    {"title": "string", "stat": "string", "pullQuote": "string", "body": "string (2 sentences)", "actionSteps": ["string", "string", "string"]},
    {"title": "string", "stat": "string", "pullQuote": "string", "body": "string (2 sentences)", "actionSteps": ["string", "string", "string"]},
    {"title": "string", "stat": "string", "pullQuote": "string", "body": "string (2 sentences)", "actionSteps": ["string", "string", "string"]}
  ],
  "curatorInsights": ["string", "string"],
  "proTip": "string"
}`

      const trendData = await callClaude(trendPrompt, 1500)

      const combined = { curators: curatorData.curators, trendReport: trendData }
      const campaign = {
        id: generateId(),
        songId: song.id,
        tool: 'playlist',
        date: new Date().toISOString(),
        results: { ...combined, contacts: 4 }
      }
      saveCampaign(campaign)
      setResults(combined)
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
      toolLabel="Playlist Pitching"
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
