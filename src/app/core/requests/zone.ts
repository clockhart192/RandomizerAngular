import { Zone } from '../models/spoiler-log';

export class SaveZoneRequest {
    constructor(public Zone: Zone) { }
}

export class DeleteZoneRequest {
    constructor(public Zone: Zone) { }
}

export class CreateZoneRequest {
    constructor(public Zone: Zone) { }
}