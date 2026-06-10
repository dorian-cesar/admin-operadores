import React from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto'
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  // Sizing mapping for the SVG container
  const sizeClasses = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
    auto: 'h-full w-full',
  }

  const selectedSize = sizeClasses[size] || sizeClasses.md

  // Color Constants from Logo
  const goldColor = '#cca352'
  const tealColor = '#71b9c9'

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 380 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={selectedSize}
        style={{ aspectRatio: showText ? '380 / 340' : '380 / 240' }}
      >
        {/* Outer Frame (Gold) */}
        <path
          d="M 30,105 L 30,70 C 30,40 50,25 80,25 L 300,25 C 330,25 350,45 350,75 L 350,155 C 350,185 330,200 300,200 C 260,200 240,165 200,165 C 160,165 140,200 100,200 C 70,200 55,185 30,150"
          stroke={goldColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wave 1 (Teal, Top) */}
        <path
          d="M 15,115 C 45,85 85,60 130,80 C 175,100 205,135 245,115 C 285,95 305,85 330,80"
          stroke={tealColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wave 2 (Gold, Middle) */}
        <path
          d="M 15,132 C 45,102 85,77 130,97 C 175,117 205,152 245,132 C 285,112 305,102 330,97"
          stroke={goldColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wave 3 (Teal, Bottom-ish) */}
        <path
          d="M 15,149 C 45,119 85,94 130,114 C 175,134 205,169 245,149 C 285,129 305,119 330,114"
          stroke={tealColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left crescent smile (Gold) */}
        <path
          d="M 75,225 C 95,255 135,255 155,225"
          stroke={goldColor}
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Right crescent smile (Teal) */}
        <path
          d="M 245,225 C 265,255 295,255 315,225"
          stroke={tealColor}
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Brand Typography (Gold) */}
        {showText && (
          <>
            <text
              x="55"
              y="320"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
              fontSize="86"
              fontWeight="300"
              fill={goldColor}
              letterSpacing="2"
            >
              OLA
            </text>
            <text
              x="255"
              y="320"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
              fontSize="54"
              fontWeight="300"
              fill={goldColor}
            >
              SpA
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
