/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';




@Component({
	selector: 'page-404',
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_404 {
	public title: string = "404";
}
