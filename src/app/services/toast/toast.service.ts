import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	public toast = {
		show: false,
		class: "",
		message: ""
	}

  	constructor() { }

  	voirToast(message: string, success?: boolean) {
		let customClass = success ?
		`bg-success text-light toast`:
		"bg-danger text-light toast";
		this.toast.show = true;
		this.toast.message = message;
		this.toast.class = customClass;
		return this.toast;
	}
}
