import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { account } from '../../../types';
import { PendingService } from '../../services/pending.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-accessi',
  standalone: true,
  imports: [],
  templateUrl: './accessi.component.html',
  styleUrl: './accessi.component.css'
})
export class AccessiComponent {
  constructor(
    private authService: AuthService,
    private pendingService: PendingService,
    private usersService: UsersService
  ){}
  pendings: account[] = []
  users: account[] = []
  ngOnInit(){
     this.pendingService.getPending().subscribe(res =>{
      this.pendings = res.users
    })
    this.usersService.getUsers().subscribe(res =>{
      this.users = res.users
    })
  }

  approve(account:account){
    this.pendingService.approve(account).subscribe(res=>{
      console.log('fatto' + res)
    })
  }
  reject(account: account){
    this.pendingService.reject(account).subscribe(res =>{
      console.log('cancellato' + res)
    })
  }

  removeAccount(account: account){
    this.usersService.removeAccount(account).subscribe(res =>{
      console.log('cancellato' + res)
    })
  }
}
