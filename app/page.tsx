"use client"

import { Github, Twitter, Linkedin, Mail, Volume2, VolumeX, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

export default function Portfolio() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const lines = [
    "$ whoami",
    "> niket (developer, gamer, dreamer)",
    "$ uptime",
    "> 17 years",
    "$ ls skills/",
    "> react typescript nextjs design",
    "$ cat about.txt",
    "> building digital experiences",
    "$ ./connect --social",
  ]

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isAudioPlaying) {
      audioRef.current.pause()
      setIsAudioPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((err) => console.log("Playback failed:", err))
    }
  }

  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < lines.length) {
        if (displayText.length < lines[currentLine].length) {
          setDisplayText(lines[currentLine].slice(0, displayText.length + 1))
        } else {
          setTimeout(() => {
            setCurrentLine(currentLine + 1)
            setDisplayText("")
          }, 1000)
        }
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [currentLine, displayText, lines])

  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleCanPlayThrough = () => setAudioLoaded(true)
      const handleEnded = () => setIsAudioPlaying(false)
      const handlePause = () => setIsAudioPlaying(false)
      const handlePlay = () => setIsAudioPlaying(true)

      audio.addEventListener("canplaythrough", handleCanPlayThrough)
      audio.addEventListener("ended", handleEnded)
      audio.addEventListener("pause", handlePause)
      audio.addEventListener("play", handlePlay)

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough)
        audio.removeEventListener("ended", handleEnded)
        audio.removeEventListener("pause", handlePause)
        audio.removeEventListener("play", handlePlay)
      }
    }
  }, [])

  // Unlock audio on first click anywhere
  useEffect(() => {
    const unlock = () => {
      if (audioRef.current && !isAudioPlaying) {
        audioRef.current.play().catch(() => {})
        setIsAudioPlaying(true)
      }
      document.removeEventListener("click", unlock)
    }
    document.addEventListener("click", unlock)
  }, [isAudioPlaying])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        className="hidden"
      >
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* Audio Control Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={toggleAudio}
          variant="ghost"
          size="sm"
          className="bg-black/30 backdrop-blur-md border border-green-400/40 text-green-400 hover:text-green-300 hover:bg-gray-800/40 transition-all duration-300"
          disabled={!audioLoaded}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="ml-2 text-xs font-mono">
            {!audioLoaded ? "loading..." : isAudioPlaying ? "pause" : "play"}
          </span>
        </Button>
      </div>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://r2.guns.lol/cf05e74a-a276-4233-b445-299499391963.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-5 z-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Floating terminal commands */}
      <div className="absolute inset-0 opacity-10 text-green-300 z-20">
        <div className="absolute top-20 left-10 text-sm rotate-12">$ git status</div>
        <div className="absolute top-40 right-20 text-xs -rotate-6">npm run dev</div>
        <div className="absolute bottom-32 left-20 text-sm rotate-45">$ code .</div>
        <div className="absolute bottom-20 right-32 text-xs -rotate-12">./deploy.sh</div>
        <div className="absolute top-1/2 left-1/4 text-xs rotate-90">$ vim</div>
        <div className="absolute top-1/3 right-1/3 text-sm -rotate-45">$ make</div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl">
          {/* Terminal Header */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-t-lg px-4 py-2 flex items-center gap-2 border border-green-400/20">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm">terminal — portfolio</span>
          </div>

          {/* Terminal Body */}
          <div className="bg-black/30 backdrop-blur-md border-2 border-green-400/30 rounded-b-lg p-8 min-h-[500px]">
            {/* ASCII Art */}
            <div className="text-center mb-8 text-green-400 relative z-20 drop-shadow-lg">
              <pre
                className="[font-family:'JetBrains_Mono','Cascadia_Mono','Fira_Code'] whitespace-pre text-[10px] md:text-[12px]"
                style={{
                  textShadow:
                    "0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4)",
                }}
              >{`
██████╗ ██╗  ██╗ ██████╗ ███████╗███╗   ██╗██╗██╗  ██╗
██╔══██╗██║  ██║██╔═══██╗██╔════╝████╗  ██║██║╚██╗██╔╝
██████╔╝███████║██║   ██║█████╗  ██╔██╗ ██║██║ ╚███╔╝ 
██╔═══╝ ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║██║ ██╔██╗ 
██║     ██║  ██║╚██████╔╝███████╗██║ ╚████║██║██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
              `}</pre>
            </div>

            {/* Typewriter Terminal Lines */}
            <div className="space-y-2 mb-8">
              {lines.slice(0, currentLine).map((line, i) => (
                <div key={i}>
                  <span className="text-green-400">{line}</span>
                </div>
              ))}
              {currentLine < lines.length && (
                <div>
                  <span className="text-green-400">{displayText}</span>
                  {showCursor && <span className="bg-green-400 text-black">█</span>}
                </div>
              )}
            </div>

            {/* Social Links */}
            {currentLine >= lines.length && (
              <div className="space-y-4">
                <div className="text-green-400 mb-4">$ ls connections/</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <Github className="w-5 h-5" />, text: "./github", link: "https://github.com/PhoenixUchiha" },
                    { icon: <Instagram className="w-5 h-5" />, text: "./instagram", link: "https://www.instagram.com/n1k3t_/" },
                    { icon: <Youtube className="w-5 h-5" />, text: "./youtube", link: "https://www.youtube.com/@imphoenix2k3" },
                  ].map((item, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      asChild
                      className="h-auto p-4 bg-gray-900/30 hover:bg-gray-800/40 border border-green-400/40 text-green-400"
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-start gap-2">
                        {item.icon}
                        <span className="text-xs">{item.text}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="w-full h-full opacity-10 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
      </div>
    </div>
  )
}
