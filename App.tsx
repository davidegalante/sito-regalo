import React, { useState, useRef, useEffect } from 'react';
import { components } from './components/Icons';
import { LockScreen } from './components/LockScreen';
import { initialPlaylistPaths, Song } from './music/playlist';

// --- Tipi e Interfacce ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dichiarazione per jsmediatags che viene caricato globalmente
declare global {
  interface Window {
    jsmediatags: any;
  }
}

// --- Componente Modale per la Lettera ---
const LetterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-28 sm:pt-40 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[#fef6e4] p-8 sm:p-12 rounded-lg shadow-2xl max-w-2xl w-full relative transform animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="Close letter">
          <components.CloseIcon className="w-8 h-8" />
        </button>
        <div className="text-gray-700 space-y-4 font-handwriting">
           <p className="text-2xl sm:text-3xl">My Dearest,</p>
           <p className="text-xl sm:text-2xl leading-relaxed sm:leading-loose">
               If you're reading this, it means you've found my little secret. I wanted to create something that felt like a warm hug on a cold day, a tangible representation of how much you mean to me. You are my sunshine, my favorite song, and the best part of my day. Thank you for being you. Thank you for choosing me. I love you more than words can say.
           </p>
           <p className="text-right mt-6 text-2xl sm:text-3xl">Forever and always,</p>
           <p className="text-right text-2xl sm:text-3xl">Your BF</p>
        </div>
      </div>
    </div>
  );
};

// --- Componente Modale per il Biglietto ---
const TicketModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-28 sm:pt-40 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[#fef6e4] rounded-2xl shadow-2xl w-full max-w-sm transform animate-fade-in flex overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-1/3 bg-[#f5eadd] p-4 flex flex-col items-center justify-between border-r-2 border-dashed border-[#d3c0a9]">
           <div className="text-center">
              <p className="font-bold text-[#b59f84] text-xs transform -rotate-90 whitespace-nowrap origin-center mt-12">ADMIT ONE</p>
           </div>
           <div className="text-[#b59f84]">
             <components.HeartIcon className="w-8 h-8"/>
           </div>
           <div className="text-center">
              <p className="font-bold text-[#b59f84] text-xs transform -rotate-90 whitespace-nowrap origin-center mb-12">No. 1023</p>
           </div>
        </div>
        <div className="w-2/3 p-6 text-gray-700 flex flex-col justify-between">
          <div>
            <h3 className="font-handwriting text-3xl text-brand-pink-500">A Perfect Day</h3>
            <p className="text-xs text-gray-500 mb-4">Official Invitation</p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-[#b59f84]">Date:</strong> Any Day You Choose</p>
              <p><strong className="text-[#b59f84]">Time:</strong> Sunrise to Sunset</p>
              <p><strong className="text-[#b59f84]">Venue:</strong> Wherever We're Together</p>
            </div>
          </div>
          <div className="mt-4">
             <p className="text-xs text-gray-600 leading-tight">Includes: cuddling, movie marathons, endless snacks, and non-stop laughter. </p>
             <p className="text-xs text-[#b59f84] mt-2">Price: One (1) Hug</p>
          </div>
        </div>
      </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close ticket">
          <components.CloseIcon className="w-8 h-8" />
        </button>
    </div>
  );
};

// --- Componente Modale per la Foto ---
const PhotoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setIsFlipped(false), 300); // Reset after closing animation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 pt-28 sm:pt-40 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg cursor-pointer group outline-none"
                style={{ perspective: '1200px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                }}
            >
                <div
                    className="relative w-full transition-transform duration-700 ease-in-out"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', aspectRatio: '4/5' }}
                >
                    {/* Fronte: Foto */}
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <img src="https://i.imgur.com/AOQzuBM.jpeg" alt="Zoomed in photo of two penguins" className="w-full h-full object-cover rounded-xl shadow-2xl" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                            <p className="text-white font-bold text-lg">Click to flip</p>
                        </div>
                    </div>

                    {/* Retro: Messaggio */}
                    <div className="absolute w-full h-full bg-[#fef6e4] p-8 sm:p-12 rounded-xl shadow-2xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="text-center text-gray-700 font-handwriting">
                            <p className="text-2xl sm:text-4xl leading-relaxed">
                                Every moment with you<br/>is my favorite memory.<br/>You are my home.
                            </p>
                            <p className="mt-8 text-3xl text-brand-pink-400">♡</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close photo view">
              <components.CloseIcon className="w-8 h-8" />
            </button>
        </div>
    );
};


