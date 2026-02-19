import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() postObj!:IPost
  constructor(private _postServ: PostService,
    private _matDailog:MatDialog
  ) { }

  ngOnInit(): void {
  }



  onEdit(postObj:IPost){
  this._postServ.setEditPost(postObj)
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.data= `Are you sure , you want to remove Post With id ${this.postObj.postId}`,
    matConfig.width= '400px',
    matConfig.disableClose= true,
    matConfig.autoFocus=true

    this._matDailog.open(GetConfirmComponent,matConfig).afterClosed().pipe(
      filter(res=> res===true),
      switchMap(()=>{
        return this._postServ.removePost(this.postObj.postId)
      })
    ).subscribe({
      next: res=>{
        this._postServ.setRemovePost(this.postObj.postId)
      }
    })
  }
}
