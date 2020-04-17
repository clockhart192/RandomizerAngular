import { Game } from '../enums';
import { OoTSpoilerLog } from '../models/spoiler-log';

export class CreateSessionRequest {
    constructor(public ID: string,
        public Password: string,
        public Seed: string,
        public Game: Game,
        public SpoilerLog: OoTSpoilerLog){}
}