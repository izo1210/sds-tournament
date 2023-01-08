import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.sass']
})
export class PlayerCardComponent implements OnInit {
  @Input() public player: Player|null=null;
  @Input() public hideIfPlayer: Player=this.playersService.empty;
  @Input() public playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);
  @Output() public click=new EventEmitter<Player|null>();

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
  }

  onClick(player: Player|null)
  {
    this.click.emit(player);
  }

}
