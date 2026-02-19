import { Component, OnInit } from '@angular/core';
import { IPost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  postArr: IPost[]=[]
  constructor(private _postServ: PostService,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.createPost()
    this.updatedPost()
    this.removePost()
  }

  getPost(){
   this._postServ.fetchAllPost().subscribe(res=>{
    this.postArr = res
    console.log(res);
    
   })
  }

  createPost(){
    this._postServ.newPostObs$.subscribe(res=>{
      this.postArr.unshift(res)
       this._snackbar.openSnackbar(`The Post with Id ${res.postId} created successsfuly`)
    })
  }

  updatedPost(){
    this._postServ.updatePostObs$.subscribe(updatedObj=>{
      let getIndex = this.postArr.findIndex(post=>post.postId === updatedObj.postId)
      this.postArr[getIndex] =updatedObj
    this._snackbar.openSnackbar(`The Post with Id ${updatedObj.postId} updated successsfuly`)

    })
  }

  removePost(){
    this._postServ.removePostObs$.subscribe(removeId=>{
      let getIndex = this.postArr.findIndex(post=>post.postId= removeId)
      this.postArr.splice(getIndex,1)
     this._snackbar.openSnackbar(`The Post with Id ${removeId} removed successsfuly`)

    })
  }
}
