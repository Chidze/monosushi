import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
];

//other modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule ({
    declarations: [],
    imports: [
        ...MATERIAL,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,

    ],
    exports: [
        ...MATERIAL, ReactiveFormsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

    ]
})

export class SharedModule {}
