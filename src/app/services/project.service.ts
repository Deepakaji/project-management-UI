import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../dto/projectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl = 'https://localhost:7218/api/Project';

  constructor(private http: HttpClient) {}

  // Get all active projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  // Save a new project
  saveProject(project: Project): Observable<any> {
    return this.http.post(this.baseUrl, project);
  }

  // Get a project by its ID
  getProjectById(projectId: number): Observable<{ success: boolean, data: Project }> {
    return this.http.get<{ success: boolean, data: Project }>(this.baseUrl + '/' + projectId);
  }
  // Update an existing project
  updateProject(projectId:number,project: Project): Observable<any> {
    return this.http.put(this.baseUrl + '/' + projectId, project);
  }

  // Delete an existing project
  deleteProject(projectId:number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + projectId);
  }
}
