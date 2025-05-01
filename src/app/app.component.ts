import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataComponent } from './data/data.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,DataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  form!: FormGroup;
dynamicFormConfig :any[]= [
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter full name',
    required: true
  },
  {
    key: 'age',
    type: 'number',
    label: 'Age',
    placeholder: 'Enter age',
    required: true
  },
  {
    key: 'dob',
    type: 'date',
    label: 'Date of Birth',
    placeholder: 'Select date of birth',
    required: true
  },
  {
    key: 'gender',
    type: 'select',
    label: 'Gender',
    placeholder: 'Select gender',
    required: true,
    options: ['Male', 'Female', 'Other']
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    required: true
  },
  {
    key: 'cityList',
    type: 'multiselect',
    label: 'Cities',
    placeholder: 'Select cities',
    required: true,
    options: ['New York', 'Los Angeles', 'Chicago']
  }
];



  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.dynamicFormConfig.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'multiselect') {
        this.form.addControl(field.key, this.fb.control([], validators));
      } else {
        this.form.addControl(field.key, this.fb.control('', validators));
      }
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
