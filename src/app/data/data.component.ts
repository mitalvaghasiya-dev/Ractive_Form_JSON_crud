import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UseService } from './use.service';

@Component({
  selector: 'app-data',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent  implements OnInit {
  userForm!: FormGroup;
  countries: string[] = ['India', 'USA', 'Canada'];
  users: any[] = [];
  editMode = false;
  currentUserId: number | null = null;


  private fb =  inject(FormBuilder);
  private userService = inject (UseService)

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
    });

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.editMode && this.currentUserId !== null) {
      this.userService.updateUser(this.currentUserId, this.userForm.value).subscribe(() => {
        this.resetForm();
        this.getUsers();
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.resetForm();
        this.getUsers();
      });
    }
  }

  editUser(user: any) {
    this.userForm.patchValue(user);
    this.currentUserId = user.id;
    this.editMode = true;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.editMode = false;
    this.currentUserId = null;
  }
}