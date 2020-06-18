import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

// before constructor declare this
uploadPercent: Observable<number>;
downloadURL: Observable<string>;

// constructor:
constructor(
private storage: AngularFireStorage
) { }

// your other functions here

uploadFile(event) {
    const file = event.target.files[0];
    const filePath = '/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
