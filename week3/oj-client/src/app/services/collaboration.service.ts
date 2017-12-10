import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId});
    this.collaborationSocket.on('change', (delta: string) => {
      delta = JSON.parse(delta);
      editor.lastAppliedChenge = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }

  //delta is the changing part of the code
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit('restoreBuffer');
  }
}
