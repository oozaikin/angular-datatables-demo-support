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
    
    // this.loadCss('../app/assets/dataTables.checkboxes.css');
    //  this.loadScript('../app/assets/dataTables.checkboxes_CUSTOM.js');
     this.loadCss('https://cdn.datatables.net/select/1.3.1/css/select.dataTables.css');
     this.loadCss('https://cdn.datatables.net/scroller/2.0.1/css/scroller.dataTables.css');
     this.loadCss('https://cdn.datatables.net/rowgroup/1.1.1/css/rowGroup.dataTables.css');
     this.loadScript('https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js');
     this.loadScript('https://cdn.datatables.net/scroller/2.0.1/js/dataTables.scroller.js');
     this.loadScript('https://cdn.datatables.net/rowgroup/1.1.1/js/dataTables.rowGroup.js');
  }  

  public loadScript(url: string) {
    
    const dtMainScript = jQuery('script[src*="dt-1.10.9/datatables.min.js"]').parent();
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    //script.async = false;
    //script.defer = true;
    dtMainScript.append(script.outerHTML);
  }

  public loadCss(url: string) {
    
    const dtMainScript = jQuery('script[src*="dt-1.10.9/datatables.min.js"]').parent();    
    var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = url; 
    
    dtMainScript.append(link.outerHTML);
  }

}
