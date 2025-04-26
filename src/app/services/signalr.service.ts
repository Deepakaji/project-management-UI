import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() {}

  // Start connection
  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7218/projectHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch(err => console.error('Error starting SignalR:', err));
  }

  // Listen for "ProjectSaved" event
  public onProjectSaved(callback: (project: any) => void): void {
    this.hubConnection.on('ProjectSaved', (project) => {
      callback(project);
    });
  }

  public onProjectUpdated(callback: (project: any) => void): void {
    this.hubConnection.on('ProjectUpdated', (project) => {
      callback(project);
    });
}

public onProjectDeleted(callback: (project: any) => void): void {
    this.hubConnection.on('ProjectDeleted', (project) => {
      callback(project);
    });
}

}
