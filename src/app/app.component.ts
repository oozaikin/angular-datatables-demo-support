import { Component } from '@angular/core';
declare let $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  mainDocHead : JQuery<any>;

  ngOnInit() {
    this.mainDocHead = jQuery('script[src*="dt-1.10.9/datatables.min.js"]').parent();
    // this.loadCss('../app/assets/dataTables.checkboxes.css');
    //  this.loadScript('../app/assets/dataTables.checkboxes_CUSTOM.js');
     this.loadCss('https://cdn.datatables.net/select/1.3.1/css/select.dataTables.css');
     this.loadCss('https://cdn.datatables.net/scroller/2.0.1/css/scroller.dataTables.css');
     //this.loadCss('https://cdn.datatables.net/rowgroup/1.1.1/css/rowGroup.dataTables.css');
     this.loadScript('https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js');
     this.loadScript('https://cdn.datatables.net/scroller/2.0.1/js/dataTables.scroller.js');
     //this.loadScript('https://cdn.datatables.net/rowgroup/1.1.1/js/dataTables.rowGroup.js');
     //this.mainDocHead.parent().parent()[0].location.reload() 
  }   

  public loadScript(url: string) {
    
    
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    //script.async = false;
    //script.defer = true;
    this.mainDocHead.append(script.outerHTML);
    
  }

  public loadCss(url: string) {    
      
    var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = url; 
    
    this.mainDocHead.append(link.outerHTML);
  }

}
