import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dl-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  private isOpen: boolean;
  private selected: string;

  constructor() { }

  ngOnInit() {
    this.selected = "Good";
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  choose() {
    
  }

}
