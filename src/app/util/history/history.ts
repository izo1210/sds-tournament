import { BehaviorSubject } from "rxjs";

export class History {
    private commands: any[]=[];
    public readonly empty$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);

    add(command: any)
    {
        this.commands.push(command);
        if(this.commands.length==1)
        {
            this.empty$.next(false);
        }
    }

    undo()
    {
        if(this.commands.length==0)
        {
            return;
        }
        this.commands.pop()();
        if(this.commands.length==0)
        {
            this.empty$.next(true);
        }
    }

    clear()
    {
        if(this.commands.length==0)
        {
            return;
        }
        this.commands=[];
        this.empty$.next(true);
    }
  
}
