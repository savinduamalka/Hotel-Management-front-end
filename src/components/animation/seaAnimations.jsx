import React from "react";

const wavesStyles = `
  .waves-container {
    position: relative;
    overflow: hidden;
  }
  
  .wave {
    position: absolute;
    width: 200%;
    height: 200%;
    left: -50%;
    background: radial-gradient(ellipse at center, rgba(127,219,255,0) 0%, rgba(127,219,255,0.7) 100%);
    opacity: 0.3;
    border-radius: 43%;
  }
  
  .wave-1 {
    bottom: -65%;
    animation: wave 20s linear infinite;
  }
  
  .wave-2 {
    bottom: -70%;
    animation: wave 18s linear infinite;
    animation-delay: -5s;
  }
  
  .wave-3 {
    bottom: -75%;
    animation: wave 16s linear infinite;
    animation-delay: -10s;
  }
  
  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const bubblesStyles = `
  .bubbles-container {
    position: relative;
    overflow: hidden;
  }
  
  .bubble {
    position: absolute;
    bottom: -20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    animation: float linear infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-100vh) scale(1.2);
      opacity: 1;
    }
  }
`;

// Collection of sea-themed animations that can be reused throughout the application
export const SeaAnimations = {
  // Animated ocean waves for backgrounds
  Waves: () => {
    return (
      <div className="w-full h-full waves-container">
        <style>{wavesStyles}</style>
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    );
  },
  
  // Bubbles animation
  Bubbles: () => {
    return (
      <div className="w-full h-full bubbles-container">
        <style>{bubblesStyles}</style>
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={index} 
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    );
  },
  
  // Fish animation component
  Fish: ({ color = "#3B82F6", size = "medium" }) => {
    // Size mapping
    const sizeMap = {
      small: { width: "30px", height: "15px" },
      medium: { width: "50px", height: "25px" },
      large: { width: "70px", height: "35px" }
    };
    
    const dimensions = sizeMap[size] || sizeMap.medium;
    
    return (
      <div className="fish-container" style={dimensions}>
        <div className="fish" style={{ backgroundColor: color }}>
          <div className="fish-eye" style={{ backgroundColor: "#fff" }}></div>
          <div className="fish-tail" style={{ borderLeftColor: color }}></div>
        </div>
        
        <style jsx>{`
          .fish-container {
            position: relative;
            animation: swim 15s linear infinite;
          }
          
          .fish {
            position: absolute;
            width: 70%;
            height: 100%;
            border-radius: 50% 30% 30% 50%;
            transform-origin: 70% 50%;
            animation: fishBody 2s ease-in-out infinite alternate;
          }
          
          .fish-eye {
            position: absolute;
            top: 20%;
            left: 15%;
            width: 20%;
            height: 40%;
            border-radius: 50%;
          }
          
          .fish-eye:after {
            content: "";
            position: absolute;
            top: 25%;
            left: 25%;
            width: 50%;
            height: 50%;
            border-radius: 50%;
            background: #000;
          }
          
          .fish-tail {
            position: absolute;
            width: 0;
            height: 0;
            right: -30%;
            top: 0;
            border-top: solid transparent;
            border-bottom: solid transparent;
            border-left: solid;
            border-top-width: calc(${dimensions.height} / 2);
            border-bottom-width: calc(${dimensions.height} / 2);
            border-left-width: calc(${dimensions.width} * 0.3);
            animation: fishTail 2s ease-in-out infinite alternate;
          }
          
          @keyframes swim {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(100%, -50px) rotate(10deg);
            }
            50% {
              transform: translate(200%, 0) rotate(0deg);
            }
            75% {
              transform: translate(100%, 50px) rotate(-10deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }
          
          @keyframes fishBody {
            0% {
              transform: scaleX(1);
            }
            100% {
              transform: scaleX(0.95);
            }
          }
          
          @keyframes fishTail {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(20deg);
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Coral decoration
  Coral: ({ color = "#3B82F6" }) => {
    return (
      <div className="coral-container">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M10,90 Q25,70 20,50 Q15,30 30,20 Q45,10 50,30 Q55,50 70,40 Q85,30 90,60 Q95,90 50,90 Z" 
            fill="none" 
            stroke={color} 
            strokeWidth="2"
            className="coral-path"
          />
        </svg>
        
        <style jsx>{`
          .coral-container {
            width: 100%;
            height: 100%;
          }
          
          .coral-path {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            animation: drawCoral 3s forwards ease-in-out;
          }
          
          @keyframes drawCoral {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Seaweed animation that can be placed at bottom of elements
  Seaweed: ({ count = 5, height = 50 }) => {
    return (
      <div className="seaweed-container">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className="seaweed"
            style={{
              left: `${(index / count) * 100}%`,
              height: `${height + Math.random() * 20}px`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`
            }}
          ></div>
        ))}
        
        <style jsx>{`
          .seaweed-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${height + 20}px;
            overflow: hidden;
          }
          
          .seaweed {
            position: absolute;
            bottom: 0;
            width: 8px;
            background-color: rgba(59, 130, 246, 0.4);
            border-radius: 50px;
            transform-origin: bottom center;
            animation: sway ease-in-out infinite alternate;
          }
          
          @keyframes sway {
            0% {
              transform: rotate(-10deg);
            }
            100% {
              transform: rotate(10deg);
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Animated water surface ripple effect
  WaterRipple: () => {
    return (
      <div className="ripple-container">
        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
        
        <style jsx>{`
          .ripple-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          
          .ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: transparent;
            border: 2px solid rgba(59, 130, 246, 0.5);
            animation: rippleEffect 4s linear infinite;
          }
          
          .ripple-1 {
            animation-delay: 0s;
          }
          
          .ripple-2 {
            animation-delay: 1s;
          }
          
          .ripple-3 {
            animation-delay: 2s;
          }
          
          @keyframes rippleEffect {
            0% {
              width: 0;
              height: 0;
              opacity: 1;
            }
            100% {
              width: 200px;
              height: 200px;
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Animated gradient background that simulates water color gradients
  OceanGradient: () => {
    return (
      <div className="ocean-gradient">
        <style jsx>{`
          .ocean-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, #a1c4fd 0%, #3b82f6 100%);
            opacity: 0.7;
            animation: colorShift 8s ease-in-out infinite alternate;
          }
          
          @keyframes colorShift {
            0% {
              background-position: 0% 50%;
              filter: hue-rotate(0deg);
            }
            100% {
              background-position: 100% 50%;
              filter: hue-rotate(20deg);
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Animated loading spinner with a sea theme
  LoadingSpinner: ({ size = 40, color = "#3B82F6" }) => {
    return (
      <div 
        className="sea-spinner"
        style={{ 
          width: `${size}px`, 
          height: `${size}px` 
        }}
      >
        <div className="wave" style={{ borderColor: color }}></div>
        <div className="wave" style={{ borderColor: color }}></div>
        <div className="wave" style={{ borderColor: color }}></div>
        
        <style jsx>{`
          .sea-spinner {
            position: relative;
            display: inline-block;
          }
          
          .wave {
            position: absolute;
            border: 2px solid;
            border-radius: 50%;
            border-top-color: transparent !important;
            border-right-color: transparent !important;
            animation: spinnerWave 1.5s ease-in-out infinite;
          }
          
          .wave:nth-child(1) {
            inset: 0;
            animation-delay: 0s;
          }
          
          .wave:nth-child(2) {
            inset: 4px;
            animation-delay: 0.2s;
          }
          
          .wave:nth-child(3) {
            inset: 8px;
            animation-delay: 0.4s;
          }
          
          @keyframes spinnerWave {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Animated button with wave effect on hover
  WaveButton: ({ children, onClick, className = "" }) => {
    return (
      <button 
        onClick={onClick} 
        className={`wave-button ${className}`}
      >
        <span className="wave-button-content">{children}</span>
        <div className="wave-effect"></div>
        
        <style jsx>{`
          .wave-button {
            position: relative;
            overflow: hidden;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #3b82f6;
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            cursor: pointer;
            outline: none;
            border: none;
          }
          
          .wave-button-content {
            position: relative;
            z-index: 1;
          }
          
          .wave-effect {
            position: absolute;
            bottom: -100%;
            left: 0;
            width: 100%;
            height: 200%;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
            transform: translateY(0);
            transition: transform 0.5s ease;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          }
          
          .wave-button:hover .wave-effect {
            transform: translateY(-50%);
          }
          
          .wave-button:active {
            transform: scale(0.98);
          }
        `}</style>
      </button>
    );
  },
  
  // Input field with animated bottom border like a wave
  WaveInput: ({ type = "text", placeholder, value, onChange, className = "" }) => {
    return (
      <div className={`wave-input-container ${className}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="wave-input"
        />
        <div className="wave-line"></div>
        
        <style jsx>{`
          .wave-input-container {
            position: relative;
            width: 100%;
            margin-bottom: 1.5rem;
          }
          
          .wave-input {
            width: 100%;
            padding: 0.75rem 0;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1rem;
            color: #1f2937;
            transition: all 0.3s ease;
          }
          
          .wave-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #d1d5db;
            transition: transform 0.3s ease;
          }
          
          .wave-line::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #3b82f6;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }
          
          .wave-input:focus + .wave-line::before {
            transform: scaleX(1);
            animation: waveLine 2s infinite ease-in-out;
          }
          
          @keyframes waveLine {
            0% {
              transform: scaleX(0);
              transform-origin: left;
            }
            45% {
              transform: scaleX(1);
              transform-origin: left;
            }
            55% {
              transform: scaleX(1);
              transform-origin: right;
            }
            100% {
              transform: scaleX(0);
              transform-origin: right;
            }
          }
        `}</style>
      </div>
    );
  },
  
  // Animated notification like a droplet
  DropletNotification: ({ message, type = "info" }) => {
    // Colors based on notification type
    const colors = {
      info: "#3b82f6",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    };
    
    const color = colors[type] || colors.info;
    
    return (
      <div className="droplet-notification" style={{ borderColor: color }}>
        <div className="droplet-icon" style={{ backgroundColor: color }}></div>
        <p className="droplet-message">{message}</p>
        
        <style jsx>{`
          .droplet-notification {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            background-color: white;
            border-left: 4px solid;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            animation: dropIn 0.5s ease-out forwards;
            overflow: hidden;
          }
          
          .droplet-icon {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 0.75rem;
          }
          
          .droplet-message {
            flex: 1;
            font-size: 0.875rem;
            margin: 0;
          }
          
          .droplet-notification::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
            animation: rippleNotification 2s infinite;
            pointer-events: none;
          }
          
          @keyframes dropIn {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            70% {
              transform: translateY(5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes rippleNotification {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 0.3;
            }
            100% {
              opacity: 0;
              transform: scale(2);
            }
          }
        `}</style>
      </div>
    );
  }
};

export default SeaAnimations;
