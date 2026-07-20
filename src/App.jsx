import { useState } from 'react'
import './App.css'
import { getProfile } from './utils/storage'
import IntakeFlow from './components/intake/IntakeFlow'
import Dashboard from './components/dashboard/Dashboard'
import SongDetail from './components/song/SongDetail'
import PlaylistPitching from './components/tools/PlaylistPitching'
import PressAndBlog from './components/tools/PressAndBlog'
import SocialStrategy from './components/tools/SocialStrategy'

export default function App() {
  const [profile, setProfile] = useState(() => getProfile())
  const [nav, setNav] = useState(() => {
    const p = getProfile()
    return { view: p ? 'dashboard' : 'intake' }
  })

  const goToDashboard = () => setNav({ view: 'dashboard' })

  const handleIntakeComplete = (p) => {
    setProfile(p)
    setNav({ view: 'dashboard' })
  }

  const handleEditProfile = () => {
    setNav({ view: 'intake' })
  }

  const handleSongClick = (song) => {
    setNav({ view: 'song', song })
  }

  const handleToolLaunch = (toolKey, song) => {
    setNav({ view: 'tool', toolKey, song })
  }

  const handleViewResults = (toolKey, song, campaign) => {
    setNav({ view: 'tool', toolKey, song, existingCampaign: campaign })
  }

  const handleToolBack = () => {
    if (nav.song) {
      setNav({ view: 'song', song: nav.song })
    } else {
      setNav({ view: 'dashboard' })
    }
  }

  const { view, song, toolKey, existingCampaign } = nav

  if (view === 'intake') {
    return <IntakeFlow onComplete={handleIntakeComplete} />
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        profile={profile}
        onEditProfile={handleEditProfile}
        onSongClick={handleSongClick}
        onToolLaunch={handleToolLaunch}
      />
    )
  }

  if (view === 'song') {
    return (
      <SongDetail
        song={song}
        profile={profile}
        onBack={goToDashboard}
        onEditProfile={handleEditProfile}
        onRunTool={handleToolLaunch}
        onViewResults={handleViewResults}
      />
    )
  }

  if (view === 'tool') {
    const commonProps = { song, profile, onBack: handleToolBack, existingCampaign }
    if (toolKey === 'playlist') return <PlaylistPitching {...commonProps} />
    if (toolKey === 'press') return <PressAndBlog {...commonProps} />
    if (toolKey === 'social') return <SocialStrategy {...commonProps} />
  }

  return null
}
