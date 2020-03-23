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
    
    this.loadCss('../app/assets/dataTables.checkboxes.');
     this.loadScript('../app/assets/dataTables.checkboxes_CUSTOM.js');
     this.loadCss('https://cdn.datatables.net/select/1.3.1/css/select.dataTables.css');
     this.loadScript('https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js');
  }  

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const dtMainScript = jQuery('script[src*="dt-1.10.9/datatables.min.js"]').parent();
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    //script.async = false;
    //script.defer = true;
    dtMainScript.append(script.outerHTML);
  }

  public loadCss(url: string) {
    const body = <HTMLDivElement> document.body;
    const dtMainScript = jQuery('script[src*="dt-1.10.9/datatables.min.js"]').parent();    
    var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = url; 
    
    dtMainScript.append(link.outerHTML);
  }

}
