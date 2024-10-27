/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { TestBed } from '@angular/core/testing';
import { Page_Lang } from './page';




describe('Page_Lang', () => {
	beforeEach(async () => {
	await TestBed.configureTestingModule({
		imports: [Page_Lang],
	}).compileComponents();
	});


	it('should create the app', () => {
		const fixture = TestBed.createComponent(Page_Lang);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
