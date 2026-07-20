export default function LABackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* EKG line */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden opacity-20">
        <div className="ekg-line flex" style={{ width: '200%' }}>
          <svg viewBox="0 0 800 60" className="w-1/2 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="0,30 80,30 100,30 120,10 140,50 160,5 180,55 200,30 220,30 300,30 320,20 340,40 360,30 440,30 460,30 480,10 500,50 520,5 540,55 560,30 580,30 660,30 680,20 700,40 720,30 800,30"
              stroke="#C8FF57"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <svg viewBox="0 0 800 60" className="w-1/2 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="0,30 80,30 100,30 120,10 140,50 160,5 180,55 200,30 220,30 300,30 320,20 340,40 360,30 440,30 460,30 480,10 500,50 520,5 540,55 560,30 580,30 660,30 680,20 700,40 720,30 800,30"
              stroke="#C8FF57"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* LA Skyline */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <linearGradient id="horizonGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8FF57" stopOpacity="0" />
              <stop offset="60%" stopColor="#C8FF57" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C8FF57" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {/* Glow horizon */}
          <rect x="0" y="180" width="1200" height="100" fill="url(#horizonGlow)" />
          {/* City buildings */}
          <g fill="#0A0A0A" stroke="#1a1a1a" strokeWidth="0.5">
            {/* Far left buildings */}
            <rect x="0" y="210" width="35" height="70" />
            <rect x="38" y="195" width="28" height="85" />
            <rect x="70" y="180" width="20" height="100" />
            <rect x="70" y="170" width="6" height="12" />
            <rect x="94" y="200" width="32" height="80" />
            <rect x="130" y="190" width="18" height="90" />
            {/* Mid left */}
            <rect x="152" y="160" width="40" height="120" />
            <rect x="152" y="148" width="8" height="14" />
            <rect x="196" y="175" width="22" height="105" />
            <rect x="222" y="155" width="50" height="125" />
            <rect x="222" y="140" width="10" height="18" />
            <rect x="276" y="170" width="30" height="110" />
            <rect x="310" y="185" width="24" height="95" />
            <rect x="338" y="165" width="44" height="115" />
            <rect x="338" y="152" width="10" height="15" />
            {/* Downtown towers */}
            <rect x="386" y="130" width="38" height="150" />
            <rect x="386" y="115" width="12" height="18" />
            <rect x="428" y="110" width="50" height="170" />
            <rect x="428" y="92" width="14" height="22" />
            <rect x="482" y="125" width="42" height="155" />
            <rect x="528" y="140" width="35" height="140" />
            <rect x="528" y="128" width="10" height="14" />
            <rect x="567" y="150" width="45" height="130" />
            <rect x="616" y="135" width="38" height="145" />
            <rect x="616" y="118" width="12" height="20" />
            {/* Right buildings */}
            <rect x="658" y="160" width="30" height="120" />
            <rect x="692" y="175" width="26" height="105" />
            <rect x="722" y="188" width="20" height="92" />
            <rect x="746" y="168" width="36" height="112" />
            <rect x="786" y="180" width="22" height="100" />
            <rect x="812" y="195" width="18" height="85" />
            <rect x="834" y="178" width="30" height="102" />
            <rect x="868" y="190" width="24" height="90" />
            <rect x="896" y="200" width="16" height="80" />
            <rect x="916" y="185" width="28" height="95" />
            <rect x="948" y="195" width="20" height="85" />
          </g>
          {/* Windows */}
          <g fill="#C8FF57" opacity="0.15">
            <rect x="158" y="165" width="4" height="4" />
            <rect x="166" y="165" width="4" height="4" />
            <rect x="174" y="165" width="4" height="4" />
            <rect x="158" y="175" width="4" height="4" />
            <rect x="174" y="175" width="4" height="4" />
            <rect x="435" y="118" width="5" height="5" />
            <rect x="445" y="118" width="5" height="5" />
            <rect x="455" y="118" width="5" height="5" />
            <rect x="435" y="130" width="5" height="5" />
            <rect x="455" y="130" width="5" height="5" />
            <rect x="435" y="142" width="5" height="5" />
            <rect x="445" y="142" width="5" height="5" />
            <rect x="455" y="142" width="5" height="5" />
            <rect x="392" y="138" width="4" height="4" />
            <rect x="400" y="138" width="4" height="4" />
            <rect x="408" y="138" width="4" height="4" />
            <rect x="392" y="148" width="4" height="4" />
            <rect x="408" y="148" width="4" height="4" />
            <rect x="620" y="143" width="4" height="4" />
            <rect x="628" y="143" width="4" height="4" />
            <rect x="636" y="143" width="4" height="4" />
            <rect x="620" y="155" width="4" height="4" />
            <rect x="636" y="155" width="4" height="4" />
          </g>
          {/* Palm trees */}
          <g fill="#0A0A0A" stroke="#151515" strokeWidth="0.5">
            {/* Palm 1 */}
            <rect x="88" y="215" width="5" height="55" />
            <ellipse cx="90" cy="215" rx="20" ry="8" transform="rotate(-20 90 215)" />
            <ellipse cx="90" cy="215" rx="22" ry="7" transform="rotate(10 90 215)" />
            <ellipse cx="90" cy="215" rx="18" ry="7" transform="rotate(35 90 215)" />
            <ellipse cx="90" cy="215" rx="20" ry="7" transform="rotate(-45 90 215)" />
            {/* Palm 2 */}
            <rect x="963" y="210" width="5" height="60" />
            <ellipse cx="965" cy="210" rx="22" ry="8" transform="rotate(-15 965 210)" />
            <ellipse cx="965" cy="210" rx="20" ry="7" transform="rotate(15 965 210)" />
            <ellipse cx="965" cy="210" rx="18" ry="7" transform="rotate(40 965 210)" />
            <ellipse cx="965" cy="210" rx="22" ry="7" transform="rotate(-50 965 210)" />
            {/* Palm 3 - tall center */}
            <rect x="588" y="205" width="6" height="65" />
            <ellipse cx="591" cy="205" rx="24" ry="9" transform="rotate(-10 591 205)" />
            <ellipse cx="591" cy="205" rx="22" ry="8" transform="rotate(20 591 205)" />
            <ellipse cx="591" cy="205" rx="20" ry="8" transform="rotate(45 591 205)" />
            <ellipse cx="591" cy="205" rx="23" ry="8" transform="rotate(-40 591 205)" />
            {/* Palm 4 */}
            <rect x="318" y="220" width="4" height="50" />
            <ellipse cx="320" cy="220" rx="18" ry="7" transform="rotate(-20 320 220)" />
            <ellipse cx="320" cy="220" rx="16" ry="6" transform="rotate(15 320 220)" />
            <ellipse cx="320" cy="220" rx="17" ry="6" transform="rotate(-45 320 220)" />
            {/* Palm 5 */}
            <rect x="848" y="218" width="4" height="52" />
            <ellipse cx="850" cy="218" rx="18" ry="7" transform="rotate(-18 850 218)" />
            <ellipse cx="850" cy="218" rx="20" ry="7" transform="rotate(12 850 218)" />
            <ellipse cx="850" cy="218" rx="16" ry="6" transform="rotate(38 850 218)" />
          </g>
          {/* Ground */}
          <rect x="0" y="268" width="1200" height="12" fill="#0A0A0A" />
        </svg>
      </div>
    </div>
  )
}
