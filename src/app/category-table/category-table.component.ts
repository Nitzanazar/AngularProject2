import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [MatTableModule, RouterModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'words', 'lastModified', 'actions'];
  categories: Category [] = []

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categories=this.categoryService.list()
  }

  deleteCategory(id:number, name:string){
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {data: name,})

    dialogRef.afterClosed().subscribe(deletionConfirmed => {
          if(deletionConfirmed){
            this.categoryService.delete(id)
            this.categories=this.categoryService.list()
          }
    });
  }

  getCategoryWords(category: Category): string {
    return category.words.map(word => `${word.origin} - ${word.target}`).join(', ');
  }

}
