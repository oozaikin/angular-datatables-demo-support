import { Component } from '@angular/core';
declare let $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';

  ngOnInit() {
     this.loadScript('../app/assets/dataTables.checkboxes_CUSTOM.js');
     this.loadScript('https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js');
  }  

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


}
