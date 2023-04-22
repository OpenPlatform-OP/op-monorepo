import { Observable } from 'rxjs';

export interface IGenericRepository<T> {
  getAll(): Observable<T[]>;

  getById(id: string): Observable<T>;

  getOne(condition: { [key in keyof T]?: T[keyof T] }): Observable<T>;

  get(condition: { [key in keyof T]?: T[keyof T] }): Observable<T[]>;

  create(item: T): Observable<T>;

  update(id: string, item: T): Observable<unknown>;

  delete(id: string): Observable<unknown>;
}
