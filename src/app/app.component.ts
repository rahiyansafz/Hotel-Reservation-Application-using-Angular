import { Component, ViewChild, OnInit, isDevMode } from '@angular/core';
import {
  ActionsMenuAction,
  AppComponent as LfAppComponent,
  ModalComponent
} from '@lightweightform/bootstrap-theme';
import {
  LfStorage,
  LfFileStorage,
  LfI18n,
  LfUnloadAlert
} from '@lightweightform/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  reservationConfirmed = false;

  actions: ActionsMenuAction[] = [
    {
      id: 'save',
      style: 'outline-secondary',
      icon: 'save',
      callback: () => this.save()
    },
    {
      id: 'load',
      style: 'outline-secondary',
      icon: 'folder-open',
      isDisabled: () => !this.lfFileStorage.loadIsSupported,
      callback: () => this.load()
    },
    {
      id: 'language',
      style: 'outline-primary',
      icon: 'language',
      options: this.lfI18n.languages.map(lang => ({
        id: lang,
        value: lang,
        isActive: () => this.lfI18n.currentLanguage === lang
      })),
      callback: lang => this.lfI18n.setCurrentLanguage(lang)
    },
    {
      id: 'validate',
      style: 'outline-danger',
      icon: 'check-square-o',
      callback: () => this.lfApp.validate()
    },
    {
      id: 'finalize',
      style: 'outline-success',
      icon: 'send',
      callback: () => this.finalize()
    }
  ];

  @ViewChild(LfAppComponent) lfApp: LfAppComponent;
  @ViewChild('finalizeModal') finalizeModal: ModalComponent;

  constructor(
    public lfStorage: LfStorage,
    public lfFileStorage: LfFileStorage,
    public lfI18n: LfI18n,
    public lfUnloadAlert: LfUnloadAlert
  ) {}

  ngOnInit() {
    if (!isDevMode()) {
      this.lfUnloadAlert.enable();
    }
  }

  async save(): Promise<void> {
    try {
      const dateStr = new Date().toISOString().replace(/[T:.]/g, '-');
      const fileName = `reservation-${dateStr}`;
      await this.lfFileStorage.saveToFile('/', fileName);
      this.lfStorage.setPristine();
    } catch (err) {
      console.error('Error saving file:', err);
    }
  }

  async load(): Promise<void> {
    try {
      await this.lfFileStorage.loadFromFile('/');
      this.lfStorage.setTouched('/', true);
    } catch (err) {
      console.error('Error loading file:', err);
    }
  }

  finalize(): void {
    if (!this.lfStorage.hasErrors()) {
      this.finalizeModal.show();
    } else {
      this.lfApp.validate();
    }
  }

  async confirmFinalize(): Promise<void> {
    await this.finalizeModal.hide();
    this.reservationConfirmed = true;
  }
}
