import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { Chart } from 'src/app/models/Chart';
import { Favorite } from 'src/app/models/Favorite';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public songs = new Array<Chart>();
    public favorites = new Array<Favorite>();
    public buttonImages = new Array<String>();
    public searchText = "";

    public constructor(private musicService: MusicService) { }

    public ngOnInit() {
        this.getAllSongs();
        this.initButtons();
        this.getAllFavorites();
    }

    public initButtons(): void {
        for (let i = 0; i < 200; i++) {
            this.buttonImages[i] = "not-favorite";//Init buttons with empty heart;
        }
    }

    public getAllSongs(): void {//Get top 200 shazam
        let observable = this.musicService.getMusic();
        observable.subscribe(m => {
            for (let i = 0; i < 200; i++) {
                this.songs.push(m.chart[i]);
            }
        });
    }

    public addOrRemoveFromFavorites(index: number) {//If song exist in favorites- remove, else add.
        this.musicService.getAllFavorites().subscribe(f => {
            this.favorites = f;
            this.favorites.some(
                f => f.indexInClientArray == index) ? this.removeFromFavorites(index) : this.addToFavorites(index);
        });
    }

    public addToFavorites(index: number) {//Add song to favorites
        this.buttonImages[index] = "favorite";
        let temp = this.songs[index];
        let favorite = new Favorite(index, temp.heading.title, temp.heading.subtitle, temp.share.image, temp.share.href);
        this.musicService.addFavorite(favorite).subscribe( ()=>this.getAllFavorites());//Add song to DB and get updated favorites array.
    }

    public removeFromFavorites(index: number) {//Remove song from favorites
        this.buttonImages[index] = "not-favorite";
        this.musicService.deleteFavorite(index).subscribe( ()=>this.getAllFavorites());//Remove song from DB and get updated favorites array.      
    }

    public checkClass(index: number): boolean {//Checks if to add favorites class.
        for (let i = 0; i < this.favorites.length; i++) {
            if (index == this.favorites[i].indexInClientArray)//Check if certain song belongs to favorites array.
                return true;
        }
        return false;      
    }

    public getAllFavorites(): void {//Get all favorites from server
        this.musicService.getAllFavorites().subscribe(f => {
            this.favorites = f;
            for (let i = 0; i < this.favorites.length; i++) {
            this.buttonImages[this.favorites[i].indexInClientArray] = "favorite";
            }
        });
    }
}
