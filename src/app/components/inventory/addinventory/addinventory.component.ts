import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-addinventory',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './addinventory.component.html',
  styleUrl: './addinventory.component.css'
})
export class AddinventoryComponent {

}
