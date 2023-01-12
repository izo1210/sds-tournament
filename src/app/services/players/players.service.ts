import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Player, PlayerMap } from '../../model/player';
import { FirebaseCollection } from 'src/app/util/firebase-collection/firebase-collection';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends FirebaseCollection<Player> {
  readonly defaultPlayerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider();
  private playerMap: PlayerMap={};
  private virtualPlayerMap: PlayerMap={};

  constructor(
    firebaseApp: FirebaseApp,
  ) 
  { 
    super(firebaseApp, "players", data=>new Player(data));
    this.defaultPlayerPropertyProvider.subscribeToPlayers(this.list$);
    this.list$.subscribe(newPlayers=>this.fillPlayerMap(newPlayers));
    this.refreshList();
  }

  private fillPlayerMap(newPlayers: Player[]): void
  {
    this.playerMap={};
    this.virtualPlayerMap={};
    newPlayers.forEach(player=>this.playerMap[player.id]=player);
  }

  getPlayer(playerId: string): Player
  {
    let player=this.playerMap[playerId];
    if(player) return player;
    player=this.virtualPlayerMap[playerId];
    if(player) return player;
    this.virtualPlayerMap[playerId]=new Player({id: playerId, firstName: playerId, lastName: "", hue: -1});
    return player;
  }
  
}
