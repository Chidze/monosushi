import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent implements OnInit{
  public actionsForm !: FormGroup;
  public editStatus = false;
  public show = true;
  public adminActions !: IActionResponse[];
  public currentID!:number | string;
  public isUploaded = false;
  public uploadPercent!: number;

constructor(
  private fb: FormBuilder,
  private actionService : ActionService,
  private storage: Storage,
  private imageService: ImageService,
  private toastr: ToastrService
  ){

}
ngOnInit(): void {
  this.initActionForm();
  this.loadActions();

}

initActionForm():void {
  this.actionsForm = this.fb.group ({
    data: [ new Date() ],
    name: [null, Validators.required],
    title: [null, Validators.required],
    description: [null, Validators.required],
    image: [null, Validators.required]
  })

}

loadActions():void{
  // this.actionService.getAll().subscribe((data) => {this.adminActions = data})
  this.actionService.getAllFirebase().subscribe(data => {
    this.adminActions = data as IActionResponse[];
  })
}

addAction():void{
  if(this.editStatus){
    // this.actionService.update(this.actionsForm.value, this.currentID).subscribe(() => this.loadActions())

    this.actionService.updateFirebase(this.actionsForm.value, this.currentID as string).then(() => {
      this.loadActions();
      this.toastr.success('Категорія успішно оновлена')})
  }

  else{
    // this.actionService.create(this.actionsForm.value).subscribe(()=>{this.loadActions()})
    this.actionService.createFirebase(this.actionsForm.value).then(() => {
      this.toastr.success('Категорія успішно додана');})
  }

  this.actionsForm.reset();
  this.show = true;
  this.editStatus = false;
  this.uploadPercent = 0;
  this.isUploaded = false;

}

editAction(action: IActionResponse): void {
  this.actionsForm.patchValue({
    name: action.name,
    title: action.title,
    description: action.description,
    image: action.image,
    data: new Date()
  })
  this.editStatus = true;
  this.currentID = action.id
  this.isUploaded = true;
  this.show= false;

}

deleteAction(action: IActionResponse): void {
  // this.actionService.delete(action.id).subscribe(() => { this.loadActions() })
  this.actionService.deleteFirebase(action.id as string).then(() => {
    this.loadActions();
    this.toastr.success('Категорія успішно видалена');
  })
}

upload(event: any): void {
  const file = event.target.files[0];
  this.imageService.uploadFile('images', file.name, file)
    .then(data => {
      this.actionsForm.patchValue({
        image: data
      });
      this.isUploaded = true;
    })
    .catch(err => {
      console.log(err);
    })
}

async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
  const path = `${folder}/${name}`;
  let url = '';
  if(file) {
    try {
      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      percentage(task).subscribe(data => {
        this.uploadPercent = data.progress
      });
      await task;
      url = await getDownloadURL(storageRef);
    } catch (e: any) {
      console.error(e);
    }
  } else {
    console.log('wrong format');
  }
  return Promise.resolve(url);
}
deleteImage(): void {
  const task = ref(this.storage, this.valueByControl('image'));
  deleteObject(task).then(() => {
    console.log('File deleted');
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.actionsForm.patchValue({
      image: null
    })
  })
}
valueByControl(control: string): string {
  return this.actionsForm.get(control)?.value;
}

add() {
  this.show = false;
  this.editStatus = false;
}
noAdd() {
  this.show = true;
  this.editStatus = false;
}

}
