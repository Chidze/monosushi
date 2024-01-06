import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { ActionsInfoComponent } from './actions-info/actions-info.component';


const routes: Routes = [

  { path: '', component: ActionsComponent },
  { path: ':id', component: ActionsInfoComponent }


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
