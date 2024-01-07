import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-tovary',
  templateUrl: './admin-tovary.component.html',
  styleUrls: ['./admin-tovary.component.scss']
})
export class AdminTovaryComponent implements OnInit{
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts!: IProductResponse[];
  public productForm !: FormGroup;
  public editStatus = false;
  public currentTovarID!: number | string;
  public currentCategoryID!: number;
  public isUploaded = false;
  public uploadPercent!: number;
  public show = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService : CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts();

  }

  initProductForm():void {
    this.productForm = this.fb.group ({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path:  [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      count: [1],
    })

  }

  loadCategories(): void {
    // this.categoryService.getAll().subscribe((data) => {
    //   this.adminCategories = data;
    //   this.productForm.patchValue({
    //     category: this.adminCategories[0].id,
    //   });
    // });
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({
            category: this.adminCategories[0].id,
          });
          })
  }


  loadProducts():void{
    // this.productService.getAll().subscribe((data) => {this.adminProducts = data})
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
      console.log(
        this.adminProducts
      )
    })

  }

  addProduct():void{
    if(this.editStatus){
      // this.productService.update(this.productForm.value, this.currentTovarID).subscribe(() =>
      this.productService.updateFirebase(this.productForm.value, this.currentTovarID as string).then(() => {
      this.loadProducts();
      this.toastr.info('Продукт успішно редаговано')
      })
      console.log(this.currentTovarID)
    }
    else{
      // this.productService.create(this.productForm.value).subscribe(()=>{this.loadProducts();
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadProducts();
        this.toastr.info('Продукт успішно додано')
      })
      console.log(this.productForm.value)
    }
    this.productForm.reset();
    this.show = true;
    this.editStatus = false;
    this.uploadPercent = 0;
    this.isUploaded = false;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path:  product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      image: product.image,
      count: [1],
    })
    this.editStatus = true;
    this.currentTovarID = product.id;
    this.show= false;
    this.isUploaded = true;
  }

  deleteProduct(product: IProductResponse): void {
    // this.productService.delete(product.id).subscribe(() => { this.loadProducts() })
    this.productService.deleteFirebase(product.id as string).then(() => {
      this.loadProducts();
      this.toastr.success('Категорія успішно видалена');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          image: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('image'))
    .then(() => {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({ image: null });
    })
    .catch((err) => {
      console.log(err);
    });
}
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
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
