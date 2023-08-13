import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log('submitting form: ', this.form.value);

    const baseUrl = window.location.origin;
    this.http.post(`${baseUrl}/.netlify/functions/signup`, this.form.value).subscribe({
      next: (res: any) => {

        alert(res.message);

      },
      error: (err: any) => {

        alert('ERROR: ' + err.message);

      },
      complete: () => {}
    });
  }

}
