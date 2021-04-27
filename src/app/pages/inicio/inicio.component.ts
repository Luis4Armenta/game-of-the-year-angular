import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/game';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  juegos: {name: string, value: number}[] = []

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection<Game>('goty').valueChanges()
      .pipe(
        map((resp: Game[]) => {
          return resp.map(({ name, votos }) => ({name, value: votos}))
        })
      )
      .subscribe((juegos: {name: string, value: number}[]) => {
        this.juegos = juegos
      });
  }

}
