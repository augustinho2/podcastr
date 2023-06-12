
import { useContext, useEffect, useRef } from 'react';
import styles from './styles.module.scss'
import { PlayerContext } from '@/src/contexts/PlayerContext';
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        setPlayingState 
    } = useContext(PlayerContext)

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex]

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            
            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={292}
                        height={292}
                        src={episode.thumbnail}
                        alt='thumb do ep'
                        style={{objectFit: "cover"}}
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members }</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podas</strong>
                </div>
            ) }

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider}/>
                        ) }
                    </div>
                    
                    <span>00:00</span>
                </div>

                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                ) }

                <div className={styles.buttons}>
                    <button type='button' disabled={!episode}>
                        <img src="/shuffle.svg" alt="shufflas" />
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-previous.svg" alt="tocar anterior" />
                    </button>
                    <button type='button' 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        { isPlaying 
                            ?  <img src="/pause.svg" alt="pausar" />
                            : <img src="/play.svg" alt="play" />
                        }
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-next.svg" alt="play next" />
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/repeat.svg" alt="repeat" />
                    </button>
                </div>
            </footer>
        </div>
    );
}