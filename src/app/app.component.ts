import {Component, Inject, Injector} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay, distinctUntilChanged, Observable, of, shareReplay, startWith, Subject, switchMap, takeUntil} from 'rxjs';
import {TUI_DEFAULT_MATCHER, TuiDestroyService} from "@taiga-ui/cdk";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {NewDialogComponent} from "./new-dialog/new-dialog.component";

const databaseMockData = [
  { uid: 1, firstName: 'Roman', lastName: 'Sedov' },
  { uid: 2, firstName: 'Alex', lastName: 'Inkin' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TuiDestroyService],
})
export class AppComponent {
  title = 'taiga-tui-combo-box';

  dataForm = new FormGroup({
    user: new FormControl(null, [Validators.required]),
  });

  search: string | null = '';

  private readonly request$ = new Subject<string>();

  constructor(
    @Inject(TuiDestroyService) private readonly destroy$: Observable<void>,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
  }

  ngOnInit(): void {
  }

  stringify(_item: any) {
    return `${_item?.firstName} ${_item?.lastName}`;
  }

  private readonly response$ = this.request$.pipe(
    distinctUntilChanged(),
    switchMap((query) =>
      of(
        databaseMockData.filter((_data) =>
          TUI_DEFAULT_MATCHER(this.stringify(_data), query)
        )
      ).pipe(delay(Math.random() * 300 + 100), startWith(null))
    ),
    takeUntil(this.destroy$),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  request(query: string | null): Observable<readonly any[] | null> {
    this.request$.next(query || '');

    return this.response$;
  }

  openDialog() {
    const dialogRef = this.dialogService.open(new PolymorpheusComponent(NewDialogComponent, this.injector), {
      label: '',
      closeable: false,
      dismissible: false,
      required: true,
      data: {}
    });

    dialogRef.subscribe(async (_resData: any) => {

    });
  }

}
