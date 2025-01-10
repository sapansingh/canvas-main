import { Component } from '@angular/core';

@Component({
  selector: 'app-formsfill',
  imports: [],
  templateUrl: './formsfill.component.html',
  styleUrl: './formsfill.component.css'
})
export class FormsfillComponent {

  takepring(){
        
    window.print();
}

}
