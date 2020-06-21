import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-header-item',
  templateUrl: './tab-header-item.component.html',
  styleUrls: ['./tab-header-item.component.css']
})
export class TabHeaderItemComponent {
  @Input() label = 'Label';
  @Input() icon = '';
  @Input() href = '';
  @Input() active = '';

}
