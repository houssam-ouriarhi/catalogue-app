import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public errorMassage: any;
  public userFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public sub$: Subscription | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {}

  handeleLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.sub$ = this.authenticationService.login(username, password).subscribe(
      (appUser) => {
        this.authenticationService
          .authenticateUser(appUser)
          .subscribe((data) => {
            this.router.navigateByUrl('/admin');
          });
      },
      (err) => {
        this.errorMassage = err;
      }
    );
  }

  ngOnDistroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
