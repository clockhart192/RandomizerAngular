import { Game,View } from '../enums'
import { OoTSpoilerLog } from './spoiler-log';

export interface OoTRandomizerSession 
{
    ID: number;
    SessionID: string;
    Password: string;
    Game: Game;
    View: View;
    SpoilerLog: OoTSpoilerLog;
}

export interface RandomizerSession
    {
        ID: number;
        SessionID: string;
        Password: string;

        Game: Game;
        SpoilerLog: string;
    }