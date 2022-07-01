import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean  {
   
   
    
    if(component.editFrom.dirty){
      return confirm('Are you sure you want to continue? Any unsave changes will be lost');
    }
    return true;
  }
  
}
