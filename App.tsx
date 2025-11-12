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

// --- Componente Modale di Benvenuto ---
// Questo componente mostra un popup di benvenuto quando l'utente sblocca l'applicazione.
const WelcomeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Se la prop 'isOpen' è false, il componente non renderizza nulla (restituisce null).
  if (!isOpen) return null;

  // Renderizza il modale.
  return (
    // Contenitore principale (overlay).
    // - `fixed inset-0`: Copre l'intera viewport.
    // - `bg-black/70`: Sfondo nero semi-trasparente.
    // - `z-[100]`: Si assicura che sia sopra a tutti gli altri contenuti.
    // - `flex items-start justify-center pt-40`: Allinea il contenuto in alto (con padding) e al centro orizzontalmente.
    // - `cursor-pointer`: Indica che l'area è cliccabile (per chiudere il modale).
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-start justify-center pt-40 transition-opacity duration-500 animate-fade-in cursor-pointer"
      onClick={onClose} // Chiude il modale quando si clicca sull'overlay.
      aria-modal="true" // Proprietà di accessibilità per indicare che è un modale.
      role="dialog"     // Ruolo di accessibilità.
    >
      {/* Box del contenuto del modale. */}
      {/* L'evento onClick con stopPropagation impedisce la chiusura del modale se si clicca sul box stesso. */}
      <div
        className="bg-[#fef6e4] p-8 sm:p-12 rounded-lg shadow-2xl w-[95%] max-w-lg text-center relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titolo del modale. */}
        <h2 className="font-handwriting text-3xl sm:text-4xl text-brand-pink-500 mb-4">Benvenuta!</h2>
        {/* Testo di benvenuto. */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Hai appena aperto le porte di questo piccolo mondo segreto.
          <br/><br/>
          Molti oggetti sulla pagina sono interattivi e nascondono delle sorprese.
          Tocca, clicca ed esplora per scoprirle tutte!
        </p>
        {/* Suggerimento per l'utente su come chiudere il modale. */}
         <p className="text-xs text-gray-400 mt-6">(Clicca ovunque per iniziare)</p>
      </div>
    </div>
  );
};


