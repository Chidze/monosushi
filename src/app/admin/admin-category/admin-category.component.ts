import { Component, OnInit } from '@angular/core';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})

export class AdminCategoryComponent implements OnInit{
  public adminCategories!: ICategoryResponse[];
  public categoriesForm !: FormGroup;
  public editStatus = false;
  public currentID!:number | string;
  public isUploaded = false;
  public uploadPercent!: number;
  public show = true;


constructor(
  private fb: FormBuilder,
  private categoryService: CategoryService,
  private storage: Storage,
  private imageService: ImageService,
  private toastr: ToastrService
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
    image: [null, Validators.required]
  })
}

loadCategories():void{
  // this.categoryService.getAll().subscribe((data) => {this.adminCategories = data})
  this.categoryService.getAllFirebase().subscribe(data => {
    this.adminCategories = data as ICategoryResponse[];
  })
}

addCategory():void{
  if(this.editStatus){
    // this.categoryService.update(this.categoriesForm.value, this.currentID).subscribe(() => this.loadCategories())
    this.categoryService.updateFirebase(this.categoriesForm.value, this.currentID as string).then(() => {
      this.loadCategories();
      this.toastr.success('Категорія успішно оновлена')
  })
  }
  else{
      this.categoryService.createFirebase(this.categoriesForm.value).then(() => {
        this.toastr.success('Категорія успішно додана');
      })

    // this.categoryService.create(this.categoriesForm.value).subscribe(()=>{this.loadCategories()})
  }
  this.categoriesForm.reset();
  this.show = true;
  this.editStatus = false;
  this.uploadPercent = 0;
  this.isUploaded = false;

}

editCategory(category: ICategoryResponse): void {
  this.editStatus = true;
this.categoriesForm.patchValue({
    name: category.name,
    path: category.path,
    image: category.image
  });
  this.editStatus = true;
  this.currentID = category.id as number;
  this.isUploaded = true;
  this.isUploaded = true;
  this.editStatus = true;
  this.show = false;

}

deleteCategory(category: ICategoryResponse): void {
  // this.categoryService.delete(category.id).subscribe(() => { this.loadCategories() })
  this.categoryService.deleteFirebase(category.id as string).then(() => {
    this.loadCategories();
    this.toastr.success('Категорія успішно видалена');
  })
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
