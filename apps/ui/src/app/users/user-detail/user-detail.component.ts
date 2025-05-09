import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { UpdateUser, User } from '../../models/user.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  companies: Company[] = [];
  selectedCompanyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.selectedCompanyId = this.user.company?.id || null;
        },
        error: (err) => {
          alert('Failed to fetch companies. Please try again.');
        },
      });
    }
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => {
        alert('Failed to fetch companies. Please try again.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  updateUser(): void {
    if (!this.user) return;

    const companyId =
      this.companies.find((c) => c.id === this.selectedCompanyId)?.id ?? null;

    const userUpdateObject: UpdateUser = {
      name: this.user.name,
      position: this.user.position,
      email: this.user.email,
      address: this.user.address,
      companyId,
    };

    const x = this.userService
      .updateUser(this.user.id, userUpdateObject)
      .subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          alert('User updated successfully!');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          alert('Failed to update user. Please try again.');
        },
      });
  }
}
