import { Router } from "@angular/router";

export class Path {
    constructor(public path: string)
    {    
    }
  
    navigate(router: Router)
    {
      router.navigate(["/"+this.path]);
    }
  
    eq(testRoute: string): boolean
    {
      return testRoute===this.path || testRoute==="/"+this.path;
    }
  
}
