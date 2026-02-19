import { NgModule } from '@angular/core';
import{MatButtonModule } from '@angular/material/button'
import{MatIconModule } from '@angular/material/icon'
import{MatCardModule } from '@angular/material/card'
import{MatDividerModule } from '@angular/material/divider'
import{MatSnackBarModule } from '@angular/material/snack-bar'
import{MatDialogModule } from '@angular/material/dialog'
import{ MatProgressSpinnerModule} from '@angular/material/progress-spinner'

const matArr= [MatButtonModule,MatIconModule,MatCardModule,MatDividerModule,MatSnackBarModule,MatProgressSpinnerModule,MatDialogModule]

@NgModule({
  declarations: [],
  imports: [...matArr],
  exports: [...matArr]
})
export class MaterialModule { }