// --- Componente Modale per la Lettera ---
const LetterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTopPosition(window.scrollY + 140); // posizione dinamica
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-start justify-center transition-opacity duration-500 animate-fade-in cursor-pointer"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#fef6e4] p-8 sm:p-12 rounded-lg shadow-2xl w-[95%] max-w-2xl text-gray-700 animate-fade-in max-h-[90vh] overflow-y-auto relative cursor-default"
        style={{ marginTop: `${topPosition}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Chiudi lettera"
        >
          <components.CloseIcon className="w-8 h-8" />
        </button>

        <div className="space-y-4 font-handwriting">
          <p className="text-2xl sm:text-3xl">Amore Mio,</p>
          <p className="text-xl sm:text-2xl leading-relaxed sm:leading-loose">
            Se stai leggendo questo, significa che hai scoperto il mio piccolo segreto.
            Volevo creare qualcosa che sembrasse un caldo abbraccio in un giorno freddo,
            una rappresentazione tangibile di quanto significhi per me.
            Sei il mio raggio di sole, la mia canzone preferita e la parte migliore della mia giornata.
            Grazie di esistere. Grazie per avermi scelto.
            Ti amo più di quanto le parole possano dire.
          </p>
          <p className="text-right mt-6 text-2xl sm:text-3xl">Per sempre e oltre,</p>
          <p className="text-right text-2xl sm:text-3xl">Il tuo Ragazzo</p>
        </div>
      </div>
    </div>
  );
};




// --- Componente Modale per il Biglietto (allineato a WelcomeModal) ---
const TicketModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTopPosition(window.scrollY + 140);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-start justify-center transition-opacity duration-500 animate-fade-in cursor-pointer"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#fef6e4] rounded-2xl shadow-2xl w-[95%] max-w-sm animate-fade-in flex overflow-hidden max-h-[90vh] overflow-y-auto relative cursor-default"
        style={{ marginTop: `${topPosition}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Parte sinistra */}
        <div className="w-1/3 bg-[#f5eadd] p-4 flex flex-col items-center justify-between border-r-2 border-dashed border-[#d3c0a9]">
          <div className="text-center">
            <p className="font-bold text-[#b59f84] text-xs transform -rotate-90 whitespace-nowrap origin-center mt-12">INGRESSO</p>
          </div>
          <div className="text-[#b59f84]">
            <components.HeartIcon className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-bold text-[#b59f84] text-xs transform -rotate-90 whitespace-nowrap origin-center mb-12">No. 1023</p>
          </div>
        </div>

        {/* Parte destra */}
        <div className="w-2/3 p-6 text-gray-700 flex flex-col justify-between">
          <div>
            <h3 className="font-handwriting text-3xl text-brand-pink-500">Un Giorno Perfetto</h3>
            <p className="text-xs text-gray-500 mb-4">Invito Ufficiale</p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-[#b59f84]">Data:</strong> Qualsiasi Giorno Tu Scelga</p>
              <p><strong className="text-[#b59f84]">Orario:</strong> Dall'Alba al Tramonto</p>
              <p><strong className="text-[#b59f84]">Luogo:</strong> Ovunque Siamo Insieme</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-600 leading-tight">
              Include: coccole, maratone di film, snack infiniti e risate non-stop.
            </p>
            <p className="text-xs text-[#b59f84] mt-2">Prezzo: Un (1) Abbraccio</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600/70 hover:text-gray-900"
          aria-label="Chiudi biglietto"
        >
          <components.CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};



// --- Componente Modale per la Foto ---
const PhotoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    // Stato per gestire l'effetto "flip" della foto.
    const [isFlipped, setIsFlipped] = useState(false);
    // Stato per il posizionamento verticale.
    const [topPosition, setTopPosition] = useState(0);

    // useEffect per gestire l'apertura e la chiusura.
    useEffect(() => {
        // Quando il modale si apre, calcola la posizione.
        if (isOpen) {
            setTopPosition(window.scrollY + 130);
        } else {
            // Quando si chiude, aspetta 300ms (la durata dell'animazione di chiusura)
            // e poi resetta lo stato `isFlipped` a false, così la prossima volta
            // che si apre, la foto sarà mostrata dal lato giusto.
            const timer = setTimeout(() => setIsFlipped(false), 300); 
            return () => clearTimeout(timer); // Pulisce il timer se il componente viene smontato.
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Funzione di chiusura separata per evitare che la propagazione dell'evento
    // attivi anche l'handler `onClick` dell'overlay.
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        // Contenitore overlay.
        <div
            className="fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Contenitore per la foto, gestisce la prospettiva per l'effetto 3D. */}
            <div
                className="absolute w-[95%] max-w-sm sm:max-w-md lg:max-w-lg cursor-pointer group outline-none"
                style={{
                  top: `${topPosition}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  perspective: '1200px' // Aggiunge prospettiva per l'effetto 3D.
                }}
                // Cliccando sulla foto, inverte lo stato `isFlipped`.
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                }}
            >
                {/* Contenitore interno che ruota. */}
                {/* - `transformStyle: 'preserve-3d'`: Necessario per la rotazione 3D dei figli. */}
                {/* - `transform`: Applica la rotazione sull'asse Y in base allo stato `isFlipped`. */}
                <div
                    className="relative w-full transition-transform duration-700 ease-in-out"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', aspectRatio: '4/5' }}
                >
                    {/* Fronte della carta: la foto. */}
                    {/* - `backfaceVisibility: 'hidden'`: Nasconde questo lato quando è girato. */}
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <img src="https://i.imgur.com/AOQzuBM.jpeg" alt="Foto ravvicinata di due pinguini" className="w-full h-full object-cover rounded-xl shadow-2xl" />
                         {/* Overlay che appare al passaggio del mouse per suggerire l'interazione. */}
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                            <p className="text-white font-bold text-lg">Clicca per girare</p>
                        </div>
                    </div>

                    {/* Retro della carta: il messaggio. */}
                    {/* - `transform: 'rotateY(180deg)'`: Ruota questo lato di 180 gradi all'inizio. */}
                    <div className="absolute w-full h-full bg-[#fef6e4] p-8 sm:p-12 rounded-xl shadow-2xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="text-center text-gray-700 font-handwriting">
                            <p className="text-2xl sm:text-4xl leading-relaxed">
                                Every moment with you<br/>is my favorite memory.<br/>You are my home.
                            </p>
                            <p className="mt-8 text-3xl text-brand-pink-400">♡</p>
                        </div>
                    </div>
                </div>
                {/* Pulsante di chiusura posizionato sopra e a destra della foto. */}
                 <button onClick={handleClose} className="absolute top-[-35px] right-[-15px] text-white/70 hover:text-white z-10" aria-label="Chiudi foto">
                    <components.CloseIcon className="w-8 h-8" />
                </button>
            </div>
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
    const [volume, setVolume] = useState(0.4);
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
                                            title: title || src.split('/').pop()?.replace('.mp3', '') || 'Titolo Sconosciuto',
                                            artist: artist || 'Artista Sconosciuto',
                                            cover
                                        });
                                    } catch (e) {
                                        console.error(`Errore nell'elaborazione dei tag per ${src}:`, e);
                                        resolve({ src, title: src.split('/').pop()?.replace('.mp3', '') || 'Titolo Sconosciuto', artist: 'Artista Sconosciuto', cover: null });
                                    }
                                },
                                onError: (error: any) => {
                                    console.warn(`jsmediatags non è riuscito a leggere ${src}:`, error);
                                    resolve({ src, title: src.split('/').pop()?.replace('.mp3', '') || 'Titolo Sconosciuto', artist: 'Artista Sconosciuto', cover: null });
                                }
                            });
                        });
                    } catch (fetchError) {
                        console.error(`Impossibile caricare il file audio da ${src}:`, fetchError);
                        return {
                            src,
                            title: src.split('/').pop()?.replace('.mp3', '') || 'Titolo Sconosciuto',
                            artist: 'Artista Sconosciuto',
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
                        <img src={currentTrack.cover} alt="Copertina album" className="w-full h-full object-cover rounded-md" />
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
                    aria-label="Barra di avanzamento"
                />
                 <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                 </div>
            </div>

            <div className="flex justify-center items-center gap-6 text-brand-pink-500">
                <button onClick={playPrev} disabled={playlist.length < 2} className="disabled:opacity-50 transition-transform active:scale-90" aria-label="Canzone precedente"><components.MusicPrevIcon className="w-6 h-6" /></button>
                <button onClick={togglePlayPause} disabled={!currentTrack || isLoading} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 hover:scale-110 transition-transform active:scale-95" aria-label={isPlaying ? "Pausa" : "Riproduci"}>
                    {isPlaying ? <components.MusicPauseIcon className="w-6 h-6" /> : <components.MusicPlayIcon className="w-6 h-6" />}
                </button>
                <button onClick={playNext} disabled={playlist.length < 2} className="disabled:opacity-50 transition-transform active:scale-90" aria-label="Canzone successiva"><components.MusicNextIcon className="w-6 h-6" /></button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
                <button onClick={toggleMute} className="text-brand-pink-400 hover:text-brand-pink-600 transition-colors" aria-label={isMuted ? "Riattiva audio" : "Muto"}>
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
                    aria-label="Cursore volume"
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
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [paintPosition, setPaintPosition] = useState<{ x: number; y: number } | null>(null);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setIsWelcomeModalOpen(true);
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
      
      <main className="relative max-w-5xl lg:max-w-7xl mx-auto p-4 sm:p-8 md:p-12 min-h-screen md:h-screen flex flex-col items-center gap-8 md:gap-0 md:block">
        
        <div className="hidden md:block absolute top-[5%] left-[5%] lg:left-[2%] text-brand-pink-200 opacity-60">
            <components.HeartIcon className="w-10 h-10 sm:w-12 sm:h-12 rotate-[-15deg]"/>
        </div>
        <div className="hidden md:block absolute top-[20%] right-[10%] lg:right-[5%] text-brand-pink-200 opacity-60">
            <components.StarIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
        </div>
        <div className="hidden md:block absolute bottom-[25%] left-[15%] lg:bottom-[10%] lg:left-[10%] text-brand-pink-200 opacity-60">
            <components.SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 rotate-12"/>
        </div>

        <div className="relative w-72 sm:w-80 bg-white p-4 rounded-lg shadow-lg rotate-[-2deg] z-10 md:absolute md:top-[5%] md:left-1/2 md:-translate-x-1/2">
          <h2 className="font-bold text-center text-brand-pink-500">♡ AVVISO ♡</h2>
          <p className="text-sm mt-2"><b>A:</b> la fidanzata più bella</p>
          <p className="text-sm"><b>Da:</b> il tuo amorevole fidanzato</p>
        </div>

        <a href="#section-start" className="relative bg-gray-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 z-10 text-sm outline-none focus:outline-none md:absolute md:top-[20%] md:left-1/2 md:-translate-x-1/2">
          01 — Inizia qui!
        </a>

        <div className="relative md:static">
            <button
                onClick={openPhotoModal}
                className="relative w-[240px] h-[300px] sm:w-[320px] sm:h-[400px] lg:w-[380px] lg:h-[475px] bg-white p-3 rounded-lg shadow-2xl rotate-2 transform hover:scale-105 transition-transform duration-300 z-20 cursor-pointer outline-none focus:outline-none md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                aria-label="Guarda la foto e il messaggio segreto"
            >
                <img src="https://i.imgur.com/AOQzuBM.jpeg" alt="Foto di due pinguini che si guardano in Antartide" className="w-full h-full object-cover rounded-md"/>
                <div className="absolute -top-4 -left-4 text-brand-pink-300 z-30">
                    <components.HeartIcon className="w-8 h-8"/>
                </div>
                <div className="absolute -bottom-3 -right-3 text-brand-pink-300 z-30">
                    <components.HeartIcon className="w-10 h-10 rotate-12"/>
                </div>
            </button>
            <button
              onClick={handlePaintClick}
              className="absolute -top-4 -right-2 w-14 h-14 rotate-[25deg] sm:w-20 sm:h-20 z-30 transform transition-all duration-300 hover:scale-110 hover:rotate-[15deg] group cursor-pointer outline-none focus:outline-none md:absolute md:top-[20%] md:left-[10%] lg:left-[8%] md:w-24 md:h-24 md:rotate-[15deg]"
              aria-label="Disegna un cuore"
              disabled={isPainting}
            >
              <components.PaintBrushIcon className="w-full h-full drop-shadow-lg" />
            </button>
        </div>
        
        <div className="relative w-16 h-16 rotate-[-25deg] z-20 md:absolute md:top-[12%] md:left-[15%] lg:md:left-[24%] xl:md:left-[28%]">
          <components.BinderClipIcon className="text-pink-300 drop-shadow-md"/>
        </div>

        <div className="relative w-44 rotate-[-8deg] sm:w-56 bg-transparent p-2 z-10 md:absolute md:top-[38%] md:left-[5%] lg:md:left-[2%] xl:md:left-[5%]">
          <p className="leading-relaxed font-handwriting text-xl sm:text-2xl">
            <span className="bg-brand-pink-200 px-1">"I will always come looking for you, Angel, and I would burn the whole world down to find you."</span>
          </p>
        </div>
        
         <button onClick={openTicket} className="relative w-36 rotate-[8deg] bg-[#f5eadd] p-3 rounded-lg shadow-md z-10 transform hover:rotate-6 transition-transform outline-none focus:outline-none md:absolute md:top-[65%] md:left-[8%] lg:md:left-[2%] xl:md:left-[5%]">
            <div className="border-2 border-dashed border-[#d3c0a9] p-2 text-center">
                <p className="font-bold text-[#b59f84] text-xs">BIGLIETTO PER</p>
                <p className="text-2xl font-handwriting text-[#b59f84]">La Felicità</p>
            </div>
        </button>
        
        <button onClick={openLetter} className="relative w-28 h-28 rotate-[-10deg] sm:w-32 sm:h-32 transform hover:scale-110 transition-transform z-10 cursor-pointer outline-none focus:outline-none rounded-lg md:absolute md:bottom-[10%] md:left-[8%] lg:md:left-[2%] xl:md:left-[5%]" aria-label="Apri lettera">
            <components.EnvelopeIcon />
        </button>

        <div className="relative w-16 h-16 rotate-12 z-20 md:absolute md:top-[15%] md:right-[15%] lg:md:right-[24%] xl:md:right-[28%]">
            <components.WaxSealIcon className="text-brand-pink-400 drop-shadow-lg" />
        </div>

        <div className="relative w-44 rotate-6 sm:w-56 bg-[#fef6e4] p-4 rounded-lg shadow-lg transform transition-transform hover:rotate-3 z-10 md:absolute md:top-[32%] md:right-[5%] lg:md:right-[2%] xl:md:right-[5%]">
            <p className="font-handwriting text-xl sm:text-2xl leading-tight text-gray-600">
                Le luci ti guideranno a casa, scalderanno le tue ossa, e io cercherò di aggiustarti.
            </p>
             <div className="flex justify-end mt-2 text-brand-pink-300">
                <components.StarIcon className="w-4 h-4"/>
                <components.StarIcon className="w-3 h-3 ml-1"/>
                <components.StarIcon className="w-4 h-4 ml-1"/>
             </div>
        </div>

        <a href="#section-love" className="relative bg-gray-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 z-10 text-sm outline-none focus:outline-none md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2">
          02 — Cose che amo di te ♡
        </a>
        
        <div className="hidden md:block absolute bottom-[-2%] right-[-10%] sm:right-0 md:right-[-5%] lg:right-[-2%] w-32 h-auto sm:w-40 opacity-70 z-0">
          <components.VinylIcon className="text-brand-pink-300" />
        </div>

        <div className="relative w-[90%] max-w-xs rotate-0 sm:w-80 sm:rotate-[-2deg] z-20 transform transition-transform hover:rotate-[-1deg] md:absolute md:left-auto md:right-5 md:bottom-[4%] lg:md:right-[2%] xl:md:right-[5%]">
            <h2 className="font-handwriting text-xl text-center text-gray-600 mb-2">
                <span className="bg-brand-pink-200 px-2 py-0.5">Songs that remind me of you</span>
            </h2>
            <MusicPlayer />
        </div>
      </main>

      <div className="space-y-24 px-4 sm:px-8 pb-24">
        <section id="section-start" className="max-w-3xl lg:max-w-4xl mx-auto pt-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-handwriting text-brand-pink-500 mb-4">La Nostra Storia Inizia...</h2>
            <p className="text-base sm:text-lg leading-relaxed">
                Questo è un piccolo angolo di internet che ho creato solo per te. Un posto dove conservare i nostri ricordi, i nostri sogni e tutte le piccole cose che ci rendono 'noi'. Ogni pezzo qui è un ricordo di un momento, una sensazione, una canzone che mi ricorda te. Clicca in giro ed esplora il nostro mondo.
            </p>
        </section>

        <section id="section-love" className="max-w-3xl lg:max-w-4xl mx-auto pt-20">
            <h2 className="text-3xl sm:text-4xl font-handwriting text-brand-pink-500 mb-6 text-center">Cose Che Amo Di Te...</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg">
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> La tua risata quando pensi che qualcosa sia davvero divertente.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> Il modo in cui ti entusiasmi per le piccole cose.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> Come sai sempre come farmi sentire meglio.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> La tua gentilezza con tutti quelli che incontri.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> Il fatto che tu sia la persona più intelligente che conosco.
                </li>
                <li className="bg-white/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <span className="text-brand-pink-400">♡</span> ...e la lista continua all'infinito.
                </li>
            </ul>
        </section>
      </div>
      
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />
      <LetterModal isOpen={isLetterOpen} onClose={closeLetter} />
      <TicketModal isOpen={isTicketOpen} onClose={closeTicket} />
      <PhotoModal isOpen={isPhotoModalOpen} onClose={closePhotoModal} />
    </div>
  );
};

export default App;