import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';
import { OoTSpoilerLog } from '../core/models/spoiler-log';    
import { SaveSessionResponse } from '../core/responses/save-session-response';
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeSave = new EventEmitter();  
  invokeLoad = new EventEmitter();   
  subsVar: Subscription;    
    
  constructor() { }    
    
  onInvokeSave() {    
    this.invokeSave.emit();    
  }
  
  onUpdateReceived(data:SaveSessionResponse){
      this.invokeLoad.emit(data);
  }
}