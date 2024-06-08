import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'GeoMaster.UI';

  ngAfterViewInit() {
    const hamBurger = document.querySelector(".toggle-btn");
    if (hamBurger) {
      hamBurger.addEventListener("click", () => {
        const sidebar = document.querySelector("#sidebar");
        if (sidebar) {
          sidebar.classList.toggle("expand");
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
