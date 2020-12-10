import { Component, OnInit } from '@angular/core';
import { LfRouter } from '@lightweightform/core';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  constructor(private lfRouter: LfRouter) {}

  @computed
  get path(): string {
    const { 'guest-id': guestId } = this.lfRouter.params;
    return `/guests/${guestId}`;
  }

  ngOnInit() {}
}
