import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-phone-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    SharedModule
  ],
  templateUrl: './phone-dialog.component.html',
  styleUrl: './phone-dialog.component.scss'
})
export class PhoneDialogComponent {
  public phoneForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PhoneDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initPhoneForm();
  }

  initPhoneForm(): void {
    this.phoneForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

}
