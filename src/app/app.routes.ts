import { Routes } from '@angular/router';
import { GridComponent } from './layout/grid/grid.component';
import { AllergeniComponent } from './layout/allergeni/allergeni.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        redirectTo:"/menu/allergeni"
    },
    {
        path:"menu",
        component:LayoutComponent,
        outlet:"primary",
        children:[
            {
                path:"allergeni",
                component:AllergeniComponent,
            },
            {
                path:":id",
                component: GridComponent
            }
        ]
    },
];
