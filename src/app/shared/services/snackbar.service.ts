import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService implements OnInit {

  constructor(private _snackbar: MatSnackBar) { }
  
  
  ngOnInit(): void {
    
  } 

openSnackbar(msg: string){
  this._snackbar.open(msg,'close',{
    horizontalPosition:'center',
    verticalPosition: 'top',
    duration:3000
  })
}


}
