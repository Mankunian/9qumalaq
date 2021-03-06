import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { GlobalConfig } from "../../global";
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'app-kazakhstan',
	templateUrl: './kazakhstan.component.html',
	styleUrls: ['./kazakhstan.component.css']
})
export class KazakhstanComponent implements OnInit {
	regionName: any;
	winnersList: any;
	leadershipList: any;
	newsList: any;
	noNews: boolean;
	noLeaderships: boolean;
	noWinners: boolean;
	kazId: any;
	system: System = new System();
	langs = Array<Lang>();
	kazName: any;
	imgLang: string;

	constructor(public router: Router, private http: HttpService, public translate: TranslateService) {
		translate.setDefaultLang('ru');
	}

	ngOnInit(): void {
		this.getCityList();
		this.getKazFedElem();
		this.getLangsList();
	}

	getLangsList() {
		this.langs = Array<Lang>();
		this.langs.push(new Lang(1, 'РУС', 'ru'));
		this.langs.push(new Lang(2, 'ENG', 'en'));
		this.langs.push(new Lang(2, 'ҚАЗ', 'kz'));
		this.system = new System();

		// set lang to select option
		this.setLangSelectOption();
	}

	setLangSelectOption() {
		let lang = sessionStorage.getItem('lang');
		if (lang) {
			this.langs.forEach((element, index) => {
				if (element.code === lang) {
					this.system.lang = this.langs[index]
					this.translate.use(element.code);
					this.imgLang = element.code;
				}
			});
		} else {
			this.system.lang = this.langs[0];
			let systemLang = this.system.lang.code;
			this.imgLang = systemLang
			sessionStorage.setItem('lang', systemLang)
			this.translate.use(systemLang);
		}
	}

	selectLang(e): void {
		this.translate.use(e.code);
		sessionStorage.setItem('lang', e.code);
		this.imgLang = e.code;
		this.getCityList();
		this.getKazFedElem();
	}

	getKazFedElem() {
		let kazFederation = JSON.parse(sessionStorage.getItem('kazFederation'))
		if (kazFederation) {
			let kazId = kazFederation.id;
			let kazName = kazFederation.name;
			this.kazId = kazId;
			this.kazName = kazName;
			this.getLeadershipsByKaz(kazId);
			this.getNewsByKaz(kazId);
			this.getWinnersByKaz(kazId);
		}
	}

	scrollToElement($element, sectionName) {
		if (sectionName === 'about') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'guide') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'news') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'champs') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'partners') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'contacts') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
	}

	getCityList() {
		this.http.getCityListService().subscribe(data => {
			console.log(data)
		})
	}

	getLeadershipsByKaz(id) {
		this.http.getLeadershipByCountryService(id).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noLeaderships = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getNewsByKaz(id) {
		this.http.getNewsByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noNews = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getWinnersByKaz(id) {
		this.http.getWinnersByCountryService(id).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noWinners = true;
			} else {
				this.winnersList = data;
			}
		})
	}


	// Redirect Methods

	redirect(item) {
		let cityObj = {
			type: 'city',
			id: item
		}
		// sessionStorage.setItem('cityObj', cityObj);
		sessionStorage.setItem('cityObj', JSON.stringify(cityObj));
		sessionStorage.removeItem('countryObj');
		this.router.navigate(['/city', cityObj.id])
	}

	redirectGuideItem(item) {
		this.setSessionStorage();

		let leadershipId = item.id;
		let countryId = this.kazId;
		sessionStorage.setItem('leadershipId', leadershipId);
		sessionStorage.setItem('countryId', countryId);
		this.router.navigate(['/guide-item'])

	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

	redirectToWinnersPage(item) {
		this.setSessionStorage();
		let winnerId = item.id;
		let countryId = this.kazId;
		sessionStorage.setItem('winnerId', winnerId);
		sessionStorage.setItem('countryId', countryId);
		// this.router.navigate(['/champ-page-info'])
		this.router.navigate(['/country/winners', winnerId])
	}

	redirectNewsPage(item) {
		this.setSessionStorage();
		let newsId = item.id;
		let countryId = this.kazId;
		sessionStorage.setItem('newsId', newsId);
		sessionStorage.setItem('countryId', countryId);
		this.router.navigate(['/news-page'])
	}

	setSessionStorage() {
		let countryObj = {
			type: 'country',
			id: this.kazId
		}
		sessionStorage.setItem('countryObj', JSON.stringify(countryObj));
		sessionStorage.removeItem('cityObj');
	}
}



export class System {
	lang: Lang;
}

export class Lang {
	constructor(id: number, name: string, code: string) {
		this.id = id;
		this.name = name;
		this.code = code;
	}

	id: number;
	name: string;
	code: string;
}