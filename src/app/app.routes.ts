import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { FormsComponent } from './forms/forms.component';

export const routes: Routes = [
    {path: '', component: CategoryTableComponent},
    {path: 'category/:idString', component: FormsComponent},
];
