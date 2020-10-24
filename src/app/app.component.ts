import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('persons');
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    this.items.subscribe(console.log);
  }

  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    console.log(key);
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
