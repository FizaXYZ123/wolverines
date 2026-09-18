"use client";

import React, { useState } from "react";

export default function HockeyDribbleIllustration() {
  const [isShot, setIsShot] = useState(false);

  const handleShoot = () => {
    if (isShot) return;
    setIsShot(true);
    setTimeout(() => setIsShot(false), 2400);
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none flex flex-col items-center">
      {/* SVG Container */}
      <div
        onClick={handleShoot}
        className="relative w-full cursor-pointer group"
        title="Click to take a shot!"
      >
        <svg
          viewBox="0 0 600 520"
          className="w-full h-auto drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Turf Grass Gradient */}
            <linearGradient id="turfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#43A047" />
              <stop offset="60%" stopColor="#2E7D32" />
              <stop offset="100%" stopColor="#1B5E20" />
            </linearGradient>

            {/* Turf Shadow Gradient */}
            <radialGradient id="turfRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B5E20" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1B5E20" stopOpacity="0" />
            </radialGradient>

            {/* Ball Shadow Gradient */}
            <radialGradient id="ballShadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Ball 3D Shading */}
            <radialGradient id="ballShading" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#E0E0E0" />
              <stop offset="100%" stopColor="#9E9E9E" />
            </radialGradient>

            {/* Jersey Shading */}
            <linearGradient id="jerseyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EEEEEE" />
            </linearGradient>

            {/* Stick Carbon Texture */}
            <linearGradient id="stickGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#212121" />
              <stop offset="45%" stopColor="#424242" />
              <stop offset="55%" stopColor="#DE2027" />
              <stop offset="100%" stopColor="#212121" />
            </linearGradient>
          </defs>

          {/* ─── ARTISTIC BRUSH STROKE TURF BACKGROUND ─── */}
          <g id="turf-brush-ground">
            {/* Wide brush splatter ground */}
            <path
              d="M 60 410 C 120 400, 180 415, 260 408 C 340 402, 420 412, 530 405 C 570 412, 550 435, 520 440 C 430 448, 320 442, 230 448 C 140 452, 90 438, 60 410 Z"
              fill="url(#turfGradient)"
              opacity="0.95"
            />
            {/* Secondary brush strokes */}
            <path
              d="M 90 425 C 160 418, 280 428, 390 422 C 460 418, 510 430, 480 438 C 410 446, 290 440, 170 444 C 110 446, 70 435, 90 425 Z"
              fill="#388E3C"
              opacity="0.8"
            />
            {/* White Pitch Turf Line */}
            <path
              d="M 80 418 Q 300 415 520 418"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeDasharray="14 8"
              opacity="0.65"
            />
            {/* Fine splatter specks */}
            <circle cx="75" cy="405" r="3" fill="#43A047" opacity="0.6" />
            <circle cx="95" cy="442" r="2.5" fill="#2E7D32" opacity="0.7" />
            <circle cx="510" cy="408" r="3.5" fill="#43A047" opacity="0.6" />
            <circle cx="535" cy="425" r="2" fill="#1B5E20" opacity="0.8" />
            <circle cx="545" cy="415" r="1.5" fill="#388E3C" opacity="0.6" />
          </g>

          {/* ─── FIELD HOCKEY PLAYER (#11 From Behind) ─── */}
          {/* Entire Player Group with slight natural athletic breathing/sway */}
          <g className="player-body" transform-origin="340 410">
            {/* Left Leg & Shoe */}
            <g id="left-leg">
              {/* Thigh */}
              <path d="M 312 250 L 305 315 L 320 315 L 325 250 Z" fill="#E0A985" />
              {/* Black Sock */}
              <path d="M 305 315 L 302 375 L 318 375 L 320 315 Z" fill="#151515" />
              {/* Red Sock Trim */}
              <path d="M 305 315 L 320 315 L 319 321 L 304 321 Z" fill="#DE2027" />
              {/* Athletic Turf Shoe */}
              <path
                d="M 300 375 C 295 385 300 395 316 395 C 322 395 324 388 322 375 Z"
                fill="#EEEEEE"
                stroke="#BDBDBD"
                strokeWidth="1.5"
              />
              <path d="M 302 388 L 318 388" stroke="#43A047" strokeWidth="2.5" />
            </g>

            {/* Right Leg & Shoe (Forward stepping) */}
            <g id="right-leg">
              {/* Thigh */}
              <path d="M 345 250 L 352 305 L 368 305 L 360 250 Z" fill="#E0A985" />
              {/* Black Sock */}
              <path d="M 352 305 L 358 368 L 374 368 L 368 305 Z" fill="#181818" />
              {/* Red Sock Trim */}
              <path d="M 352 305 L 368 305 L 369 311 L 353 311 Z" fill="#DE2027" />
              {/* Athletic Turf Shoe */}
              <path
                d="M 356 368 C 354 378 360 388 376 388 C 384 388 384 380 378 368 Z"
                fill="#F5F5F5"
                stroke="#BDBDBD"
                strokeWidth="1.5"
              />
              <path d="M 358 382 L 376 382" stroke="#DE2027" strokeWidth="2.5" />
            </g>

            {/* Black Running Shorts */}
            <path
              d="M 302 215 L 298 255 C 308 260 326 260 334 250 C 342 260 360 260 370 255 L 366 215 Z"
              fill="#181818"
            />

            {/* White Athletic Jersey */}
            <path
              d="M 306 130 C 298 165 296 200 302 220 C 322 224 348 224 366 220 C 372 200 370 165 362 130 C 348 135 320 135 306 130 Z"
              fill="url(#jerseyGrad)"
              stroke="#E0E0E0"
              strokeWidth="1"
            />
            {/* Jersey Armholes & Collar */}
            <path d="M 306 130 C 314 140 312 165 300 175" fill="none" stroke="#212121" strokeWidth="2" />
            <path d="M 362 130 C 354 140 356 165 368 175" fill="none" stroke="#212121" strokeWidth="2" />

            {/* Jersey Number '11' */}
            <text
              x="334"
              y="185"
              textAnchor="middle"
              fill="#1F1F1F"
              fontSize="34"
              fontWeight="900"
              fontFamily="var(--font-bebas-neue), 'Bebas Neue', sans-serif"
              letterSpacing="2"
            >
              11
            </text>

            {/* Arms Holding the Stick */}
            {/* Left Arm */}
            <path
              d="M 299 155 C 285 190 270 230 255 270 L 268 275 C 280 240 295 195 306 160 Z"
              fill="#E0A985"
            />
            {/* Right Arm */}
            <path
              d="M 366 155 C 360 190 340 240 305 285 L 295 278 C 325 235 348 190 357 155 Z"
              fill="#D49977"
            />

            {/* Neck & Hair */}
            <path d="M 326 115 L 342 115 L 340 132 L 328 132 Z" fill="#E0A985" />
            {/* Ponytail Hair */}
            <path
              d="M 322 92 C 318 68 350 68 346 92 C 352 105 348 120 334 122 C 320 120 316 105 322 92 Z"
              fill="#8D5B4C"
            />
            {/* Flowing Ponytail Tail */}
            <path
              d="M 334 92 C 342 85 352 90 356 105 C 360 122 348 140 342 148 C 340 138 345 125 342 110 C 340 102 334 98 334 92 Z"
              fill="#A06856"
            />
            {/* Red Hair Tie */}
            <ellipse cx="338" cy="95" rx="4.5" ry="3" fill="#DE2027" />
          </g>

          {/* ─── FIELD HOCKEY STICK & HANDS (SWAYING / DRIBBLING) ─── */}
          <g className={`hockey-stick-group ${isShot ? "stick-shooting" : "stick-dribbling"}`}>
            {/* Shadow under the stick head */}
            <ellipse cx="250" cy="414" rx="28" ry="6" fill="#000000" opacity="0.25" />

            {/* Stick Shaft */}
            <path
              d="M 270 260 L 235 390 Q 230 412 215 412 Q 198 412 205 392 Q 212 375 224 375 L 255 258 Z"
              fill="url(#stickGrad)"
              stroke="#111111"
              strokeWidth="1.5"
            />
            {/* White/Red Grip Tape */}
            <path d="M 268 260 L 255 258 L 260 280 L 273 282 Z" fill="#FFFFFF" />
            <path d="M 260 280 L 273 282 L 269 300 L 256 298 Z" fill="#DE2027" />
            <path d="M 256 298 L 269 300 L 265 318 L 252 316 Z" fill="#FFFFFF" />
            <path d="M 252 316 L 265 318 L 261 336 L 248 334 Z" fill="#DE2027" />

            {/* Stick Hook / Head (Classic J-Shape) */}
            <path
              d="M 226 385 C 220 405 204 414 196 408 C 188 402 192 388 205 382 C 212 378 222 378 226 385 Z"
              fill="#DE2027"
              stroke="#8B0000"
              strokeWidth="1.2"
            />

            {/* Hands wrapped on grip */}
            <ellipse cx="265" cy="272" rx="7" ry="9" fill="#E0A985" transform="rotate(-15 265 272)" />
            <ellipse cx="256" cy="308" rx="7" ry="9" fill="#D49977" transform="rotate(-15 256 308)" />
          </g>

          {/* ─── FIELD HOCKEY BALL (DRIBBLING LEFT & RIGHT) ─── */}
          <g className={`hockey-ball-group ${isShot ? "ball-shooting" : "ball-dribbling"}`}>
            {/* Dynamic Ground Shadow */}
            <ellipse cx="215" cy="415" rx="14" ry="5" fill="url(#ballShadowGrad)" />

            {/* Ball Motion Trail when moving */}
            <g className="ball-trail" opacity="0.6">
              <circle cx="205" cy="402" r="3.5" fill="#DE2027" opacity="0.4" />
              <circle cx="195" cy="404" r="2" fill="#FFFFFF" opacity="0.6" />
              <circle cx="225" cy="404" r="2" fill="#43A047" opacity="0.5" />
            </g>

            {/* 3D Dimpled Field Hockey Ball */}
            <circle cx="215" cy="402" r="13" fill="url(#ballShading)" stroke="#E0E0E0" strokeWidth="1" />
            {/* Dimple impressions */}
            <circle cx="211" cy="398" r="1.2" fill="#9E9E9E" />
            <circle cx="218" cy="397" r="1.2" fill="#9E9E9E" />
            <circle cx="214" cy="404" r="1.2" fill="#9E9E9E" />
            <circle cx="209" cy="404" r="1" fill="#BDBDBD" />
            <circle cx="220" cy="403" r="1" fill="#BDBDBD" />
            <circle cx="215" cy="409" r="1" fill="#BDBDBD" />
            {/* Red Wolverines Logo dot on Ball */}
            <circle cx="214" cy="401" r="2.5" fill="#DE2027" />
          </g>

          {/* Interactive "GOAL!" / "PLAY AGAIN" Pop up banner when shot */}
          {isShot && (
            <g className="shot-announcement">
              <rect
                x="190"
                y="60"
                width="220"
                height="50"
                rx="25"
                fill="#DE2027"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                className="animate-bounce"
              />
              <text
                x="300"
                y="92"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="22"
                fontWeight="900"
                fontFamily="var(--font-bebas-neue), 'Bebas Neue', sans-serif"
                letterSpacing="2"
              >
                GOAAAL! 🏑🔥
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Playful hint below illustration */}
      <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-600 uppercase tracking-widest font-semibold select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DE2027] animate-ping" />
        <span>Click player or ball to take a shot!</span>
      </div>

      {/* ─── CSS KEYFRAME ANIMATIONS (DRIBBLING LEFT & RIGHT) ─── */}
      <style jsx>{`
        /* Continuous 60fps dribbling back and forth */
        .hockey-stick-group.stick-dribbling {
          animation: stickDribble 2.6s ease-in-out infinite alternate;
          transform-origin: 260px 250px;
        }

        .hockey-ball-group.ball-dribbling {
          animation: ballDribble 2.6s ease-in-out infinite alternate;
          transform-origin: 215px 402px;
        }

        .player-body {
          animation: playerSway 2.6s ease-in-out infinite alternate;
        }

        /* Stick sway arc */
        @keyframes stickDribble {
          0% {
            transform: translateX(-40px) rotate(-14deg);
          }
          30% {
            transform: translateX(15px) rotate(4deg);
          }
          70% {
            transform: translateX(-10px) rotate(-6deg);
          }
          100% {
            transform: translateX(65px) rotate(16deg);
          }
        }

        /* Ball rolling & dodging left to right */
        @keyframes ballDribble {
          0% {
            transform: translateX(-45px) rotate(-160deg);
          }
          30% {
            transform: translateX(12px) rotate(40deg);
          }
          70% {
            transform: translateX(-8px) rotate(-20deg);
          }
          100% {
            transform: translateX(70px) rotate(220deg);
          }
        }

        /* Natural player weight shift */
        @keyframes playerSway {
          0% {
            transform: translateX(-8px) rotate(-1.5deg);
          }
          100% {
            transform: translateX(10px) rotate(1.8deg);
          }
        }

        /* Shot Animation */
        .stick-shooting {
          animation: stickShoot 0.7s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          transform-origin: 260px 250px;
        }

        .ball-shooting {
          animation: ballShoot 1.4s cubic-bezier(0.15, 0.85, 0.35, 1.2) forwards;
          transform-origin: 215px 402px;
        }

        @keyframes stickShoot {
          0% {
            transform: translateX(-20px) rotate(-20deg);
          }
          40% {
            transform: translateX(45px) rotate(28deg);
          }
          100% {
            transform: translateX(30px) rotate(12deg);
          }
        }

        @keyframes ballShoot {
          0% {
            transform: scale(1) translate(0, 0);
          }
          25% {
            transform: scale(1.15) translate(180px, -110px) rotate(480deg);
          }
          70% {
            transform: scale(0.65) translate(340px, -220px) rotate(960deg);
            opacity: 0.85;
          }
          100% {
            transform: scale(0.4) translate(400px, -260px) rotate(1440deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