// --- Animazione del Cuore Disegnato ---
const HeartPainter: React.FC<{ onComplete: () => void; position: { x: number; y: number } }> = ({ onComplete, position }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  const pathLength = 200;

  return (
    <div 
      className="fixed z-[100] pointer-events-none"
      style={{
        top: 0,
        left: 0,
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-64 h-64 drop-shadow-lg"
        style={{ animation: 'fade-out-slowly 1s 2s forwards' }}
      >
        <path
          d={heartPath}
          fill="none"
          stroke="#ef4444"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
          style={{ animation: 'draw-heart 2s ease-out forwards' }}
        />
      </svg>
    </div>
  );
};

// --- Componente Music Player ---
const MusicPlayer = () => {
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const loadSongsMetadata = async () => {
            try {
                await new Promise<void>((resolve, reject) => {
                    let attempts = 0;
                    const maxAttempts = 20;
                    const interval = setInterval(() => {
                        if (window.jsmediatags) {
                            clearInterval(interval);
                            resolve();
                        } else {
                            attempts++;
                            if (attempts >= maxAttempts) {
                                clearInterval(interval);
                                reject(new Error("La libreria jsmediatags non è riuscita a caricarsi."));
                            }
                        }
                    }, 250);
                });

                const songPromises = initialPlaylistPaths.map(async (src): Promise<Song> => {
                    try {
                        const response = await fetch(src);
                        if (!response.ok) {
                            throw new Error(`File non trovato o errore di rete: ${response.statusText}`);
                        }
                        const fileBlob = await response.blob();

                        return new Promise<Song>((resolve) => {
                            window.jsmediatags.read(fileBlob, {
                                onSuccess: (tag: any) => {
                                    try {
                                        const { title, artist, picture } = tag.tags;
                                        let cover = null;
                                        if (picture) {
                                            const { data, format } = picture;
                                            let base64String = "";
                                            for (let i = 0; i < data.length; i++) {
                                                base64String += String.fromCharCode(data[i]);
                                            }
                                            cover = `data:${format};base64,${window.btoa(base64String)}`;
                                        }
                                        resolve({
                                            src,
                                            title: title || src.split('/').pop()?.replace('.mp3', '') || 'Unknown Title',
                                            artist: artist || 'Unknown Artist',
                                            cover
                                        });
                                    } catch (e) {
                                        console.error(`Errore nell'elaborazione dei tag per ${src}:`, e);
                                        resolve({ src, title: src.split('/').pop()?.replace('.mp3', '') || 'Unknown Title', artist: 'Unknown Artist', cover: null });
                                    }
                                },
                                onError: (error: any) => {
                                    console.warn(`jsmediatags non è riuscito a leggere ${src}:`, error);
                                    resolve({ src, title: src.split('/').pop()?.replace('.mp3', '') || 'Unknown Title', artist: 'Unknown Artist', cover: null });
                                }
                            });
                        });
                    } catch (fetchError) {
                        console.error(`Impossibile caricare il file audio da ${src}:`, fetchError);
                        return {
                            src,
                            title: src.split('/').pop()?.replace('.mp3', '') || 'Unknown Title',
                            artist: 'Unknown Artist',
                            cover: null
                        };
                    }
                });

                const loadedSongs = await Promise.all(songPromises);
                setPlaylist(loadedSongs);
                if (loadedSongs.length > 0) {
                    setCurrentTrackIndex(0);
                }
            } catch (error) {
                console.error("Inizializzazione del lettore musicale fallita:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSongsMetadata();
    }, []);
    
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentTrackIndex !== null) {
            audio.load();
            if (isPlaying) {
                audio.play().catch(e => console.error("Errore di riproduzione:", e));
            }
        }
    }, [currentTrackIndex]);
    
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        if (isPlaying) {
            audio.play().catch(e => console.error("Errore di riproduzione:", e));
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlayPause = () => {
        if (currentTrackIndex === null) return;
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (playlist.length === 0) return;
        const nextIndex = ((currentTrackIndex ?? -1) + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const playPrev = () => {
        if (playlist.length === 0) return;
        const prevIndex = ((currentTrackIndex ?? 1) - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if(audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if(audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (isMuted && newVolume > 0) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

    return (
        <div className="w-full bg-[#fef6e4] p-4 rounded-lg shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-brand-pink-100 rounded-md shadow-inner flex-shrink-0 flex items-center justify-center">
                    {currentTrack && currentTrack.cover ? (
                        <img src={currentTrack.cover} alt="Album cover" className="w-full h-full object-cover rounded-md" />
                    ) : (
                        <components.MusicNoteIcon className="w-10 h-10 text-brand-pink-300" />
                    )}
                </div>
                <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-gray-700 truncate">{isLoading ? 'Caricamento...' : currentTrack?.title || 'Playlist Vuota'}</h3>
                    <p className="text-sm text-gray-500 truncate">{isLoading ? '...' : currentTrack?.artist || 'Nessuna canzone'}</p>
                </div>
            </div>

            <div className="w-full">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-brand-pink-200 rounded-lg appearance-none cursor-pointer"
                    disabled={!currentTrack || isLoading}
                    aria-label="Seek slider"
                />
                 <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                 </div>
            </div>

            <div className="flex justify-center items-center gap-6 text-brand-pink-500">
                <button onClick={playPrev} disabled={playlist.length < 2} className="disabled:opacity-50 transition-transform active:scale-90" aria-label="Previous song"><components.MusicPrevIcon className="w-6 h-6" /></button>
                <button onClick={togglePlayPause} disabled={!currentTrack || isLoading} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 hover:scale-110 transition-transform active:scale-95" aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <components.MusicPauseIcon className="w-6 h-6" /> : <components.MusicPlayIcon className="w-6 h-6" />}
                </button>
                <button onClick={playNext} disabled={playlist.length < 2} className="disabled:opacity-50 transition-transform active:scale-90" aria-label="Next song"><components.MusicNextIcon className="w-6 h-6" /></button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
                <button onClick={toggleMute} className="text-brand-pink-400 hover:text-brand-pink-600 transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted || volume === 0 ? <components.VolumeMuteIcon className="w-5 h-5" /> : <components.VolumeHighIcon className="w-5 h-5" />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-brand-pink-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Volume slider"
                />
            </div>
            
            <audio 
                ref={audioRef}
                src={currentTrack?.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={playNext}
                aria-hidden="true"
            />

             {!isLoading && playlist.length > 0 && (
                <div className="max-h-24 overflow-y-auto bg-brand-pink-50/50 p-2 rounded-md mt-2 space-y-1">
                    {playlist.map((song, index) => (
                        <button
                            key={index}
                            onClick={() => {setCurrentTrackIndex(index); setIsPlaying(true);}}
                            className={`w-full text-left p-1.5 rounded-md text-sm truncate transition-colors ${index === currentTrackIndex ? 'bg-brand-pink-200 text-white font-bold' : 'hover:bg-brand-pink-100'}`}
                        >
                           {song.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- Componente Principale dell'Applicazione ---
const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [paintPosition, setPaintPosition] = useState<{ x: number; y: number } | null>(null);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  
  const openLetter = () => setIsLetterOpen(true);
  const closeLetter = () => setIsLetterOpen(false);
  const openTicket = () => setIsTicketOpen(true);
  const closeTicket = () => setIsTicketOpen(false);
  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  const handlePaintClick = () => {
    if (isPainting) return;
    setPaintPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setIsPainting(true);
  };
  
  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="bg-brand-pink-50 min-h-screen text-gray-700 animate-fade-in">
      {isPainting && paintPosition && <HeartPainter position={paintPosition} onComplete={() => { setIsPainting(false); setPaintPosition(null); }} />}
      
      <main className="relative max-w-5xl lg:max-w-7xl mx-auto p-4 sm:p-8 md:p-12 h-[200vh] sm:h-[150vh] md:h-screen">
        
        <div className="absolute top-[5%] left-[5%] lg:left-[2%] text-brand-pink-200 opacity-60">
            <components.HeartIcon className="w-10 h-10 sm:w-12 sm:h-12 rotate-[-15deg]"/>
        </div>
        <div className="absolute top-[20%] right-[10%] lg:right-[5%] text-brand-pink-200 opacity-60">
            <components.StarIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
        </div>
        <div className="absolute bottom-[25%] left-[15%] lg:bottom-[10%] lg:left-[10%] text-brand-pink-200 opacity-60">
            <components.SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 rotate-12"/>
        </div>

        <div className="absolute top-[2%] sm:top-[5%] left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-white p-4 rounded-lg shadow-lg rotate-[-2deg] z-10">
          <h2 className="font-bold text-center text-brand-pink-500">♡ NOTICE ♡</h2>
          <p className="text-sm mt-2"><b>To:</b> the most beautiful GF</p>
          <p className="text-sm"><b>From:</b> your loving BF</p>
        </div>

        <a href="#section-start" className="absolute top-[15%] sm:top-[20%] left-1/2 -translate-x-1/2 bg-gray-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 z-10 text-sm outline-none focus:outline-none">
          01 — Start here!
        </a>

        <button
            onClick={openPhotoModal}
            className="absolute top-[48%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[300px] sm:w-[320px] sm:h-[400px] lg:w-[380px] lg:h-[475px] bg-white p-3 rounded-lg shadow-2xl rotate-2 transform hover:scale-105 transition-transform duration-300 z-20 cursor-pointer outline-none focus:outline-none"
            aria-label="View photo and secret message"
        >
            <img src="https://i.imgur.com/AOQzuBM.jpeg" alt="Foto di due pinguini che si guardano in Antartide" className="w-full h-full object-cover rounded-md"/>
            <div className="absolute -top-4 -left-4 text-brand-pink-300 z-30">
                <components.HeartIcon className="w-8 h-8"/>
            </div>
            <div className="absolute -bottom-3 -right-3 text-brand-pink-300 z-30">
                <components.HeartIcon className="w-10 h-10 rotate-12"/>
            </div>
        </button>

        <div className="absolute top-[38%] left-[calc(50%-130px)] sm:top-[12%] sm:left-[15%] md:left-[20%] lg:left-[24%] xl:left-[28%] w-16 h-16 rotate-[-25deg] z-20">
          <components.BinderClipIcon className="text-pink-300 drop-shadow-md"/>
        </div>

        <div className="absolute top-[25%] left-[5%] w-44 rotate-[-8deg] sm:w-56 sm:top-[38%] sm:left-[5%] md:left-[8%] lg:left-[2%] xl:left-[5%] bg-transparent p-2 z-10">
          <p className="leading-relaxed font-handwriting text-xl sm:text-2xl">
            <span className="bg-brand-pink-200 px-1">"I will always come looking for you, Angel, and I would burn the whole world down to find you."</span>
          </p>
        </div>

        <button
          onClick={handlePaintClick}
          className="absolute top-[22%] left-[10%] w-16 h-16 rotate-[15deg] sm:w-24 sm:h-24 sm:top-[20%] sm:left-[10%] md:left-[12%] lg:left-[8%] z-20 transform transition-all duration-300 hover:scale-110 hover:rotate-[5deg] outline-none focus:outline-none group cursor-pointer"
          aria-label="Draw a heart"
          disabled={isPainting}
        >
          <components.PaintBrushIcon className="w-full h-full drop-shadow-lg" />
        </button>

         <button onClick={openTicket} className="absolute top-[72%] left-[5%] w-36 rotate-[8deg] sm:top-[72%] sm:left-[5%] md:top-[62%] md:left-[8%] lg:left-[2%] xl:left-[5%] bg-yellow-200 p-3 rounded-lg shadow-md z-10 transform hover:rotate-6 transition-transform outline-none focus:outline-none">
            <div className="border-2 border-dashed border-red-300 p-2 text-center">
                <p className="font-bold text-red-500 text-xs">TICKET TO</p>
                <p className="text-2xl font-handwriting text-red-500">Happiness</p>
            </div>
        </button>
        
        <button onClick={openLetter} className="absolute top-[88%] left-[10%] w-28 h-28 rotate-[-10deg] sm:w-32 sm:h-32 sm:top-auto sm:bottom-[18%] sm:left-[5%] md:bottom-[15%] md:left-[8%] lg:left-[2%] xl:left-[5%] transform hover:scale-110 transition-transform z-10 cursor-pointer outline-none focus:outline-none rounded-lg" aria-label="Open letter">
            <components.EnvelopeIcon />
        </button>

        <button onClick={openLetter} className="absolute top-1/2 left-1/2 -translate-x-1/2 transform translate-y-[170px] sm:translate-y-[230px] lg:translate-y-[270px] bg-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-transform hover:scale-105 z-30 text-sm flex items-center gap-2 cursor-pointer outline-none focus:outline-none">
            <components.BookIcon className="w-4 h-4" /> Read me ♡
        </button>
        
        <div className="absolute top-[20%] right-[15%] w-16 h-16 rotate-12 sm:top-[15%] sm:right-[15%] md:right-[20%] lg:right-[24%] xl:right-[28%] z-20">
            <components.WaxSealIcon className="text-brand-pink-400 drop-shadow-lg" />
        </div>

        <div className="absolute top-[28%] right-[5%] w-44 rotate-6 sm:w-56 sm:top-[32%] sm:right-[5%] md:right-[8%] lg:right-[2%] xl:right-[5%] bg-[#fef6e4] p-4 rounded-lg shadow-lg transform transition-transform hover:rotate-3 z-10">
            <p className="font-handwriting text-xl sm:text-2xl leading-tight text-gray-600">
                Lights will guide you home, and ignite your bones, and I will try to fix you.
            </p>
             <div className="flex justify-end mt-2 text-brand-pink-300">
                <components.StarIcon className="w-4 h-4"/>
                <components.StarIcon className="w-3 h-3 ml-1"/>
                <components.StarIcon className="w-4 h-4 ml-1"/>
             </div>
        </div>

        <div className="absolute top-[78%] right-[8%] w-20 h-24 rotate-[-3deg] sm:w-24 sm:top-[72%] sm:right-[5%] md:top-[60%] md:right-[12%] lg:right-[8%] z-10">
            <components.CandleIcon />
        </div>

        <a href="#section-love" className="absolute bottom-[20%] sm:bottom-0 left-1/2 -translate-x-1/2 bg-gray-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 z-10 text-sm outline-none focus:outline-none">
          02 — Things I love about you ♡
        </a>
        
        <div className="absolute bottom-[-2%] right-[-10%] sm:right-0 md:right-[-5%] lg:right-[-2%] w-32 h-auto sm:w-40 opacity-70 z-0">
          <components.VinylIcon className="text-brand-pink-300" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xs rotate-0 sm:w-80 sm:left-auto sm:right-5 sm:-translate-x-0 sm:bottom-[8%] md:bottom-[4%] md:right-[8%] lg:right-[2%] xl:right-[5%] sm:rotate-[-2deg] z-20 transform transition-transform hover:rotate-[-1deg]">
            <h2 className="font-handwriting text-xl text-center text-gray-600 mb-2">
                <span className="bg-brand-pink-200 px-2 py-0.5">Songs that remind me of you</span>
            </h2>
            <MusicPlayer />
        </div>
      </main>

      <div className="space-y-24 px-4 sm:px-8 pb-24">
        <section id="section-start" className="max-w-3xl lg:max-w-4xl mx-auto pt-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-handwriting text-brand-pink-500 mb-4">Our Story Begins...</h2>
            <p className="text-base sm:text-lg leading-relaxed">
                This is a little corner of the internet I made just for you. A place to hold our memories, our dreams, and all the little things that make us, 'us'. Every piece here is a reminder of a moment, a feeling, a song that reminds me of you. Click around and explore our world.
            </p>
        </section>

        <section id="section-love" className="max-w-3xl lg:max-w-4xl mx-auto pt-20">
            <h2 className="text-3xl sm:text-4xl font-handwriting text-brand-pink-500 mb-6 text-center">Things I Love About You...</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg">
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> Your laugh when you think something is really funny.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> The way you get excited about little things.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> How you always know how to make me feel better.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> Your kindness to everyone you meet.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> That you're the smartest person I know.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> ...and the list goes on forever.
                </li>
            </ul>
        </section>
      </div>
      
      <LetterModal isOpen={isLetterOpen} onClose={closeLetter} />
      <TicketModal isOpen={isTicketOpen} onClose={closeTicket} />
      <PhotoModal isOpen={isPhotoModalOpen} onClose={closePhotoModal} />
    </div>
  );
};

export default App;