import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.sass']
})
export class EditPlayerComponent implements OnInit {
  private existingNames: string[]=[];
  private existingIds: string[]=[];
  private existingHues: number[]=[];  
  private hueMin=0;
  readonly hueStep=15;
  readonly hueMax=360;

  readonly player$: BehaviorSubject<Player>=new BehaviorSubject<Player>(new Player());

  readonly firstNameControl=new FormControl<string>("", [Validators.required]);
  readonly lastNameControl=new FormControl<string>("", [Validators.required, this.validateName.bind(this) as ValidatorFn]);
  readonly hueControl=new FormControl<number>(this.hueMin, this.validateHue.bind(this) as ValidatorFn);
  readonly idControl=new FormControl<string>("");
  readonly playerForm: FormGroup=new FormGroup({
    'firstName': this.firstNameControl,
    'lastName': this.lastNameControl,
    'hue': this.hueControl,
    'id': this.idControl,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public playersService: PlayersService,
  ) { }

  ngOnInit(): void {
    this.playerForm.valueChanges.subscribe(()=>this.formToPlayer());    
    this.route.params.subscribe(params=>this.processIdParam(params['id']));
  }

  private processIdParam(id: string|null): void
  {
    this.existingNames=[];
    this.existingIds=[];
    this.existingHues=[]; 

    let editedPlayer: Player|null=null;
    for(let player of this.playersService.list$.value)
    {
      if(player.id===id)
      {
        editedPlayer=player;
      }
      else
      {
        this.existingNames.push(this.formatId(player.firstName, player.lastName));
        this.existingIds.push(player.id);
        this.existingHues.push(player.hue);
      }
    }
    if(editedPlayer) this.playerForm.setValue(editedPlayer);
  }

  private formToPlayer(): void
  {
    const newPlayer: Player=new Player();
    newPlayer.firstName=this.firstName;
    newPlayer.lastName=this.lastName;
    newPlayer.hue=this.hue;
    newPlayer.id=this.id;
    this.player$.next(newPlayer);
  }

  private get firstName(): string
  {
    return (this.firstNameControl?.value||"").trim();
  }

  private get lastName(): string
  {
    return (this.lastNameControl?.value||"").trim();
  }

  private get hue(): number
  {
    return this.hueControl?.value||this.hueMin;
  }

  get id(): string
  {
    return this.idControl?.value||"";
  }

  private validateName(control: FormControl<string|null>): ValidationErrors|null
  {
    if(control.value==null) return null;
    if(this.existingNames.includes(this.formatId(this.firstName, this.lastName))) return {"error": "Exsisting name"};
    return null;
  }

  private validateHue(control: FormControl<number|null>): ValidationErrors|null
  {
    if(control.value==null) return null;
    if(this.existingHues.includes(control.value)) return {"error": "Exsisting color"};
    return null;
  }

  private createId(): string
  {
    let newIdBase=this.formatId(this.firstName, this.lastName);
    let newId=newIdBase;
    for(let i=1; i<100 && this.existingIds.includes(newId); i++) newId=newIdBase+i;
    if(this.existingIds.includes(newId)) throw new Error("Exsisting ID. Change player name!");
    return newId;
  }

  private formatId(firstName: string, lastName: string): string
  {
    return (firstName+"."+lastName)
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, '') //remove accents
      .toLowerCase();
  }

  onClickSave(): void
  {
    if(this.playerForm.invalid) return;        
    if(this.id==="") this.player$.value.id=this.createId();
    this.playersService.set(this.player$.value.id, this.player$.value)
      .then(()=>this.onSuccess())
      .catch(err=>alert(err));
  }

  onClickDelete(): void
  {
    if(this.id==="") return;
    if(!confirm("Delete player?")) return;
    this.playersService.del(this.idControl.value)
      .then(()=>this.onSuccess())
      .catch(err=>alert(err));
  }

  onSuccess(): void
  {
    this.playersService.refreshList();
    this.back();
  }

  back(): void
  {
    Paths.get.back(this.router);
  }
}
