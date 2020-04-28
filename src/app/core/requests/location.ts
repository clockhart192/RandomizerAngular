import { Location } from '../models/spoiler-log';

export class SaveLocationRequest {
    constructor(public Location: Location){}
}

export class DeleteLocationRequest {
    constructor(public Location: Location){}
}

export class CreateLocationRequest {
    constructor(public Location: Location){}
}