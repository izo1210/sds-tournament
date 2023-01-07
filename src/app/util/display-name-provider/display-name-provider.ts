import { Observable, Subscription } from "rxjs";
import { Player } from "src/app/model/player";

export class DisplayNameProvider {
    private repeatedFirstNames: string[]=this.getRepeatedFirstNames();
    private subscriptionToPlayers: Subscription|null=null;

    constructor(private firstNameFirst: boolean, private players: Player[])
    {
    }

    subscribeToPlayers(players$: Observable<Player[]>)
    {
        this.subscriptionToPlayers=players$.subscribe(players=>this.setPlayers(players));
    }

    unsubscribeFromPlayers()
    {
        if(this.subscriptionToPlayers!=null)
        {
            this.subscriptionToPlayers.unsubscribe();
            this.subscriptionToPlayers=null;
        }
    }

    setPlayers(players: Player[])
    {
        this.players=players;
        this.repeatedFirstNames=this.getRepeatedFirstNames();
    }

    get(player: Player|null): string
    {
        if(player==null)
        {
            return "";
        }
        if(!this.repeatedFirstNames.includes(player.firstName))
        {
            return player.firstName;
        }
        if(this.firstNameFirst)
        {
            return player.firstName+" "+player.lastName;
        }
        return player.lastName+" "+player.firstName;
    }

    private getRepeatedFirstNames(): string[]
    {
        const firstNames: string[]=[];
        const repeatedFirstNames: string[]=[];

        for(const player of this.players)
        {
            if(!firstNames.includes(player.firstName))
            {
                firstNames.push(player.firstName);
            }
            else if(!repeatedFirstNames.includes(player.firstName))
            {
                repeatedFirstNames.push(player.firstName);
            }
        }

        return repeatedFirstNames;
    }

}
