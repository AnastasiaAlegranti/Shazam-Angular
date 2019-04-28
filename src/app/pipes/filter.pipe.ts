import { Pipe, PipeTransform } from '@angular/core';
import { Chart } from '../models/Chart';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    public transform(songs: Chart[], searchText: string): Chart[] {
        if (!songs) return [];
        if (!searchText) return songs;
        searchText = searchText.toLowerCase();
        return songs.filter(m =>
            m.heading.title.toLowerCase().includes(searchText));
    }
}
