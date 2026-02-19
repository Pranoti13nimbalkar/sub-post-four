import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm ! : FormGroup
isInEditPost: boolean = false;
editId!:string
  constructor(private _postServ: PostService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  this.createForm()
  this.patchData()
  }

createForm(){
  this.postForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    Body: new FormControl(null, [Validators.required]),
    userId: new FormControl(null, [Validators.required]),
  })
}

patchData() {
  this._postServ.editPostObs$.subscribe(data=>{
    console.log(data);
 this.isInEditPost= true;
  this.editId = data.postId;
  this.postForm.patchValue(data)
  this._snackbar.openSnackbar(`The post with id ${this.editId} patch successfuly!!`)

  })
 
}

onUpdate(){
  if(this.postForm.valid){
  let updated_obj= ({...this.postForm.value,postId: this.editId})
  this._postServ.updatePost(updated_obj).subscribe({
    next: data=>{
      this._postServ.setUpdatePost(data)
      this.postForm.reset()
      this.isInEditPost= false
    },
    error: err=>{
      console.log(err);
      this.postForm.reset()
      this.isInEditPost=false
      
    }
  })
  }
}

onSubmit(){
  if(this.postForm.valid){
    let postObj = this.postForm.value;
     this._postServ.createPost(postObj).subscribe({
       next:res=>{
        this._postServ.setNewPost({...postObj, postId:res.name})
        this.postForm.reset()
       }
     })
  }
}

}
