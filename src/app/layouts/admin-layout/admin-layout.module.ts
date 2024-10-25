import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { SidebarModule } from 'src/app/shared/sidebar/sidebar.module';
import { FixedPluginModule } from 'src/app/shared/fixedplugin/fixedplugin.module';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    SidebarModule,
    FixedPluginModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [
    DashboardComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
