// Quinn the quokka for the website, ported from the app (tuterly-study
// src/components/Quinn.tsx: the 9 Nov 2026 chunky amber redraw, one blob
// with a teal ribbon rosette, flat feet and capsule arms). Pure SVG, no
// hooks, so server and client components can both use it.
//
// mood: happy | celebrate | thinking | writing. bag and glasses: the gear
// from the old "happy-bag-glasses" picture (blue school bag, round glasses).

const FUR = "#FFAE0F";
const FUR_DARK = "#E8960A";
const FOOT = "#B86F00";
const BELLY = "#FFF1D0";
const MUZZLE = "#FFD789";
const EAR_IN = "#F4AE96";
const BLUSH = "#F49A86";
const INK = "#2A1B12";
const TEAL = "#14A9C8";
const TEAL_DARK = "#0E87A1";
const MOUTH = "#7A2E1E";
const TONGUE = "#F27A7A";
const C = "translate(3.5 9.3) scale(0.31)";
const BODY = "M150 48 C228 48 258 108 258 170 C258 238 212 268 150 268 C88 268 42 238 42 170 C42 108 72 48 150 48 Z";
const EAR = "M0 -32 C15 -32 27 -10 27 9 C27 30 -27 30 -27 9 C-27 -10 -15 -32 0 -32 Z";
const SHOULDER = { left: [22.1, 67], right: [77.9, 67], rest: 14 };
const at = ([x, y]) => `${1.5 + 0.97 * x} ${0.97 * y}`;


function Face({ mood, blink }) {
  const think = mood === "thinking" || mood === "writing";
  const dx = think ? 6 : 0;
  const dy = think ? -8 : 0;
  const eye = (x) =>
    mood === "celebrate" ? (
      <path d={`M${x - 24} 132 Q${x} 104 ${x + 24} 132`} stroke={INK} strokeWidth="10" fill="none" strokeLinecap="round" />
    ) : blink ? (
      <path d={`M${x - 24} 132 Q${x} 152 ${x + 24} 132`} stroke={INK} strokeWidth="10" fill="none" strokeLinecap="round" />
    ) : (
      <g>
        <ellipse cx={x} cy="128" rx="31" ry="35" fill="#fff" />
        <circle cx={x + 7 + dx} cy={134 + dy} r="17" fill={INK} />
        <circle cx={x + 12 + dx} cy={127 + dy} r="5.5" fill="#fff" />
      </g>
    );
  const mouth =
    think ? (
      <path d="M130 178 Q150 196 170 178" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
    ) : mood === "celebrate" ? (
      <g>
        <path d="M120 172 Q150 218 180 172 Z" fill={MOUTH} />
        <path d="M134 192 Q150 210 166 192 Q150 186 134 192 Z" fill={TONGUE} />
      </g>
    ) : (
      <g>
        <path d="M126 174 Q150 202 174 174 Z" fill={MOUTH} />
        <path d="M138 188 Q150 199 162 188 Q150 184 138 188 Z" fill={TONGUE} />
      </g>
    );
  return (
    <g>
      <ellipse cx="150" cy="172" rx="40" ry="28" fill={MUZZLE} />
      <ellipse cx="80" cy="172" rx="13" ry="7" fill={BLUSH} opacity="0.5" />
      <ellipse cx="220" cy="172" rx="13" ry="7" fill={BLUSH} opacity="0.5" />
      {eye(112)}
      {eye(188)}
      <path d="M138 156 Q150 150 162 156 Q160 166 150 168 Q140 166 138 156 Z" fill={INK} />
      {mouth}
    </g>
  );
}

function Ribbon() {
  const [x, y] = [64, 71];
  return (
    <g>
      <path d={`M${x - 0.8} ${y + 1} L${x - 4.2} ${y + 9.5} L${x - 2.3} ${y + 8.6} L${x - 1.6} ${y + 10.6} L${x + 0.6} ${y + 2} Z`} fill={TEAL_DARK} />
      <path d={`M${x + 0.8} ${y + 1} L${x + 3.6} ${y + 10} L${x + 1.7} ${y + 9.2} L${x + 0.8} ${y + 11.2} L${x - 0.6} ${y + 2} Z`} fill={TEAL} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * Math.PI) / 5;
        return <circle key={i} cx={x + Math.cos(a) * 3.5} cy={y + Math.sin(a) * 3.5} r="1.6" fill={TEAL} />;
      })}
      <circle cx={x} cy={y} r="3.6" fill={TEAL} />
      <circle cx={x} cy={y} r="2.5" fill="#fff" stroke={TEAL_DARK} strokeWidth="0.5" />
      <circle cx={x} cy={y} r="1.3" fill={TEAL} />
    </g>
  );
}

function Arm({ shoulder, angle, className = "" }) {
  return (
    <g transform={`translate(${at(shoulder)})`}>
      <g className={className}>
        <g transform={`rotate(${angle}) scale(0.485) translate(-10 -5)`}>
          <g transform="translate(10 5) scale(0.62)">
            <rect x="-13" y="-8" width="26" height="52" rx="13" fill={FUR_DARK} />
          </g>
        </g>
      </g>
    </g>
  );
}

const BAG = "#3D6FD9";
const BAG_DARK = "#2A51A8";
const BAG_LIGHT = "#A9C4FF";

/**
 * Quinn in one SVG on the app's 100 x 100 grid (with a little room around
 * him). animated adds the class hooks for hopping, ear twitches and arm
 * gestures (styled by whoever animates him, e.g. quinn-solving.css).
 */
