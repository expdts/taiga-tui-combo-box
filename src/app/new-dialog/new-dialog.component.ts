import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {delay, distinctUntilChanged, Observable, of, shareReplay, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {TUI_DEFAULT_MATCHER, TuiDestroyService} from "@taiga-ui/cdk";

const databaseMockData = [
  { uid: 1, firstName: 'Roman', lastName: 'Sedov' },
  { uid: 2, firstName: 'Alex', lastName: 'Inkin' },
];

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css'],
  providers: [TuiDestroyService],
})
export class NewDialogComponent implements OnInit {

  dataForm = new FormGroup({
    user: new FormControl(null, [Validators.required]),
  });

  search: string | null = '';

  private readonly request$ = new Subject<string>();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly contextData: TuiDialogContext<any>,
    @Inject(TuiDestroyService) private readonly destroy$: Observable<void>,
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

  closeModal(result: any) {
    this.contextData.completeWith(result);
  }

}
