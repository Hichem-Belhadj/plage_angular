import { Component, Input } from '@angular/core';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
	@Input() public toast = {
		show: false,
		class: "",
		message: ""
	}
}
