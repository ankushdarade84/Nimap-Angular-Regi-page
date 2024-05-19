// about-us.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule} from '@angular/forms';
import { NgForOf } from '@angular/common'; // Change NgFor to NgForOf
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FormsModule, NgForOf,CommonModule], // Change NgFor to NgForOf
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers:[DataService]
})
export class AboutUsComponent implements OnInit {
  constructor(public dataService: DataService) {}

  contactlist: any;

  ngOnInit(): void {
    
  }


  show()
  {
    this.dataService.getContacts().subscribe(data => {
      this.contactlist = data;
      console.log(data);
      
    });
  }
}
