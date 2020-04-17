import { OoTSpoilerLog } from '../models/spoiler-log';
import { View } from '../enums';

export class SaveSpoilerLogRequest {
    constructor(public ID: string, public SpoilerLog: OoTSpoilerLog, public SessionView: View = View.Spectator) { }
}