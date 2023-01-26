import { TranslationWidth } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
	fr: {
		weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
		months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
		weekLabel: 'sem',
	},
	// other languages you would support
};

@Injectable({
	providedIn: 'root'
})
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? ('0' + date.day).slice(-2) + this.DELIMITER + ('0' + date.month).slice(-2) + this.DELIMITER + date.year : '';
	}
}

@Injectable({
	providedIn: 'root'
  })
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	constructor() {
		super();
	}
	getWeekdayLabel(weekday: number, width?: TranslationWidth | undefined): string {
		return I18N_VALUES["fr"].weekdays[weekday - 1];
	}
	override getWeekLabel(): string {
		return I18N_VALUES["fr"].weekLabel;
	}
	getMonthShortName(month: number, year?: number | undefined): string {
		return I18N_VALUES["fr"].months[month - 1];
	}
	getMonthFullName(month: number, year?: number | undefined): string {
		return this.getMonthShortName(month);
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}

@Injectable({
  providedIn: 'root'
})
export class BSLocalService {

  constructor() { }
}
