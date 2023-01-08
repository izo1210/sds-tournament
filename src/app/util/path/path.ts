import { Router } from "@angular/router";

export class Path {
    lastVisited: number=-1;

    constructor(public path: string, public tracked: boolean=true)
    {    
    }
  
    navigate(router: Router, params?: any)
    {
      if(this.tracked) this.lastVisited=new Date().getTime();
      if(!params) router.navigate(["/"+this.path]);
      else router.navigate(["/"+this.path, params]);
    }
  
    eq(testRoute: string): boolean
    {
      return testRoute===this.path || testRoute==="/"+this.path;
    }
  
}
