import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-combo-popup',
  templateUrl: './combo-popup.component.html',
  styleUrls: ['./combo-popup.component.scss']
})
export class ComboPopupComponent {
  @Output() comboout: EventEmitter<any> = new EventEmitter<any>();
  @Input() itemContains: any
  comboItem: any = {
    vegCurry: { selected: false, curryList: [{ curryName: '', size: undefined }] },
    nonVegCurry: { selected: false, curryList: [{ curryName: '', size: undefined }] },
    rice: { selected: false, size: undefined },
    chapati: { selected: false, chapatiName: undefined, count: undefined },
    dal: { selected: false, size: undefined },
    sweet: { selected: false },
    salad: { selected: false }
  }
  constructor(
    public toasterService: ToasterService
  ) {

  }
  ngOnInit() {
    // Access the passed data

    if (this.itemContains?.length > 0) {
      let vegCurryCount = 0;
      let NonvegCurryCount = 0;
      this.itemContains.forEach((item: any) => {
        switch (item.contentType) {
          case 'VegCurry':
            vegCurryCount++;
            this.comboItem.vegCurry.selected = true;
            if (vegCurryCount > 1) {
              this.comboItem.vegCurry.curryList.splice(vegCurryCount, 0, { curryName: '', size: undefined });
            }
            this.comboItem.vegCurry.curryList[vegCurryCount - 1].curryName = item.name;
            this.comboItem.vegCurry.curryList[vegCurryCount - 1].size = `${item.quantity}`;
            break;
          case 'NonVegCurry':
            NonvegCurryCount++;
            this.comboItem.nonVegCurry.selected = true;
            if (NonvegCurryCount > 1) {
              this.comboItem.nonVegCurry.curryList.splice(NonvegCurryCount, 0, { curryName: '', size: undefined });
            }
            this.comboItem.nonVegCurry.curryList[NonvegCurryCount - 1].curryName = item.name;
            this.comboItem.nonVegCurry.curryList[NonvegCurryCount - 1].size = `${item.quantity}`;
            break;
          case 'Rice':
            this.comboItem.rice.selected = true;
            this.comboItem.rice.size = `${item.quantity}`;
            break;
          case 'Chapati':
            this.comboItem.chapati.selected = true;
            this.comboItem.chapati.chapatiName = item.name;
            this.comboItem.chapati.count = item.quantity;
            break;
          case 'Dal':
            this.comboItem.dal.selected = true;
            this.comboItem.dal.size = `${item.quantity}`;
            break;
          case 'Sweet':
            this.comboItem.sweet.selected = true;
            break;
          case 'Salad':
            this.comboItem.salad.selected = true;
            break;
          // Add cases for other types if needed
          default:
            console.log(`Unknown item type: ${item.contentType}`);
            break;
        }
      });
    }
  }

  ngOnChanges() {
    console.log(this.itemContains, "this.itemContains");
  }

  addCurry(curryList: any, index: any) {
    curryList.splice(index + 1, 0, { curryName: '', size: undefined });
  }
  removeCurry(curryList: any, index: any) {
    curryList.splice(index, 1);
  }
  showDoneButton() {
    let showDone = false;
    for (let prop in this.comboItem) {
      if (this.comboItem[prop].selected) {
        showDone = true;
      }
    }
    return showDone;
  }

  addCombo() {
    console.log(this.comboItem);
    if (this.comboItem.vegCurry.selected && this.comboItem.vegCurry.curryList.length === 0) {
      this.toasterService.error(109);
      return;
    }
    if (this.comboItem.nonVegCurry.selected && this.comboItem.nonVegCurry.curryList.length === 0) {
      this.toasterService.error(109);
      return;
    }
    if (this.comboItem.rice.selected && !this.comboItem.rice.size) {
      this.toasterService.error(109);
      return;
    }
    if (this.comboItem.chapati.selected && !this.comboItem.chapati.count) {
      this.toasterService.error(109);
      return;
    }
    if (this.comboItem.dal.selected && !this.comboItem.dal.size) {
      this.toasterService.error(109);
      return;
    }
    this.goback();
  }
  goback() {
    this.comboout.emit(this.comboItem);
  }
}
