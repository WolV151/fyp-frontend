import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceScreenComponent } from './components/pages/devices/device-screen/device-screen.component';
import { GraphPanelComponent } from './components/pages/power-and-utilization/graph-panel/graph-panel.component';
import { UserScreenComponent } from './components/pages/users/user-screen/user-screen.component';

const routes: Routes = [
  {path: '', component: GraphPanelComponent},
  {path: 'users', component: UserScreenComponent},
  {path: 'devices', component: DeviceScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
