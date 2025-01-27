import { Component, Input, OnInit } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  faAngleDown,
  faAngleRight,
  faCircle,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { fadeInOut } from './helper/fade-in-out';
import { INavbarData } from './types/side-nav-item-interface';
@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul
      *ngIf="collapsed && data.items && data.items.length > 0"
      [@submenu]="
        expanded
          ? {
              value: 'visible',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '*'
              }
            }
          : {
              value: 'hidden',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '0'
              }
            }
      "
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a
          (click)="handleClick(item)"
          class="sublevel-nav-link"
          *ngIf="item.items && item.items.length > 0"
          [ngClass]="getActiveClass(item)"
        >
          <fa-icon
            class="sublevel-link-icon fa fa-circle"
            [icon]="faCircle"
          ></fa-icon>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
          <fa-icon
            class="menu-collapse-icon"
            *ngIf="item.items && collapsed"
            [icon]="!item.expanded ? faAngleRight : faAngleDown"
          >
          </fa-icon>
        </a>
        <a
          href=""
          class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routerLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <fa-icon
            class="sublevel-link-icon fa fa-circle"
            [icon]="faCircle"
          ></fa-icon>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [data]="item"
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: INavbarData = {
    routerLink: '',
    icon: faCircle,
    label: '',
    items: [],
  };
  faAngleDown = faAngleDown;
  faAngleRight = faAngleRight;
  faCircle = faCircle;
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false;
  constructor(public router: Router) {}
  ngOnInit(): void {}

  handleClick(item: any) {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routerLink)
      ? 'active-sublevel'
      : '';
  }
}
