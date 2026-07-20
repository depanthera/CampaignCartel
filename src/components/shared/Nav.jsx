export default function Nav({ profile, onEditProfile }) {
  const initials = profile?.artistName
    ? profile.artistName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-syne font-800 text-lg sm:text-xl tracking-tight text-[#F2F0EB]">
            Campaign<span className="text-[#C8FF57]">Cartel</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-[#F2F0EB] leading-none">{profile?.artistName}</p>
            <button
              onClick={onEditProfile}
              className="text-xs text-[#888880] hover:text-[#C8FF57] transition-colors mt-0.5"
            >
              Edit Profile
            </button>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#C8FF57] text-[#0A0A0A] flex items-center justify-center font-syne font-bold text-sm flex-shrink-0">
            {initials}
          </div>
        </div>
      </div>
    </nav>
  )
}
