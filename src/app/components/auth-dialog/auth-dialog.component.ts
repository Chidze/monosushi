import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef } from '@angular/material/dialog';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword?: string;
}


@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent  implements OnInit {
  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public loginSubcription!: Subscription;
  public isLogin = false;
  public checkPassword = false;
  private registerData!: IRegister;
  public match = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) { }


  ngOnInit(): void {
    this.initAuthForm();
    this.initRegistForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  initRegistForm(): void {
    this.registerForm = this.fb.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        phone: [ null, [Validators.required]],
        email: [ null, [Validators.required]],
        password1: [null, [Validators.required]],
        password2: [null, [Validators.required]],
      }
    );
  }


  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.dialogRef.close();
      })
      .catch((e) => {
        this.toastr.error('Помилка логінування!', e.message);
      });
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(
      (user) => {

       if(user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.toastr.info('Вітаю у вашому кабінеті');
      }

        this.accountService.isUserLogin$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }

  registerUser(): void {
    const { firstName, lastName, phone, email, password1, password2 } =
      this.registerForm.value;
    this.registerData = this.registerForm.value;
    this.emailSignUp(firstName, lastName, phone, email, password1, password2)
      .then(() => {
        this.toastr.info('Вітаю ви зареєстровані!');
        this.isLogin = !this.isLogin;
        this.dialogRef.close();
        this.registerForm.reset();
      })
      .catch((e) => {
        this.toastr.error('Помилка реєстрації!', e.message);
        this.registerForm.reset();
      });
  }
  async emailSignUp( firstName: string, lastName: string, phone: string, email: string, password1: string, password2: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password1);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: phone,
      address: '',
      orders: [],
      role: 'USER',
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value) {
      this.registerForm.controls['password2'].setErrors({
        matchError: 'Паролі не співпадають'
      })
      this.match = true;
    }
    else{
      this.match = false;
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password1'];
  }

  get confirmed(): AbstractControl {
    return this.registerForm.controls['password2'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name]
  }
}


