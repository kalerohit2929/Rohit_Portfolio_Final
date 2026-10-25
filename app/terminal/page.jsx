
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COMMANDS = {
  help: {
    title: "AVAILABLE OPERATIONS",
    lines: [
      "about       → Developer profile",
      "projects    → Featured work",
      "skills      → Technical arsenal",
      "whoami      → Identity verification",
      "ls          → Explore directories",
      "contact     → Establish connection",
      "sudo hire-rohit → Initiate hiring protocol",
      "matrix      → Unlock the hidden layer",
      "clear       → Clear terminal",
    ],
  },
  about: {
    title: "PROFILE.DAT",
    lines: [
      "ROHIT KALE / FULL-STACK DEVELOPER",
      "Location: Amravati, Maharashtra, India",
      "",
      "I turn complex ideas into thoughtful digital",
      "experiences — from polished interfaces to",
      "functional backend systems.",
      "",
      "Philosophy: Build with logic. Finish with obsession.",
    ],
  },
  projects: {
    title: "DEPLOYED_EXPERIENCES/",
    lines: [
      "[01] HUNGERBOX",
      "     Food delivery platform",
      "     Next.js / Tailwind / JWT / MongoDB",
      "",
      "[02] NEXBRIDGE INTELLIGENCE",
      "     B2B intelligence website",
      "     React / GSAP / Web3Forms",
      "",
      "STATUS: More ideas compiling...",
    ],
  },
  skills: {
    title: "TECHNICAL_ARSENAL.JSON",
    lines: [
      "01 / INTERFACE   React.js · Next.js · Tailwind",
      "02 / LOGIC       JavaScript · ES6+",
      "03 / SERVER      Node.js · Express.js · REST APIs",
      "04 / DATA        MongoDB",
      "05 / MOTION      GSAP",
      "06 / WORKFLOW    Git · GitHub",
      "",
      "Learning mode: PERMANENTLY ENABLED",
    ],
  },
  whoami: {
    title: "IDENTITY VERIFIED",
    lines: [
      "Name       : Rohit Kale",
      "Designation: Full-Stack Developer",
      "Mindset    : Curious by default",
      "Mission    : Ideas → Reality",
      "Limit      : Still being discovered",
    ],
  },
  ls: {
    title: "ROOT DIRECTORY",
    lines: [
      "drwxr-xr-x  about/",
      "drwxr-xr-x  projects/",
      "drwxr-xr-x  experiments/",
      "-rw-r--r--  skills.json",
      "-rw-r--r--  contact.info",
      "-rwxr-xr-x  creativity.exe",
      "-rw-------  obsession.dll",
    ],
  },
  matrix: {
    title: "SECRET LAYER UNLOCKED",
    lines: [
      "01001000 01000101 01001100 01001100 01001111",
      "",
      "You found the hidden layer.",
      "Good developers solve problems.",
      "Great developers stay curious.",
      "",
      "EASTER EGG STATUS: DISCOVERED ✓",
    ],
  },
  "sudo hire-rohit": {
    title: "HIRING PROTOCOL",
    lines: [
      "[OK] Creativity .......... detected",
      "[OK] Problem solving ..... online",
      "[OK] Curiosity ........... unlimited",
      "[OK] Coffee dependency ... optional",
      "",
      "All systems ready.",
      "Let's build something remarkable.",
    ],
  },
};

const BOOT_LINES = [
  "INITIALIZING ROHIT.OS...",
  "Loading creative modules ........ OK",
  "Connecting ideas to execution ... OK",
  "Checking imagination levels ..... INFINITE",
  "Loading portfolio interface ..... OK",
  "SYSTEM READY.",
];

