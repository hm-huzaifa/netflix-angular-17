import {Component, Input, input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input({required: true}) user_profileImg: string = ''
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse by Language"]
}
