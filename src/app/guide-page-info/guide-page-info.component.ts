import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-guide-page-info',
	templateUrl: './guide-page-info.component.html',
	styleUrls: ['./guide-page-info.component.css']
})
export class GuidePageInfoComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	redirectToAuth() {
		window.location.href = "http://back.aqyl.host/api/admin/login/?next=/api/admin/"
	}

}
