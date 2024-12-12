/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { TestBed } from '@angular/core/testing';
import { Page_Root } from './page';




describe('Page_Root', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Page_Root],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(Page_Root);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
