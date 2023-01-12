export class Player {
    static readonly empty=new Player();

    firstName: string;
    hue: number;
    id: string;
    lastName: string;

    constructor(source: any = {id: "", firstName: "", lastName: "", hue: -1})
    {
        this.firstName=source.firstName;
        this.lastName=source.lastName;
        this.id=source.id;
        this.hue=source.hue;
    }

    valueOf()
    {
        return this.id;
    }
}

export type PlayerMap={[playerId: string]: Player};

