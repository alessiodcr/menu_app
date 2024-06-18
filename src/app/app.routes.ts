import { Routes } from '@angular/router';
import { GridComponent } from './layout/grid/grid.component';
import { AllergeniComponent } from './layout/allergeni/allergeni.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './config/menu/main/main.component';
import { ConfigGridComponent } from './config/menu/config-grid/config-grid.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { ConfigComponent } from './config/config.component';
import { OptionsComponent } from './config/options/options.component';

export const routes: Routes = [
    {
        path:"",
        pathMatch:'full',
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
    {
        path:"config",
        component:ConfigComponent,
        canActivate: [authGuard],
        children:[
            {
                path: 'menu',
                component: MainComponent,
                children: [
                    {
                        path: 'allergeni',
                        component: AllergeniComponent
                    },
                    {
                        path: ':id',
                        component: ConfigGridComponent
                    }
                ]
            },
            {
                path: 'options',
                component: OptionsComponent
            }
        ]
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '/menu/allergeni'
    }
];
