import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category/category.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})

export class AdminCategoryComponent implements OnInit{
  public adminCategories!: ICategory[];
  public categoriesForm !: FormGroup;
  public editStatus = false;
  public currentID!:number;
  public isUploaded = false;
  public uploadPercent!: number;
  public show = true;


constructor(
  private fb: FormBuilder,
  private categoryService: CategoryService,
  private storage: Storage,
  private imageService: ImageService
  ){

}
ngOnInit(): void {
  this.initCategoryForm();
  this.loadCategories();

}

initCategoryForm():void {
  this.categoriesForm = this.fb.group ({
    name: [null, Validators.required],
    path: [null, Validators.required],
    image: ['gs://actions-162bb.appspot.com/images', Validators.required]
  })
}

loadCategories():void{
  this.categoryService.getAll().subscribe((data) => {this.adminCategories = data})
}

addCategory():void{
  if(this.editStatus){
    this.categoryService.update(this.categoriesForm.value, this.currentID).subscribe(() => this.loadCategories())
  }
  else{
    this.categoryService.create(this.categoriesForm.value).subscribe(()=>{this.loadCategories()})
  }
  this.categoriesForm.reset();
  this.show = true;
  this.editStatus = false;
  this.uploadPercent = 0;
  this.isUploaded = false;

}

editCategory(category: ICategory): void {
  this.categoriesForm.patchValue({ 
    id: category.id,
    name: category.name,
    path: category.path,
    image: category.image,
  })
  this.editStatus = true;
  this.currentID = category.id;
  this.show= false;
  this.isUploaded = true;
}

deleteCategory(category: ICategory): void {
  this.categoryService.delete(category.id).subscribe(() => { this.loadCategories() })
}

upload(event: any): void {
  const file = event.target.files[0];
  this.imageService.uploadFile('images', file.name, file)
    .then(data => {
      this.categoriesForm.patchValue({
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
    this.categoriesForm.patchValue({
      image: null
    })
  })
}
valueByControl(control: string): string {
  return this.categoriesForm.get(control)?.value;
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
