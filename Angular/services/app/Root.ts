/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';




/* Overall Application Component
 *   (1) Required placeholder for everything to work properly.
 *   (2) Leave this as it is and only work on contents/ (Pages) and
 *       services/ (Components).
 */
@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class App {}
