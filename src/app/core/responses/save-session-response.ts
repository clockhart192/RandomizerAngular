import { OoTSpoilerLog } from '../models/spoiler-log';

export class SaveSessionResponse {
    constructor(
        public ID: string,
        public SpoilerLog: OoTSpoilerLog){}
}