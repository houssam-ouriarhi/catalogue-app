import { AuthenticationService } from './../../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  public username!: string;
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.username = this.authenticationService.authenticatedUser!.username;
  }
  logout() {
    this.authenticationService.logout();
  }
  ngOnDistroy() {}
}
