import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailsComponent } from './components/pages/devices/device-details/device-details.component';
import { DeviceScreenComponent } from './components/pages/devices/device-screen/device-screen.component';
import { LoginComponent } from './components/pages/login/login.component';
import { GraphPanelComponent } from './components/pages/power-and-utilization/graph-panel/graph-panel.component';
import { UserScreenComponent } from './components/pages/users/user-screen/user-screen.component';
import { AuthGuardLoginService } from './components/services/auth-guard-login.service';
import { AuthGuardService } from './components/services/auth-guard.service';

const routes: Routes = [
  {path: '', component: GraphPanelComponent, canActivate: [AuthGuardService]},
  {path: 'users', component: UserScreenComponent, canActivate: [AuthGuardService]},
  {path: 'devices', component: DeviceScreenComponent, canActivate: [AuthGuardService]},
  {path: 'devices/details/:id', component: DeviceDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardLoginService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
