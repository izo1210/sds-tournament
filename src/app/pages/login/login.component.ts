import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({
    'email': new FormControl(environment.defaultEmail, [Validators.required, Validators.email]),
    'password': new FormControl(environment.defaultPassword, Validators.required)
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value);
  }
}
