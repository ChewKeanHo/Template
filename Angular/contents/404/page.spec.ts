/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { TestBed } from '@angular/core/testing';
import { Page_404 } from './page';




describe('Page_404', () => {
	beforeEach(async () => {
	await TestBed.configureTestingModule({
		imports: [Page_404],
	}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(Page_404);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
