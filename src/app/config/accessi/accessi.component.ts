import { Component } from '@angular/core';
import { account, accounts } from '../../../types';
import { PendingService } from '../../services/pending.service';
import { UsersService } from '../../services/users.service';
import { SuspensionService } from '../../services/suspension.service';
import {  ReactiveFormsModule } from '@angular/forms';
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
  isOn = true
  ngOnInit(){
    this.switchService.getStatus().subscribe(res=>{
      this.isOn = res
    })
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
      this.ngOnInit()
      this.displayAcceptPending.setFalse()
    })
  }
  reject(account: account){
    this.pendingService.reject(account).subscribe(res =>{
      console.log('cancellato' + res)
      this.ngOnInit()
      this.displayRejectPending.setFalse()
    })
  }

  removeAccount(account: account){
      this.usersService.removeAccount(account).subscribe(res =>{
        console.log('cancellato' + res)
        this.ngOnInit()
        this.displayRemoveAccount.setFalse()
      })    
  }





  toggleSuspension(account: account){
    if(account.status == 'on'){
      this.suspensionService.suspend(account).subscribe(res=>{
        console.log(res)
        this.ngOnInit
      })
    }else if(account.status == 'suspended'){
      this.suspensionService.riabilita(account).subscribe(res=>{
        this.ngOnInit()
      })
    }
  }

  switch(){
    this.switchService.switch()
    this.displaySwitchConfirm.toggle()
    this.ngOnInit()
  }


  displayAcceptPending: {
    value: string,
    account: any,
    setTrue: (account: account) =>void,
    setFalse: () =>void
  } = {
    value: 'display: none;',
    account: null,
    setTrue(account: account){
      this.value = 'display:flex;';
      this.account = account
    },
    setFalse(){
      this.value = 'display: none;';
      this.account = null
    }
  }

  displayRejectPending: {
    value: string,
    account: any,
    setTrue: (account: account) =>void,
    setFalse: () =>void
  } = {
    value: 'display: none;',
    account: null,
    setTrue(account: account){
      this.value = 'display:flex;';
      this.account = account
    },
    setFalse(){
      this.value = 'display: none;';
      this.account = null
    }
  }


  displayRemoveAccount: {
    value: string,
    account: any,
    setTrue: (account: account) =>void,
    setFalse: () =>void
  } = {
    value: 'display: none;',
    account: null,
    setTrue(account: account){
      this.value = 'display:flex;';
      this.account = account
    },
    setFalse(){
      this.value = 'display: none;';
      this.account = null
    }
  }


  displaySwitchConfirm = {
    value : 'display: none;',
    toggle(){
      if(this.value == 'display: none;'){
        this.value = 'display: flex;'
      }else{
        this.value = 'display: none;'
      }
    }
  }



}
