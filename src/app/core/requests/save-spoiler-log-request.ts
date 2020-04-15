import { OoTSpoilerLog } from '../models/spoiler-log';

export class SaveSpoilerLogRequest {
    constructor(public ID: string, public SpoilerLog: OoTSpoilerLog) { }
}