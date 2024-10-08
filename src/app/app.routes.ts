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
import { SignInComponent } from './sign-in/sign-in.component';
import { AccessiComponent } from './config/accessi/accessi.component';
import { superGuard } from './services/super.guard';
import { HomeComponent } from './home/home.component';
import { NavigateComponent } from './navigate/navigate.component';
import { PortateComponent } from './config/portate/portate.component';
import { menuGuard } from './services/menu.guard';
import { MenuNonDisponibileComponent } from './menu-non-disponibile/menu-non-disponibile.component';

export const routes: Routes = [
    {
        canActivate: [menuGuard],
        path:"home",
        component: HomeComponent,
        outlet: "primary"
    },
    {canActivate: [menuGuard],
        path: 'navigate',
        component: NavigateComponent,
        outlet: 'primary'
    },
    {
        canActivate: [menuGuard],
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
                        path: ':id',
                        component: ConfigGridComponent
                    }
                ]
            },
            {
                path: 'options',
                component: OptionsComponent
            },
            {
                path: 'accessi',
                canActivate: [superGuard],
                component: AccessiComponent
            },
            {
                path:'portate',
                component: PortateComponent
            }
        ]
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'menu-non-disponibile',
        component: MenuNonDisponibileComponent
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
