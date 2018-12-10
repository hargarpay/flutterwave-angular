import { EventEmitter } from '@angular/core';

export class DataCenterService {
    dataRaveEvent = new EventEmitter<{}>();

    constructor() { }
}
