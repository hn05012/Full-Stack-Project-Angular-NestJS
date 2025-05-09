import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { User } from '../../models/user.model';
import { Company } from '../../models/company.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatListModule, FormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  companies: Company[] = [];
  newCompanyName = '';
  newUserName = '';
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCompanies();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        alert('Failed to fetch users. Please try again.');
      },
    });
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => {
        alert('Failed to fetch companies. Please try again.');
      },
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/users', id]);
  }

  createCompany(): void {
    if (this.newCompanyName) {
      this.companyService
        .createCompany({ name: this.newCompanyName })
        .subscribe({
          next: (newCompany) => {
            this.companies.push(newCompany);
            this.newCompanyName = '';
            alert('Company created successfully!');
          },
          error: (err) => {
            alert('Failed to create company. Please try again.');
          },
        });
    }
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { companies: this.companies },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: (newUser) => {
            this.users.push(newUser);
            alert('User created successfully!');
          },
          error: (err) => {
            alert('Failed to create user. Please try again.');
          },
        });
      }
    });
  }
}
