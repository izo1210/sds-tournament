import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/service/players.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.sass']
})
export class EditPlayerComponent implements OnInit, OnDestroy {
  private existingPlayers: Player[]=[];
  private existingNames: string[]=[];
  private existingIds: string[]=[];
  private existingHues: number[]=[];  
  private hueMin=0;
  readonly hueStep=15;
  readonly hueMax=360;

  readonly player$: BehaviorSubject<Player>=new BehaviorSubject<Player>(this.emptyPlayer());
  private playersSubscription: Subscription=this.playersService.playerList$.subscribe(playerList=>this.setExistingPlayers(playerList));

  readonly firstNameControl=new FormControl<string>("", [Validators.required]);
  readonly lastNameControl=new FormControl<string>("", [Validators.required, this.validateName.bind(this) as ValidatorFn]);
  readonly hueControl=new FormControl<number>(this.hueMin, this.validateHue.bind(this) as ValidatorFn);
  readonly idControl=new FormControl<string>("", this.validateId.bind(this) as ValidatorFn);
  readonly playerForm: FormGroup=new FormGroup({
    'firstName': this.firstNameControl,
    'lastName': this.lastNameControl,
    'hue': this.hueControl,
    'id': this.idControl,
  });

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.queryPlayer(params['id']));
    this.playerForm.valueChanges.subscribe(()=>this.fillPlayerFromForm());    
  }

  ngOnDestroy(): void {
    this.playersSubscription.unsubscribe(); 
  }

  private queryPlayer(id: string|null): void
  {
    if(!id) return;
    this.player$.value.id=id;
    this.playersService.get(id)
      .then(player=>this.playerForm.setValue(player))
      .then(player=>this.fillExistingValues())
      .catch(err=>alert(err));
  }

  private emptyPlayer(): Player
  {
    return {...this.playersService.empty};
  }

  private fillPlayerFromForm(): void
  {
    const newPlayer: Player={
      firstName: this.firstName,
      lastName: this.lastName,
      hue: this.hue,
      id: this.player$.value.id,
    };
    this.player$.next(newPlayer);
  }

  private get firstName(): string
  {
    return (this.firstNameControl.value||"").trim();
  }

  private get lastName(): string
  {
    return (this.lastNameControl.value||"").trim();
  }

  private get hue(): number
  {
    return this.hueControl.value||this.hueMin;
  }

  private createId(): string
  {
    let newIdBase=this.formatId(this.firstName, this.lastName);
    let newId=newIdBase;
    for(let i=1; i<100 && this.existingIds.includes(newId); i++)
    {
      newId=newIdBase+i;
    }    
    return newId;
  }

  private setExistingPlayers(players: Player[]): void
  {
    this.existingPlayers=[];
    players.forEach(player=>this.existingPlayers.push(player));
    this.fillExistingValues();
  }

  private fillExistingValues(): void
  {
    const otherPlayers=
      this.idControl ?
      this.existingPlayers.filter(player=>player.id!==this.idControl.value) :
      this.existingPlayers;
    this.existingNames=this.createExistingValues(otherPlayers, player=>player.lastName+" "+player.firstName);
    this.existingIds=this.createExistingValues(otherPlayers, player=>player.id);
    this.existingHues=this.createExistingValues(otherPlayers, player=>player.hue);
    if(this.playerForm)
    {
      this.playerForm.setValue(this.playerForm.value); //revalidate
    }
  }

  private validateName(control: FormControl<string|null>): ValidationErrors|null
  {
    if(control.value==null) return null;
    if(this.existingNames.includes(control.value+" "+this.firstNameControl.value)) return {"error": "Exsisting name"};
    return null;
  }

  private validateHue(control: FormControl<number|null>): ValidationErrors|null
  {
    if(control.value==null) return null;
    if(this.existingHues.includes(control.value)) return {"error": "Exsisting hue"};
    return null;
  }

  private validateId(control: FormControl<string|null>): ValidationErrors|null
  {
    if(control.value==null) return null;
    if(control.value==="") return null;
    if(this.existingIds.includes(control.value)) return {"error": "Exsisting ID. Change player name!"};
    return null;
  }

  private createExistingValues<T>(players: Player[], propertyExtractor: (player: Player)=>T): T[]
  {
    const existingValues: T[]=[];
    players.forEach(player=>this.addExistingValue(propertyExtractor(player), existingValues));
    return existingValues;
  }

  private addExistingValue<T>(value: T, existingValues: T[]): void
  {
    if(existingValues.includes(value)) return;
    existingValues.push(value);
  }

  private formatId(firstName: string, lastName: string): string
  {
    return (firstName+"."+lastName)
      .toLowerCase().replace(" ", "_")
      .replace("á", "a").replace("é", "e").replace("í", "i")
      .replace("ó", "o").replace("ö", "o").replace("ő", "o")
      .replace("ú", "u").replace("ü", "u").replace("ű", "u");
  }

  onSubmit(): void
  {
    if(this.player$.value.id==="")
    {
      this.idControl.setValue(this.createId(), {emitEvent: false});
    }

    if(this.playerForm.invalid) return;        
    if(this.idControl.value==null) {alert("ID is null"); return;} //should not be

    this.player$.value.id=this.idControl.value;

    this.playersService.set(this.player$.value)
      .then(()=>this.onSaved())
      .catch(err=>alert(err));
  }

  onSaved(): void
  {
    this.playersService.refreshPlayerList();
    this.back();
  }

  onDelete(): void
  {
    this.playersService.del(this.idControl.value, confirm("Delete player?"))
      .then(()=>this.onSaved())
      .catch(err=>{if(err) alert(err)});
  }

  back(): void
  {
    Paths.get.back(this.router);
  }
}