export function QuinnFigure({ mood = "happy", blink = false, bag = false, glasses = false, className = "", animated = false, title, size }) {
  const pose = mood;
  const writing = pose === "writing";
  // Thinking: right paw up to the chin (as the app's armPose). Writing: the
  // right paw holds the notebook and the left arm scribbles with the pencil.
  const right = pose === "thinking" ? 140 : writing ? 25 : pose === "celebrate" ? -150 : -SHOULDER.rest;
  const left = writing ? -40 : pose === "celebrate" ? 150 : SHOULDER.rest;
  const anim = (c) => (animated ? c : undefined);
  return (
    <svg className={className} width={size} height={size} viewBox="-6 -10 112 112" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : "true"} focusable="false">
      {!animated && <ellipse cx="50" cy="96.5" rx="30" ry="3.5" fill="#000" opacity="0.12" />}
      <g className={anim("qs-hop")}>
        <g transform="translate(1.5 0) scale(0.97)">
          {bag && (
            <g>
              <rect x="9" y="44" width="82" height="44" rx="13" fill={BAG} />
              {[4, 85].map((x) => (
                <g key={x}>
                  <rect x={x} y="62" width="11" height="24" rx="4.5" fill={BAG_DARK} />
                  <rect x={x} y="62" width="11" height="4" rx="2" fill={BAG_LIGHT} />
                </g>
              ))}
            </g>
          )}
          <g transform={C}>
            {[[86, -12, "l"], [214, 12, "r"]].map(([x, a, s]) => (
              <g key={x} transform={`translate(${x} 66) rotate(${a})`}>
                <g className={anim(`qs-ear qs-ear--${s}`)}>
                  <path d={EAR} fill={FUR_DARK} />
                  <path d={EAR} transform="translate(0 6) scale(0.55)" fill={EAR_IN} />
                </g>
              </g>
            ))}
            <path d="M64 226 C40 236 18 252 6 268 C30 268 56 258 78 246 Z" fill={FUR_DARK} />
            <path d={BODY} fill={FUR} />
            <path d="M132 50 L150 30 L160 50 L176 36 L178 54 Z" fill={FUR} />
            <path d="M42 170 C42 238 88 268 150 268 C212 268 258 238 258 170 C246 226 206 250 150 250 C94 250 54 226 42 170 Z" fill={FUR_DARK} />
            <ellipse cx="150" cy="222" rx="62" ry="38" fill={BELLY} />
          </g>
          <Ribbon />
          <g transform={C}>
            <ellipse cx="112" cy="270" rx="32" ry="13" fill={FOOT} />
            <ellipse cx="188" cy="270" rx="32" ry="13" fill={FOOT} />
          </g>
          {bag && (
            <g>
              <path d="M17 51 C25 55 28.5 68 27.5 88" stroke={BAG_DARK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
              <path d="M83 51 C75 55 71.5 68 72.5 88" stroke={BAG_DARK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
              <rect x="24.4" y="63" width="6.6" height="4.4" rx="1.2" fill="none" stroke={BAG_LIGHT} strokeWidth="1.4" />
              <rect x="69" y="63" width="6.6" height="4.4" rx="1.2" fill="none" stroke={BAG_LIGHT} strokeWidth="1.4" />
            </g>
          )}
          <g transform={C}>
            <Face mood={mood} blink={blink} />
          </g>
          {glasses && (
            <g>
              <circle cx="38.2" cy="49" r="11.6" stroke={INK} strokeWidth="2.4" fill="#fff" fillOpacity="0.08" />
              <circle cx="61.8" cy="49" r="11.6" stroke={INK} strokeWidth="2.4" fill="#fff" fillOpacity="0.08" />
              <path d="M48.6 47.6 Q50 46.6 51.4 47.6" stroke={INK} strokeWidth="2.2" fill="none" />
              <path d="M26.6 47 L19 45 M73.4 47 L81 45" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
            </g>
          )}
          {/* pencil tucked behind his left ear while he thinks */}
          {(pose === "thinking" || pose === "happy" && animated) && (
            <g transform="rotate(-50 27 31)">
              <rect x="14" y="28.25" width="26" height="5.5" rx="1" fill="#FFE14D" stroke="#A87A00" strokeWidth="0.6" />
              <rect x="10" y="28.25" width="5" height="5.5" rx="1.5" fill="#F28B9B" />
              <path d="M40 28.25 L46 31 L40 33.75 Z" fill="#F3D9B1" />
              <path d="M44.2 30.15 L46 31 L44.2 31.85 Z" fill={INK} />
            </g>
          )}
          {/* notebook in his right paw while he writes */}
          {writing && (
            <g transform="rotate(10 74 80)">
              <rect x="66" y="70" width="17" height="21" rx="2" fill="#6C5CE7" />
              <rect x="68.2" y="72" width="12.6" height="17" rx="1" fill="#F4F1FF" />
              <path className={anim("qs-scribble")} d="M70 76 H79 M70 79 H79 M70 82 H79 M70 85 H76" stroke="#B3A9F2" strokeWidth="1" />
            </g>
          )}
        </g>
        <Arm shoulder={SHOULDER.left} angle={left} className={anim(writing ? "qs-arm-write" : "")} />
        <Arm shoulder={SHOULDER.right} angle={right} className={anim(pose === "thinking" ? "qs-arm-tap" : "")} />
        {writing && (
          <g className={anim("qs-arm-write")}>
            <g transform="translate(62 82) rotate(-30)">
              <rect x="0" y="-1.6" width="15" height="3.2" rx="0.8" fill="#FFE14D" stroke="#A87A00" strokeWidth="0.4" />
              <path d="M15 -1.6 L19 0 L15 1.6 Z" fill="#F3D9B1" />
              <path d="M17.8 -0.5 L19 0 L17.8 0.5 Z" fill={INK} />
            </g>
          </g>
        )}
      </g>
      {animated && <ellipse className="qs-shadow" cx="50" cy="97" rx="27" ry="3.4" fill="#000" />}
    </svg>
  );
}

