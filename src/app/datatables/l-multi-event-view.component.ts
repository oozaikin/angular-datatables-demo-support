import {
  Component,
  OnInit,  
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter, 
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Injector,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { takeUntil, distinctUntilChanged, last, groupBy } from 'rxjs/operators';
import * as moment from 'moment';
import inventoriesData from './data/inventories.json'
//import jQuery from 'jquery' 

import { TicketGroupWithEvent } from './model/ticketGroupWithEvent';
import { TicketGroupWithEvent as TicketGroupWithEventApiContract } from './apiContract/ticketGroupWithEvent';
import { TicketGroup } from './model/ticketGroup';

import { CurrencyPipe } from '@angular/common';

// import 'datatables.net';
// import 'datatables.net-bs4';


@Component({
  selector: 'l-multi-event-view',
  templateUrl: 'l-multi-event-view.component.html',  
  styleUrls: ['l-multi-event-view.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class LMultiEventViewComponent implements OnInit, AfterViewInit {
  @Output() public loadData: EventEmitter<string[]> = new EventEmitter();
  
 
  @ViewChild('gridContainer') gridContainer: ElementRef;  
 

  public inventories: TicketGroupWithEvent[]; 
  public isBroadcastTooltipVisible: boolean;
  public broadcastTooltipTarget: string;
  public networkList: number[] = []; 
  public deliveryTypeError: boolean;
  public multipleEdit: boolean;
 
  
  public dtOptions: any = {};
  dataTable: JQuery<any>;
  dataTableApi:DataTables.Api;
  //directive: DataTableDirective;   
  //private filters: OperationsSearchFilters; 
  private currencyPipe = new CurrencyPipe('en-us');    
  private _isInitialKeyPressed: boolean; 
  private MAX_VENUE_NAME_WIDTH = 42; 
  private MAX_EVENT_NAME_WIDTH = 58; 
  private startLoadingTime: number; 
  private groupingRowNodeTopOffsets: number[] = []; 
  private pinnedRowsHtmlElements: string[] = [];   
  private STICKY_HEADER_SCROLL_ROW_BUFFER = 300;
  private GROUPING_ROW_HEIGHT = 10;
  
  private _isOtherTabSelected: boolean;  
  private _firstGroupingRowId: string;
  private _gridTopPosition: number;
  private _gridWidth: number;
  private GRID_HEADER_HEIGHT = 140;
  private _headerBottomPosition = 0;  
  


  getFormattedDate(date: moment.Moment): string {
    if (!date) { return ''; }

      const eventDate = date.toDate();
      if (eventDate.getMinutes() === 0 && eventDate.getHours() === 0) {
        return date.format('L');
      }

      return date ? date.format('L ddd LT') : '';
  }  

  getConvertedStringLengthtoCellWidth(str: string, fontSize: string){  
    // If name is more than 30 chars we want only width for MAX 30 to be calculated
    if(str.length > this.MAX_VENUE_NAME_WIDTH) str = str.substring(0,this.MAX_VENUE_NAME_WIDTH);  
    const divConverter = jQuery('#stringLengthToWidthConverter');
    divConverter.html(str);
    divConverter.css('fontSize',fontSize);   
    return (divConverter[0].clientWidth * 1.5);
  }  

 
  

 isTextSelected(input){
   const startPos = input.selectionStart;
   const endPos = input.selectionEnd;
   const doc = (<any>document).selection;

   if(doc && doc.createRange().text.length !== 0){
      return true;
   }else if (!doc && input.value.substring(startPos,endPos).length !== 0){
      return true;
   }
   return false;
 }

reloadData(){  
  const reloadStarts = new Date().getTime(); 
  
  this.groupingRowNodeTopOffsets.splice(0);
  this.pinnedRowsHtmlElements.splice(0);  
  this.dataTableApi.data().clear();
        // workaround - row with 0 index is failed to render correctly, so adding dummy row and hiding it
  this.dataTableApi.rows.add([TicketGroupWithEvent.Empty()]);
  this.dataTableApi.rows.add(this.inventories);  
  this.dataTableApi.rows().draw(false);
  // Adding empty last row
  jQuery('table#dataTable tbody').append(`<tr style='pointer-events: none;'><td colspan='16' class='lastCell100' style='height:28px'></td></tr>`);
  (<any>this.dataTableApi.rows()).deselect();   
  // setTimeout(()=> {
  //   this.dataTableApi.columns.adjust();
  //   (<any>this.dataTableApi).scroller.measure();}, 100 );

  
  console.log(`Total Reloading Time: ${new Date().getTime() - reloadStarts} Ms`);

}
recalculateGridWidth(){
  this._gridWidth = jQuery(window).width() - (jQuery('.as-split-gutter').length > 0? jQuery('.as-split-gutter').position().left + 5: 0) - 28;
}

public ngOnInit() {       
    
    this.dataTable = jQuery('#dataTable');  
   
    
    

 // Only numbers are allowed in pricing field
    // TODO Should use MASK in editor config instead
    this.dataTable.on( 'keypress', 'tbody td#priceCell', (e,d) => {          
        const char = String.fromCharCode(e.keyCode);
        if (isNaN(parseInt(char, 10)) && char !== '.') {
            e.preventDefault();
        }
        if(char === '.' && (this.isTextSelected(jQuery(e.target)[0]) || (<any>jQuery(e.target).val()).length === 0)) {
          jQuery(e.target).val('0.');
          e.preventDefault();
          e.stopPropagation();          
        }
    });
    
    this.dataTable.on( 'keydown', 'tbody td.editable', (e,d) => { 
      // TAB /Down/Up Arrow pressed
      if(e.keyCode === 9 || e.keyCode === 40 || e.keyCode === 38){     
        e.preventDefault();
        e.stopPropagation();        
        // Find the cell that is currently being edited
        const cell = jQuery('div.DTE').parent();
        const cellIndex = cell.index();
         (<any>this.dataTableApi).keys.enable();
        // Down to the next row
        let nextCell;
        if(e.shiftKey && e.keyCode === 9 || e.keyCode === 38){
          nextCell = cell.parent().prevAll('.odd,.even:first').children().eq(cellIndex);
        } else{
          nextCell = cell.parent().nextAll('.odd,.even:first').children().eq(cellIndex);
        }       
        nextCell.children().trigger('click','tab_down');        
      }

    } );

      // Catching return key down to set the _isInitialKeyPressed to true before editor got enabled
    jQuery(document).on( 'keydown', (e) => {
        if(e.keyCode === 13){     
           this._isInitialKeyPressed = true;   
        }
    });

    // If key pressed inside the input field - keeping it (fixed issue where focus getting back to Focused Table Cell)
     jQuery(document).on( 'keydown','input', (e) => {
        e.stopPropagation();                       
     });      

      
   
    // In Case TicketGroup is Cancelled or Expired a respective cell is NOT editable
   

     // Handle click event on group checkbox
    this.dataTable.on('click', '.group-checkbox', (e)=>{
      // Get group class name
      const groupName = jQuery(e.target).data('group-name');      
      // Select all child rows
      (<any>this.dataTableApi.cells(`tr.${groupName}`, 0)).checkboxes.select(e.target.checked);
    }); 

  
  

   // TODO Loading Overlay when table resizing
   // Custom resizing functionality the default Datatables one was disabled due to performance issues
    jQuery(window).on('resize.DT-dataTable', (e) => {
      if(!this._isOtherTabSelected) {
        this._gridTopPosition = jQuery('.grid-container').position().top + this.GRID_HEADER_HEIGHT;
        this.recalculateGridWidth();
        jQuery('.dataTables_scrollBody').css('max-height',jQuery(document).height() - this._gridTopPosition);       
      }else{
        e.stopPropagation();
        e.preventDefault();        
      }
    });     

  
    this.dtOptions = {
      data: this.inventories,
      paging: true,      
      pageLength: 60,
      deferRender: false,
      scroller: {
        displayBuffer: 20,
        boundaryScale: 0.2
      },
      scrollY: '66vh',
      scrollCollapse: true,
      scrollX: false,      
      rowId: 'ticketGroupID',
      order: [[1, 'asc']],     
      info: false,
      searching: false,
      processing: true,
      responsive: false,
      ordering: false,
      language: {'emptyTable': 'No results found' },     
      fixedColumns: false,          
      select: {
            style:'os'
      },
      rowCallback: ( row, data, index ) => {
        // workaround for empty/corrupted rows
        if (data.prodID === -1) {           
            jQuery(row).hide();
         }       

      },
      drawCallback: ( settings ) =>{
        // This is private property for Datatables resize functionality
        // Disabling Recalculation column size after resizing
        // We do this because we are using our custom resize method: jQuery(window).on('resize.DT-dataTable'
        // Improving performance when resizing happened, also fixed column alignment issue when switching between app tabs
        settings._reszEvt = true;
      },
      rowGroup: {

            startRender: ( rows, group)=> {
              const dt = rows.data()[0] as TicketGroupWithEvent;
              if(dt.prodID < 0) return;

              const groupName = 'group-' + group;
              const rowNodes = rows.nodes();
              rowNodes.tojQuery().addClass(groupName);               
              const eventNameWidth = 385;
              const venueNameWidth = 290;
              // dt.primaryEventName = 'Vsnderbtlt Commodores Basketball ';
              // dt.secondaryEventName = 'South Carolina Gamecock';
               //dt.venueName = 'NYCB Live Home Of The Nassau Veterans Memorial Coliseum';
              // dt.eventDateTime = moment(Date.now());
              //const eventName = 'NYCB Live Home Of The Nassau Veterans Memorial Coliseum test test test';
              const eventName = `${dt.primaryEventName} ${dt.secondaryEventName ? '/' + dt.secondaryEventName: ''}`;
              
              const groupingRow = `<div class="groupingTable" id=${groupName}>
                        <div id='checkboxDiv' style='width:50px;text-align: left;padding-left:18px;margin: 2px 0px 2px 0px'><input type="checkbox" class="group-checkbox" data-group-name="${groupName}"></div>
                        <div class="groupingCell truncate" style='width:${eventNameWidth}px'>
                        <span class="tooltiptext">${eventName}</span>
                        ${eventName}</div>
                        <span class="groupingCell venueName truncate" style='width:${venueNameWidth}px'>
                          <span class="tooltiptext">${dt.venueName}</span>
                          ${dt.venueName}
                        </span>
                        <div class="groupingCell">${this.getFormattedDate(dt.eventDateTime)}</div>                        
                      </div>`;            

              return jQuery('<tr/>')
                    .append( `<td colspan="16" class='stickyHeader'>${groupingRow}</td>` );


            },
            dataSrc: 'prodID'
      },
      keys:{
                columns: ':not(:first-child)',
        
        
      },
      columnDefs: [ 
          {
            orderable: false,
            width: '10px',
            checkboxes: {
              selectRow: true
            },
            targets:0
          }
      ],      
      columns: [
      { 
        data: 'prodID',
        defaultContent:'',
        title: '',
        searchable: false,
        orderable: false,

      },
      {
         title: 'Prod ID',
         data: 'prodID',
         visible: false
      },     
       {
        title: 'Team/Performer',
        data: 'primaryEventName',
        visible: false
      }, {
        title: 'Opponent/Performer 2',
        data: 'secondaryEventName',
        visible: false       
      }, {
        title: 'Venue',
        data: 'venueName',
        visible: false
      },
       {
        title: 'Event Date',
        data: 'eventDateTime',
        visible: false
      },
      {
        title: 'Company',
        data: 'companyName',  
        width:'150px',     
        'createdCell':  (td, cellData, rowData: TicketGroupWithEvent, row, col) => {
          jQuery(td).attr('style','min-width:150px');
        }
      },
      { data: 'userShNetworks', 
        title: 'Exc',
        width: '5px',
        orderable: false,
        // 'createdCell':  (td, cellData, rowData: TicketGroupWithEvent, row, col) => {
        //     jQuery(td).html(this.getBroadcastComCompiled(rowData));
        //     jQuery(td).mouseover((event) =>{
        //         this.toggleBroadcastTooltip(rowData.ticketGroupID, true);
        //     });
        //     jQuery(td).mouseout((event) =>{
        //         this.toggleBroadcastTooltip(rowData.ticketGroupID, false);
        //     });
        //     jQuery(td).on('click', (event) =>{
        //         this.showBroadcastPopup(rowData.ticketGroupID);
        //     });
        //     } 
      },
      { data: 'deliveryTypeId',
        title: '', 
        width: '5px',
        // 'createdCell':  (td, cellData, rowData, row, col) => {
        //     const deliveryType: DeliveryType = cellData;
        //     jQuery(td).html(this.getDeliveryIconComCompiled(cellData));
        // }
      },
      { data: 'status', 
        title: '',
        width: '5px',
        maxwidth: '10px',
        // 'createdCell':  (td, cellData, rowData, row, col) => {
        //     const statusType = cellData;
        //     jQuery(td).html(`<div class="icon">
        //                       ${this.getStatusIconComCompiled(cellData)}
        //                 </div>`
        //               );

        // }   
      },
      { data: 'isPdf',
        title: 'PDF',
        width: '10px',
        orderable: false,
        autoWidth:false,
        // 'createdCell':  (td, cellData, rowData: TicketGroupWithEvent, row, col) => {                
        //     jQuery(td).html(this.getPDF_BCIconComCompiled(rowData, true));
        // } 
      },
      { data: 'isBC', 
        title: 'BC',
        width: '10px',
        // 'createdCell':  (td, cellData, rowData, row, col) => {
        //     jQuery(td).html(this.getPDF_BCIconComCompiled(rowData, false));
        // } 
      },
      { data: 'section', 
        title: 'Section',
        width: '15px',              
      },
      { data: 'row', 
        title: 'Row',
        width: '10px',
         'createdCell':  (td, cellData, rowData: TicketGroupWithEvent, row, col) => {
            jQuery(td).html(`<div class='flex-container'>
                          <div class='text'>${cellData}</div>                         
                        </div>`);
        }
      },
      { data: 'quantity', 
        title: 'Quantity',
        width: '10px' 
      },
      { data: 'seats', 
        title: 'Seats',
        width: '25px',
        // 'createdCell':  (td, cellData, rowData, row, col) => {
        //     jQuery(td).html('111-222');
        // } 
      },     
      
      { data: 'price',
        title: 'Market', 
        width: '15px',            
            'createdCell':  (td, cellData, rowData:TicketGroupWithEvent, row, col) => {                
                if(cellData != null){
                  jQuery(td).html(`<div>` + this.currencyPipe.transform(cellData) + `</div>`);
                }
                // In Case TicketGroup is Cancelled or Expired a respective cell is NOT editable
               
                  jQuery(td).addClass('editable');      
                
              
            }      
      },
      { data: 'cost', 
        title: 'Cost',
        width: '15px',
        'createdCell':  (td, cellData, rowData, row, col) => {
            jQuery(td).html(this.currencyPipe.transform(cellData));
        }  
      },
      { data: 'face', 
        title: 'Face',
        width: '15px',
        'createdCell':  (td, cellData, rowData, row, col) => {
            jQuery(td).html(this.currencyPipe.transform(cellData));
        } 
      },
      { data: 'maskSeats', 
        title: 'MS',
        width: '10px',
        // 'createdCell':  (td, cellData, rowData, row, col) => {
        //     jQuery(td).html(this.getCheckboxIconComCompiled(cellData));
        // } 
      },
      {data: null,
        defaultContent: '',
        title: '',
        searchable: false,
        orderable: false,
        'createdCell':  (td, cellData, rowData, row, col) => {
                jQuery(td).addClass('lastCell100'); 
          }   
      }
      ],

    };
    // disabling popup Error. And redirect messages to console
    // $.fn.dataTable.ext.errMode = 'none';
    // this.dataTable.on('error.dt', function(e, settings, techNote, message) {
    //     console.error( 'An error has been reported by DataTables: ', message);
    // });
    

    this.dataTableApi = this.dataTable.DataTable(this.dtOptions);   
   
    this.dataTableApi.on( 'preDraw',  ()=> {
        this.startLoadingTime = new Date().getTime();        
    } )
    .on( 'draw.dt',  ()=> {
       jQuery('#overlayLoading').hide();               
        console.log( `Redraw took at: ${new Date().getTime()-this.startLoadingTime} mS for ${this.dataTableApi.rows().count()} Rows` );
    } );    

    this.inventories =(Array.from(inventoriesData, (el)=> TicketGroupWithEvent.fromApi(el)));
    this.reloadData();  
    

  }  

 
  ngAfterViewInit(){   
    this.recalculateGridWidth();     }
  
 

 
  
  public toggleBroadcastTooltip(ticketGroupId: number, show: boolean) {
    this.broadcastTooltipTarget = `#broadcast-${ticketGroupId}`;
    this.isBroadcastTooltipVisible = show;
    this.networkList = this.inventories.find(tg => tg.ticketGroupID === ticketGroupId).userShNetworksList;
    if(!!!this.networkList) {
      this.networkList = [];
    }
  }

  public isNetworkSelected(networkType): boolean {
    return this.networkList.indexOf(networkType) > -1;
  }
 
   
 
}
