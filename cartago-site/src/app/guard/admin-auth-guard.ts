
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';



@Injectable()
export class AdminAuthGuard  implements CanActivate{



    constructor(private isAdmin : boolean, private router : Router){
    }

    canActivate() : boolean{
        if(this.isAdmin){
            return true;
        } 
        this.router.navigate(['/']);
        return false;
    }

}
