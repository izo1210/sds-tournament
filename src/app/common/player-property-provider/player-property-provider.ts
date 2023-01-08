import { Observable, Subscription } from "rxjs";
import { Player } from "src/app/model/player";

export class PlayerPropertyProvider {
    private static newDisplayName="New Player...";
    private static newBackgroundColor="hsl(0, 0%, 80%)";
    private static newColor="black";

    private repeatedFirstNames: string[]=this.getRepeatedFirstNames();
    private subscriptionToPlayers: Subscription|null=null;

    constructor(private players: Player[], private firstNameFirst: boolean=false)
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

    getDisplayName(player: Player|null): string
    {
        if(player==null) return PlayerPropertyProvider.newDisplayName;
        if(this.players.length===0) return this.getSecondaryDisplayName(player);
        if(this.repeatedFirstNames.includes(player.firstName)) return this.getSecondaryDisplayName(player);
        return this.getPrimaryDisplayName(player);
    }

    private getPrimaryDisplayName(player: Player): string
    {
        return player.firstName;
    }

    private getSecondaryDisplayName(player: Player): string
    {
        if(this.firstNameFirst) return player.firstName+" "+player.lastName;
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

    getBackgroundColor(player: Player|null, secondary: boolean=false): string
    {
        if(player==null) return PlayerPropertyProvider.newBackgroundColor;
        if(secondary) return this.getSecondaryBackgroundColor(player.hue);
        return this.getPrimaryBackgroundColor(player.hue);
    }

    getColor(player: Player|null, secondary: boolean=false): string
    {
        if(player==null) return PlayerPropertyProvider.newColor;
        if(secondary) return this.getSecondaryColor();
        return this.getPrimaryColor();
    }

    private getPrimaryBackgroundColor(hue: number): string
    {
        return "hsl("+hue+", 80%, 30%)";

    }

    private getSecondaryBackgroundColor(hue: number): string
    {
        return "hsl("+hue+", 100%, 80%)";

    }

    private getPrimaryColor(): string
    {
        return "white";
    }
    
    private getSecondaryColor(): string
    {
        return "black";
    }



}
