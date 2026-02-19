import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost, IPostRes } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
BASE_URL: string = environment.BASE_URL;
POST_URL:string= `${this.BASE_URL}/post-four.json`
  constructor(private _http: HttpClient) { }

newPostSub$:Subject<IPost>= new Subject<IPost>();
editPostSub$ : Subject<IPost> = new Subject<IPost>();
updatePostSub$ : Subject<IPost> = new Subject<IPost>();
removePostSub$ : Subject<string> = new Subject<string>();


newPostObs$: Observable<IPost> = this.newPostSub$.asObservable()
editPostObs$: Observable<IPost> = this.editPostSub$.asObservable()
updatePostObs$: Observable<IPost> = this.updatePostSub$.asObservable()
removePostObs$: Observable<string> = this.removePostSub$.asObservable()

setNewPost(post:IPost){
  this.newPostSub$.next(post)
}



setEditPost(editpost:IPost){
  this.editPostSub$.next(editpost)
}


setUpdatePost(upost:IPost){
  this.updatePostSub$.next(upost)
}


setRemovePost(removeId:string){
  this.removePostSub$.next(removeId)
}
  fetchAllPost(): Observable<IPost[]>{
   return  this._http.get<any>(this.POST_URL).pipe(
    map(obj=>{
        let postArr : IPost[]=[]
        for (const key in obj) { 
            postArr.unshift({...obj[key], postId: key})
        }
        return postArr
    })
   )
  }

createPost(post:IPost): Observable<IPostRes>{
   return this._http.post<any>(this.POST_URL,post)
}

updatePost(post:IPost):Observable<IPost>{
 return  this._http.patch<IPost>(`${this.BASE_URL}/post-four/${post.postId}.json`,post)
}
  

removePost(id:string): Observable<string>{
  return this._http.delete<string>(`${this.BASE_URL}/post-four/${id}.json`)
}
}
