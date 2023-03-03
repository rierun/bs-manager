import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { ConfigurationService } from "./configuration.service";

export class AudioPlayerService{

    private static instance: AudioPlayerService;

    public static getInstance(): AudioPlayerService{
        if(!AudioPlayerService.instance){ AudioPlayerService.instance = new AudioPlayerService(); }
        return AudioPlayerService.instance;
    }

    private readonly config: ConfigurationService;

    private readonly player: HTMLAudioElement;

    private readonly _src$: BehaviorSubject<string> = new BehaviorSubject("");
    private readonly _playing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private readonly _bpm$: BehaviorSubject<number> = new BehaviorSubject(0);
    private readonly _volume$: BehaviorSubject<number> = new BehaviorSubject(0);

    private constructor(){

        this.config = ConfigurationService.getInstance();

        this.player = new Audio();

        this.player.onplay = () => this._playing$.next(true);
        this.player.onpause = () => this._playing$.next(false);
        this.player.onended = () => this._playing$.next(false);

        this.player.onvolumechange = () => {
            this._volume$.next(this.player.volume);
            this.config.set("audio-level", this.player.volume, true);
        }

        this.player.volume = this.config.get("audio-level") ?? 0.5;
    }

    public play(src: string, bpm = 0): Promise<void>{
        this.pause();
        this.player.src = src;
        this._src$.next(src);
        this._bpm$.next(bpm)
        return this.player.play()
    }

    public pause(): void{
        this._playing$.next(false);
        this.player.pause();
    }

    public resume(): Promise<void>{
        return this.player.play();
    }

    public setVolume(volume: number): void{
        this.player.volume = volume;
    }

    public get src$(): Observable<string>{
        return this._src$.asObservable();
    }
    public get playing$(): Observable<boolean>{
        return this._playing$.asObservable();
    }
    public get bpm$(): Observable<number>{
        return this._bpm$.asObservable();
    }
    public get volume$(): Observable<number>{
        return this._volume$.asObservable();
    }

    public get src(): string{ return this._src$.value; }
    public get playing(): boolean{ return this._playing$.value; }
    public get bpm(): number{ return this._bpm$.value; }
    public get volume(): number{ return this._volume$.value; }

}