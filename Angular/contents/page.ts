/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';




@Component({
	selector: 'page-root',
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_Root {
	public title: string = "Root";
}
