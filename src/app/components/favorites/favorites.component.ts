import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/models/Favorite';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    public favorites = new Array<Favorite>();
    public buttonImages = new Array<String>();

    public constructor(private musicService: MusicService) { }

    public ngOnInit() {
        this.getAllFavorites();
    }

    public removeFromFavorites(index: number) {
        this.musicService.deleteFavorite(index).subscribe(()=>this.getAllFavorites());
    }

    public getAllFavorites(): void {
        this.musicService.getAllFavorites().subscribe(f => {
            this.favorites = f;
        });
    }
}
