import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IActionResponse, IActionRequest } from '../shared/interfaces/action/action.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  logOut(): void{
   this.router.navigate(['/']);
   localStorage.removeItem('currentUser');
   this.accountService.isUserLogin$.next(true);
  }
}
