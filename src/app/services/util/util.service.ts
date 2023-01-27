import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

	entreeInvalide(field: any): boolean {
		if (field?.invalid && field?.touched) {
			return true
		}
		return false;
	}
}
