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
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  dataList: any[] = [];

  formData = {
  
    city: '',
    region: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.getUserData();
  }

  // getUserData(): void {
  //   this.http.get('https://ipinfo.io/json?token=your_token_here').subscribe((res: any) => {
  //     this.dataList =res;

  //     console.log(res,'dat item show')
  //     this.dataList.push({
  //       city: res.city,
  //       region: res.region
  //     });
  //   });
  // }

  // onSubmit(): void {
  //   if (this.formData.city && this.formData.region) {
  //     this.dataList.push({ ...this.formData });
  //     console.log(this.formData)
  //     this.formData = {city: '', region: '' };
  //   }
  // }
}
