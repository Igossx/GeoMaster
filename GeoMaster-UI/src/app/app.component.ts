import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'GeoMaster.UI';
  isSidebarExpanded = false;

  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    const hamBurger = document.querySelector(".toggle-btn");
    if (hamBurger) {
      hamBurger.addEventListener("click", () => {
        if (this.sidebar.nativeElement) {
          if (this.isSidebarExpanded) {
            this.renderer.removeClass(this.sidebar.nativeElement, 'expand');
          } else {
            this.renderer.addClass(this.sidebar.nativeElement, 'expand');
          }
          this.isSidebarExpanded = !this.isSidebarExpanded;
        }
      });
    }
  }

  toggleDropdown(event: Event, dropdownId: string) {
    event.preventDefault();
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle("show");
      dropdown.classList.toggle("collapse");
    }
  }
}
