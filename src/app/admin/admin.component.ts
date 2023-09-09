import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IActionResponse, IActionRequest } from '../shared/interfaces/action/action.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
