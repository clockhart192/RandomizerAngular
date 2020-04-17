import { View } from '../enums';

export class JoinSessionRequest {
    constructor(public ID: string, public Password: string = "", public SessionView: View = View.Spectator) { }
}