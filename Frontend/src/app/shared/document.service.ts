import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/Document';
import { apiEndPoint } from '../apiEndPoint';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}document`);
  }

  createDocument(documentData: Document): Observable<Document> {
    return this.http.post<Document>(`${this.baseUrl}document`, documentData);
  }

  getDocumentById(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.baseUrl}document/${id}`);
  }

  updateDocument(id: string, documentData: Document): Observable<Document> {
    return this.http.put<Document>(`${this.baseUrl}document/${id}`, documentData);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}document/${id}`);
  }
}