export default function DeveloperTerminal() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const inputRef = useRef(null);
  const endRef = useRef(null);
  const bootTimers = useRef([]);

  useEffect(() => {
    let index = 0;

    function showBootLine() {
      if (index >= BOOT_LINES.length) {
        setBooted(true);
        setHistory([
          {
            type: "system",
            text: 'Welcome to the Backdoor. Type "help" to explore.',
          },
        ]);
        return;
      }

      const currentIndex = index;

      setBootLines((previous) => [
        ...previous,
        BOOT_LINES[currentIndex],
      ]);

      index += 1;

      const timer = setTimeout(showBootLine, 230);
      bootTimers.current.push(timer);
    }

    const initialTimer = setTimeout(showBootLine, 350);
    bootTimers.current.push(initialTimer);

    return () => {
      bootTimers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [history, bootLines]);

  const executeCommand = useCallback((rawCommand) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    setCommandHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    setInput("");

    if (command === "clear") {
      setHistory([]);
      return;
    }

    const entries = [{ type: "command", text: command }];

    if (COMMANDS[command]) {
      const result = COMMANDS[command];

      entries.push({
        type: "output",
        title: result.title,
        lines: result.lines,
      });

      if (command === "matrix") {
        setSecretUnlocked(true);
      }

      if (command === "sudo hire-rohit") {
        setSecretUnlocked(true);
      }

      if (command === "contact") {
        entries.push({
          type: "system",
          text: "Opening your email application...",
        });
      }
    } else {
      entries.push({
        type: "error",
        text: `Unknown command: ${command}. Try "help".`,
      });
    }

    setHistory((previous) => [...previous, ...entries]);

    if (command === "contact") {
      window.location.href =
        "mailto:kalerohit291@gmail.com?subject=Let's%20Build%20Something";
    }

    if (command === "sudo hire-rohit") {
      window.setTimeout(() => {
        window.location.href =
          "mailto:kalerohit291@gmail.com?subject=Hiring%20Opportunity";
      }, 900);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    executeCommand(input);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  }

  return (
    <section
      id="backdoor"
      className="backdoor relative isolate w-full overflow-hidden bg-[#090909] px-4 py-24 text-[#E5E5E5] sm:px-6 md:py-32"
    >
      <div className="backdoor-grid pointer-events-none absolute inset-0" />
      <div className="backdoor-glow pointer-events-none absolute left-1/2 top-1/2" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#C6FF00] sm:text-xs">
              <span className="h-px w-8 bg-[#C6FF00]" />
              UNAUTHORIZED ACCESS / 001
            </div>

            <h1 className="backdoor-heading text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-7xl md:text-8xl">
              BEYOND
              <br />
              THE <span className="lime-text">CODE.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Not just another portfolio section. A little
              piece of my developer brain. Enter a command
              and see what you discover.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start border border-[#C6FF00]/20 bg-[#C6FF00]/[0.04] px-4 py-3 font-mono text-[10px] tracking-widest text-[#C6FF00] md:self-auto">
            <span className="status-dot h-2 w-2 rounded-full bg-[#C6FF00]" />
            {booted ? "SYSTEM OPERATIONAL" : "BOOTING SYSTEM"}
          </div>
        </div>

        {/* Terminal */}
        <div className="terminal-shell relative">
          <div className="terminal-edge" />

          {/* Window header */}
          <div className="terminal-header flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>

            <div className="font-mono text-[10px] tracking-[0.15em] text-white/35 sm:text-xs">
              <span className="text-[#C6FF00]/70">root</span>
              @rohit-portfolio / terminal
            </div>

            <div className="font-mono text-[9px] text-white/30">
              SECURE SHELL
            </div>
          </div>

          {/* Boot animation */}
          {!booted ? (
            <div className="boot-screen flex min-h-[340px] flex-col justify-center px-5 py-8 font-mono text-xs leading-7 sm:min-h-[390px] sm:px-8 sm:text-sm">
              <div className="mb-5 text-[#C6FF00]">
                &gt; INITIALIZING ENVIRONMENT
              </div>

              {bootLines.map((line, index) => (
                <div
                  key={line}
                  className={`boot-line ${
                    index === bootLines.length - 1
                      ? "text-[#C6FF00]"
                      : "text-white/45"
                  }`}
                >
                  <span className="mr-3 text-[#C6FF00]/50">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  {line}
                </div>
              ))}

              <div className="mt-5 h-px w-full max-w-xs overflow-hidden bg-white/10">
                <div className="boot-progress h-full bg-[#C6FF00]" />
              </div>
            </div>
          ) : (
            <>
              {/* Terminal output */}
              <div
                className="terminal-output h-[360px] overflow-y-auto px-4 py-6 font-mono text-xs leading-6 sm:h-[430px] sm:px-8 sm:py-8 sm:text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                <div className="mb-5 flex items-center gap-2 text-[10px] text-white/30">
                  <span className="text-[#C6FF00]">●</span>
                  SESSION STARTED
                  <span className="mx-1 text-white/15">/</span>
                  INTERACTIVE MODE
                </div>

                {history.map((item, index) => (
                  <div
                    key={`${index}-${item.type}`}
                    className="terminal-entry mb-4"
                    style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}
                  >
                    {item.type === "system" && (
                      <p className="text-white/40">{item.text}</p>
                    )}

                    {item.type === "command" && (
                      <p className="break-words">
                        <span className="text-[#C6FF00]">rohit</span>
                        <span className="text-white/30">@</span>
                        <span className="text-blue-300">portfolio</span>
                        <span className="text-white/40">:~$ </span>
                        <span className="text-white">{item.text}</span>
                      </p>
                    )}

                    {item.type === "error" && (
                      <p className="break-words text-red-400">
                        <span className="mr-2">ERR</span>
                        {item.text}
                      </p>
                    )}

                    {item.type === "output" && (
                      <div className="output-block mt-3 border-l border-[#C6FF00]/35 pl-4 sm:pl-5">
                        <p className="mb-3 text-[10px] tracking-[0.16em] text-[#C6FF00] sm:text-xs">
                          {item.title}
                        </p>

                        {item.lines.map((line, lineIndex) => (
                          <p
                            key={lineIndex}
                            className={`whitespace-pre-wrap break-words ${
                              line === ""
                                ? "h-2"
                                : "text-white/60"
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex items-start gap-2"
                >
                  <span className="shrink-0 text-[#C6FF00]">
                    <span className="text-white/30">rohit@portfolio</span>
                    <span className="text-white/40">:~$</span>
                  </span>

                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Terminal command"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="enter command..."
                    className="terminal-input min-w-0 flex-1 bg-transparent text-[#C6FF00] outline-none placeholder:text-white/20"
                  />

                  <span className="cursor-blink text-[#C6FF00]">▋</span>
                </form>

                <div ref={endRef} />
              </div>

              {/* Command toolbar */}
              <div className="border-t border-white/[0.08] bg-white/[0.015] px-4 py-5 sm:px-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-white/35">
                    QUICK COMMANDS
                  </span>
                  <span className="font-mono text-[9px] text-white/25">
                    ↑ ↓ HISTORY
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "help",
                    "about",
                    "projects",
                    "skills",
                    "whoami",
                    "matrix",
                  ].map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => executeCommand(command)}
                      className="command-chip border border-white/10 px-3 py-2 font-mono text-[10px] text-white/50 transition-all duration-300 hover:border-[#C6FF00]/50 hover:bg-[#C6FF00]/[0.07] hover:text-[#C6FF00] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C6FF00]"
                    >
                      <span className="mr-1 text-[#C6FF00]/50">&gt;</span>
                      {command}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom identity strip */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              CURRENT MODE
            </p>
            <p className="mt-2 text-xs text-white/65">
              {booted ? "Interactive / Creative" : "System initialization"}
            </p>
          </div>

          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              HIDDEN LAYER
            </p>
            <p className="mt-2 text-xs text-white/65">
              {secretUnlocked
                ? "Unlocked — curious mind detected."
                : "Locked — try exploring."}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              BUILT BY
            </p>
            <p className="mt-2 text-xs text-[#C6FF00]">
              ROHIT KALE <span className="text-white/30">/ 2026</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .backdoor {
          isolation: isolate;
        }

        .backdoor-grid {
          z-index: -2;
          opacity: 0.19;
          background-image:
            linear-gradient(rgba(198, 255, 0, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198, 255, 0, 0.055) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 80%,
            transparent
          );
        }

        .backdoor-glow {
          z-index: -1;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: rgba(198, 255, 0, 0.055);
          filter: blur(130px);
          animation: glow-drift 9s ease-in-out infinite alternate;
        }

        .backdoor-heading {
          animation: heading-enter 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .lime-text {
          color: #c6ff00;
          text-shadow: 0 0 30px rgba(198, 255, 0, 0.16);
          animation: lime-flicker 5s ease-in-out infinite;
        }

        .terminal-shell {
          overflow: hidden;
          border: 1px solid rgba(198, 255, 0, 0.2);
          background: rgba(12, 12, 12, 0.95);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.015),
            0 20px 100px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(198, 255, 0, 0.035);
          animation: terminal-enter 1s 0.15s both;
        }

        .terminal-edge {
          position: absolute;
          z-index: 2;
          top: 0;
          left: -40%;
          width: 35%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #c6ff00,
            transparent
          );
          box-shadow: 0 0 18px rgba(198, 255, 0, 0.8);
          animation: edge-scan 6s ease-in-out infinite;
          pointer-events: none;
        }

        .terminal-header {
          background: linear-gradient(100deg, #151515, #101010);
        }

        .status-dot {
          box-shadow: 0 0 10px rgba(198, 255, 0, 0.8);
          animation: status-pulse 2s infinite;
        }

        .boot-line {
          animation: boot-line-enter 0.3s both;
        }

        .boot-progress {
          animation: boot-progress 1.6s ease-out both;
        }

        .terminal-entry {
          animation: output-enter 0.3s ease-out both;
        }

        .output-block {
          animation: output-enter 0.45s ease-out both;
        }

        .cursor-blink {
          animation: cursor-blink 1s steps(2, start) infinite;
        }

        .command-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(198, 255, 0, 0.055);
        }

        .terminal-output {
          scrollbar-width: thin;
          scrollbar-color: rgba(198, 255, 0, 0.25) transparent;
        }

        .terminal-output::-webkit-scrollbar {
          width: 4px;
        }

        .terminal-output::-webkit-scrollbar-thumb {
          background: rgba(198, 255, 0, 0.25);
        }

        @keyframes heading-enter {
          from {
            opacity: 0;
            transform: translateY(25px);
            letter-spacing: -0.11em;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes terminal-enter {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes edge-scan {
          0% {
            left: -40%;
          }
          55%,
          100% {
            left: 110%;
          }
        }

        @keyframes boot-line-enter {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes boot-progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes output-enter {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursor-blink {
          to {
            visibility: hidden;
          }
        }

        @keyframes status-pulse {
          50% {
            opacity: 0.45;
            box-shadow: 0 0 3px rgba(198, 255, 0, 0.3);
          }
        }

        @keyframes glow-drift {
          from {
            transform: translate(-55%, -45%) scale(0.9);
          }
          to {
            transform: translate(-42%, -55%) scale(1.12);
          }
        }

        @keyframes lime-flicker {
          0%,
          94%,
          100% {
            opacity: 1;
          }
          96% {
            opacity: 0.7;
          }
          98% {
            opacity: 0.95;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .backdoor *,
          .backdoor *::before,
          .backdoor *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
