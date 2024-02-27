import { animate, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimationTimeout = 400;

export const fadeAnimation = trigger('routeAnimations', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          position: 'absolute',
          height: '100%',
          width: '100%'
        })
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          opacity: 1,
          position: 'absolute',
          height: '100%',
          width: '100%'
        }),
        animate(`${fadeAnimationTimeout}ms`, style({ opacity: 0 }))
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({
          opacity: 0,
          position: 'relative',
          height: '100%',
          width: '100%'
        }),
        animate(`${fadeAnimationTimeout}ms`, style({ opacity: 1 }))
      ],
      { optional: true }
    )
  ])
]);
