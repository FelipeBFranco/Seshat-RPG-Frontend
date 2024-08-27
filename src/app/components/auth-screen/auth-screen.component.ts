import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.component.html',
  styleUrl: './auth-screen.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AuthScreenComponent implements OnInit {
  public currentCode!: string | null;

  constructor(private _activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.currentCode = this._activatedRoute.snapshot.paramMap.get('code');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['routeAnimations'];
  }
}
