export const getProfile = () => {
  try { return JSON.parse(localStorage.getItem('artistProfile')) } catch { return null }
}

export const saveProfile = (profile) => {
  localStorage.setItem('artistProfile', JSON.stringify(profile))
}

export const getSongs = () => {
  try { return JSON.parse(localStorage.getItem('songs')) || [] } catch { return [] }
}

export const saveSongs = (songs) => {
  localStorage.setItem('songs', JSON.stringify(songs))
}

export const getCampaigns = () => {
  try { return JSON.parse(localStorage.getItem('campaigns')) || [] } catch { return [] }
}

export const saveCampaign = (campaign) => {
  const campaigns = getCampaigns()
  const idx = campaigns.findIndex(c => c.id === campaign.id)
  if (idx >= 0) campaigns[idx] = campaign
  else campaigns.unshift(campaign)
  localStorage.setItem('campaigns', JSON.stringify(campaigns))
}

export const getCampaignsBySong = (songId) => {
  return getCampaigns().filter(c => c.songId === songId)
}

export const getCampaignsBySongAndTool = (songId, tool) => {
  return getCampaigns().filter(c => c.songId === songId && c.tool === tool)
}

export const generateId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
