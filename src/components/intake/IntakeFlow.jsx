import { useState } from 'react'
import LABackground from '../shared/LABackground'
import { GENRES, MONTHLY_LISTENERS, RELEASE_FREQ, GOALS } from '../../utils/constants'
import { saveProfile, generateId } from '../../utils/storage'

const STEPS = ['Who are you?', 'Where are you at?', 'Your Goals']

function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-syne flex-shrink-0 transition-all duration-300 ${
              i < step ? 'bg-[#C8FF57] text-[#0A0A0A]' :
              i === step ? 'bg-[#C8FF57] text-[#0A0A0A] ring-4 ring-[#C8FF57]/20' :
              'bg-[#1A1A1A] text-[#888880] border border-[#2A2A2A]'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? 'text-[#F2F0EB]' : 'text-[#888880]'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px flex-1 transition-all duration-500 ${i < step ? 'bg-[#C8FF57]' : 'bg-[#2A2A2A]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Step1({ data, setData, onNext }) {
  const valid = data.artistName && data.genre && data.city

  return (
    <div className="fade-in space-y-5">
      <div>
        <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Artist Name *</label>
        <input
          type="text"
          value={data.artistName}
          onChange={e => setData(d => ({ ...d, artistName: e.target.value }))}
          placeholder="Your artist name"
          className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Genre *</label>
          <select
            value={data.genre}
            onChange={e => setData(d => ({ ...d, genre: e.target.value }))}
            className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] focus:outline-none focus:border-[#C8FF57] transition-colors appearance-none"
          >
            <option value="">Select genre</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Subgenre</label>
          <input
            type="text"
            value={data.subgenre}
            onChange={e => setData(d => ({ ...d, subgenre: e.target.value }))}
            placeholder="e.g. Dark Trap"
            className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">City / State *</label>
        <input
          type="text"
          value={data.city}
          onChange={e => setData(d => ({ ...d, city: e.target.value }))}
          placeholder="e.g. Los Angeles, CA"
          className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Spotify URL</label>
          <input
            type="url"
            value={data.spotifyUrl}
            onChange={e => setData(d => ({ ...d, spotifyUrl: e.target.value }))}
            placeholder="https://open.spotify.com/..."
            className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-2">Instagram Handle</label>
          <input
            type="text"
            value={data.instagram}
            onChange={e => setData(d => ({ ...d, instagram: e.target.value }))}
            placeholder="@yourhandle"
            className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F2F0EB] placeholder-[#444] focus:outline-none focus:border-[#C8FF57] transition-colors"
          />
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!valid}
        className={`w-full py-4 rounded-xl font-syne font-bold text-base tracking-wide transition-all duration-200 ${
          valid
            ? 'bg-[#C8FF57] text-[#0A0A0A] hover:bg-[#d4ff6a] hover:shadow-lg hover:shadow-[#C8FF57]/20 active:scale-[0.98]'
            : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
        }`}
      >
        Next →
      </button>
    </div>
  )
}

function Step2({ data, setData, onNext, onBack }) {
  const valid = data.listeners && data.releaseFreq

  return (
    <div className="fade-in space-y-6">
      <div>
        <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">Monthly Listeners *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MONTHLY_LISTENERS.map(l => (
            <button
              key={l}
              onClick={() => setData(d => ({ ...d, listeners: l }))}
              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-150 ${
                data.listeners === l
                  ? 'bg-[#C8FF57] text-[#0A0A0A] border-[#C8FF57]'
                  : 'bg-[#111] text-[#F2F0EB] border-[#2A2A2A] hover:border-[#C8FF57]/50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">How often do you release? *</label>
        <div className="flex flex-wrap gap-3">
          {RELEASE_FREQ.map(f => (
            <button
              key={f}
              onClick={() => setData(d => ({ ...d, releaseFreq: f }))}
              className={`py-3 px-6 rounded-xl text-sm font-medium border transition-all duration-150 ${
                data.releaseFreq === f
                  ? 'bg-[#C8FF57] text-[#0A0A0A] border-[#C8FF57]'
                  : 'bg-[#111] text-[#F2F0EB] border-[#2A2A2A] hover:border-[#C8FF57]/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-syne font-bold text-base tracking-wide bg-[#1A1A1A] text-[#888880] hover:text-[#F2F0EB] border border-[#2A2A2A] hover:border-[#444] transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className={`flex-1 py-4 rounded-xl font-syne font-bold text-base tracking-wide transition-all duration-200 ${
            valid
              ? 'bg-[#C8FF57] text-[#0A0A0A] hover:bg-[#d4ff6a] hover:shadow-lg hover:shadow-[#C8FF57]/20 active:scale-[0.98]'
              : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

function Step3({ data, setData, onFinish, onBack }) {
  const toggleGoal = (goal) => {
    setData(d => {
      const goals = d.goals || []
      return {
        ...d,
        goals: goals.includes(goal) ? goals.filter(g => g !== goal) : [...goals, goal]
      }
    })
  }
  const valid = (data.goals || []).length > 0

  return (
    <div className="fade-in space-y-6">
      <div>
        <label className="block text-xs font-medium text-[#888880] uppercase tracking-widest mb-3">Select all that apply *</label>
        <div className="flex flex-wrap gap-3">
          {GOALS.map(goal => {
            const active = (data.goals || []).includes(goal)
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`py-2.5 px-5 rounded-full text-sm font-medium border transition-all duration-150 ${
                  active
                    ? 'bg-[#C8FF57] text-[#0A0A0A] border-[#C8FF57]'
                    : 'bg-[#111] text-[#F2F0EB] border-[#2A2A2A] hover:border-[#C8FF57]/50'
                }`}
              >
                {goal}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-syne font-bold text-base tracking-wide bg-[#1A1A1A] text-[#888880] hover:text-[#F2F0EB] border border-[#2A2A2A] hover:border-[#444] transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          disabled={!valid}
          className={`flex-1 py-4 rounded-xl font-syne font-bold text-base tracking-wide transition-all duration-200 ${
            valid
              ? 'bg-[#C8FF57] text-[#0A0A0A] hover:bg-[#d4ff6a] hover:shadow-lg hover:shadow-[#C8FF57]/20 active:scale-[0.98]'
              : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
          }`}
        >
          Build My Profile →
        </button>
      </div>
    </div>
  )
}

export default function IntakeFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    artistName: '', genre: '', subgenre: '', city: '',
    spotifyUrl: '', instagram: '', listeners: '', releaseFreq: '', goals: []
  })

  const handleFinish = () => {
    const profile = { ...data, id: generateId(), createdAt: new Date().toISOString() }
    saveProfile(profile)
    onComplete(profile)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      <LABackground />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10 fade-in">
          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl tracking-tight mb-2">
            Campaign<span className="text-[#C8FF57]">Cartel</span>
          </h1>
          <p className="text-[#888880] text-sm">AI-powered music promotion for independent artists</p>
        </div>

        {/* Card */}
        <div className="bg-[#111]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <ProgressBar step={step} />

          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl text-[#F2F0EB]">{STEPS[step]}</h2>
          </div>

          {step === 0 && <Step1 data={data} setData={setData} onNext={() => setStep(1)} />}
          {step === 1 && <Step2 data={data} setData={setData} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <Step3 data={data} setData={setData} onFinish={handleFinish} onBack={() => setStep(1)} />}
        </div>
      </div>
    </div>
  )
}
