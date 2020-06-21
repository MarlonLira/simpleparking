import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-content-item',
  templateUrl: './tab-content-item.component.html',
  styleUrls: ['./tab-content-item.component.css']
})
export class TabContentItemComponent {
  @Input() href = '';
  @Input() active = '';
}
