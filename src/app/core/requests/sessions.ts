import { Game } from '../enums';
import { OoTSpoilerLog } from '../models/spoiler-log';
import { View } from '../enums';
import { RandomizerSession } from '../models/session-models';

export class CreateSessionRequest {
    constructor(public ID: string,
        public Password: string,
        public Seed: string,
        public Game: Game,
        public SpoilerLog: OoTSpoilerLog) { }
}

export class DeleteSessionRequest {
    constructor(public Session: RandomizerSession) { }
}

export class JoinSessionRequest {
    constructor(public ID: string, public Password: string = "", public SessionView: View = View.Spectator) { }
}

export class UpdateSessionRequest {
    constructor(public Session: RandomizerSession) { }
}