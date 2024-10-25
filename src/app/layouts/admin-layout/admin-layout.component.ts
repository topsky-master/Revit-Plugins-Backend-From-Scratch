// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import
import { SidebarModule } from 'src/app/shared/sidebar/sidebar.module';
import { FixedPluginModule } from 'src/app/shared/fixedplugin/fixedplugin.module';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, FixedPluginModule, NavbarModule, FooterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent {
  
}
