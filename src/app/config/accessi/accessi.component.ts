import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { account } from '../../../types';
import { PendingService } from '../../services/pending.service';
import { UsersService } from '../../services/users.service';
import { SuspensionService } from '../../services/suspension.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-accessi',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './accessi.component.html',
  styleUrl: './accessi.component.css'
})
export class AccessiComponent {
  constructor(
    private pendingService: PendingService,
    private usersService: UsersService,
    private suspensionService: SuspensionService,
    private switchService: SwitchService
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





  toggleSuspension(account: account){
    if(account.status == 'on'){
      this.suspensionService.suspend(account).subscribe(res=>{
        console.log(res)
      })
    }else if(account.status == 'suspended'){
      this.suspensionService.riabilita(account).subscribe(res=>{
        
      })
    }
  }

  switch(){
    this.switchService.switch()
  }



}
