
import { OoTSpoilerLog } from './spoiler-log';

export interface RandomizerSession
{
    SessionID: string;
    Password: string;
}

export interface OoTRandomizerSession extends RandomizerSession
{
    SpoilerLog: OoTSpoilerLog;
}