/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';




@Component({
	selector: 'page-lang',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_Lang {
	public title: string = "Lang";
}
