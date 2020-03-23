import * as moment from 'moment';
import { TicketGroup as TicketGroupApiContract } from '../apiContract/ticketGroup';
import { DeliveryTypeMap } from './deliveryType.enum';
import { TicketGroupSplitsMap } from './ticketGroupSplits.enum';
import { TicketGroupStatus, TicketGroupStatusMap } from './ticketGroupStatus.enum';

export default class TicketGroup {
public static Empty() {
    const ticketGroup = new TicketGroup();
    ticketGroup.ticketGroupID = 0;
    ticketGroup.stubhubEventId = 0;
    ticketGroup.cost = null;
    ticketGroup.price = null;
    ticketGroup.startSeat = '';
    ticketGroup.endSeat = '';
    ticketGroup.section = '';
    ticketGroup.row = '';
    ticketGroup.rowAlias = '';
    ticketGroup.internalNote = '';
    ticketGroup.externalNote = '';
    ticketGroup.inHandDate = '';
    ticketGroup.quantity = null;
    ticketGroup.productionID = 0;    
    ticketGroup.barcodesCount = 0;
    ticketGroup.documentsCount = 0;
    ticketGroup.isInstantDelivery = false;
    ticketGroup.pdf = '';
    ticketGroup.userShNetworks = '';
    ticketGroup.userShNetworksList = null;
    ticketGroup.deliveryTypeId = null;
    ticketGroup.seatsRange = '';
    ticketGroup.isConsignment = false;
    ticketGroup.stubhubListingId = 0;
    ticketGroup.stubhubAccountId = 0;
    ticketGroup.sbAccount = '';
    ticketGroup.invoice = '';
    ticketGroup.client = '';
    ticketGroup.face = null;
    ticketGroup.statusTypeId = 0;
    ticketGroup.maskSeats = false;
    ticketGroup.isConsecutiveSeating = false;
    ticketGroup.disclosureNames = '';    
    ticketGroup.status = '';   
    ticketGroup.deliveryType = '';   
      ticketGroup.splitsTypeId = 0;
      ticketGroup.splits = '';  
      //ticketGroup.disclosures = [];



    return ticketGroup;
  }
  
public static fromApi(apiContract: TicketGroupApiContract) {
    const ticketGroup = new TicketGroup();
    ticketGroup.ticketGroupID = apiContract.TicketGroupID;
    ticketGroup.stubhubEventId = apiContract.StubhubEventId;
    ticketGroup.cost = apiContract.Cost;
    ticketGroup.price = apiContract.MarketPrice ?
      apiContract.MarketPrice :
      apiContract.Price;
    ticketGroup.startSeat = apiContract.StartSeat;
    ticketGroup.endSeat = apiContract.EndSeat;
    ticketGroup.section = apiContract.Section;
    ticketGroup.row = apiContract.Row;
    ticketGroup.rowAlias = apiContract.RowAlias;
    ticketGroup.internalNote = apiContract.InternalNote;
    ticketGroup.externalNote = apiContract.ExternalNote;
    ticketGroup.inHandDate = apiContract.InhandDate ?
      moment(apiContract.InhandDate).format('L') : null;
    ticketGroup.quantity = apiContract.Quantity;
    ticketGroup.productionID = apiContract.ProductionID;
    ticketGroup.blockId = apiContract.BlockID;
    ticketGroup.barcodesCount = apiContract.BarcodesCount;
    ticketGroup.documentsCount = apiContract.DocumentsCount;
    ticketGroup.isInstantDelivery = apiContract.IsInstantDelivery;
    ticketGroup.pdf = apiContract.Pdf;
    ticketGroup.userShNetworks = apiContract.UserShNetworks;
    ticketGroup.userShNetworksList = apiContract.UserShNetworksList;
    ticketGroup.deliveryTypeId = apiContract.DeliveryTypeId;
    ticketGroup.seatsRange = `${ticketGroup.startSeat}-${ticketGroup.endSeat}`;
    ticketGroup.isConsignment = apiContract.IsConsignment;
    ticketGroup.stubhubListingId = apiContract.StubhubListingId;
    ticketGroup.stubhubAccountId = apiContract.StubhubAccountId;
    ticketGroup.sbAccount = apiContract.SBAccount;
    ticketGroup.invoice = apiContract.Invoice;
    ticketGroup.client = apiContract.Client;
    ticketGroup.face = apiContract.AverageTicketFace;
    ticketGroup.statusTypeId = apiContract.StatusTypeId;
    ticketGroup.maskSeats = apiContract.MaskSeat;
    ticketGroup.isConsecutiveSeating = apiContract.IsConsecutiveSeating;
    ticketGroup.disclosureNames = !!apiContract.Disclosures ? apiContract.Disclosures.map(y => y.DisclosureName).join(',') : '';
    if (apiContract.StatusTypeId) {
      ticketGroup.status = TicketGroupStatusMap.get(apiContract.StatusTypeId);
    }

    if (apiContract.DeliveryTypeId) {
      ticketGroup.deliveryType = DeliveryTypeMap.get(apiContract.DeliveryTypeId);
    }

    if (apiContract.Splits) {
      ticketGroup.splitsTypeId = apiContract.Splits;
      ticketGroup.splits = TicketGroupSplitsMap.get(apiContract.Splits);
    }   


    return ticketGroup;
  }
  public ticketGroupID: number;
  public stubhubEventId: number | null;
  public cost: number;
  public price: number;
  public newPrice: number;
  public startSeat: string;
  public endSeat: string;
  public section: string;
  public row: string;
  public rowAlias: string;
  public inHandDate: string;
  public internalNote: string;
  public externalNote: string;
  public quantity: number;
  public productionID: number | null;
  public pdf: string;
  public barcodesCount: number;
  public documentsCount: number;
  public deliveryType: string | null;
  public deliveryTypeId: number | null;
  public isInstantDelivery: boolean;
  public sortRank: number | null;
  public status: string | null;
  public statusTypeId: number | null;
  public splits: string | null;
  public splitsTypeId: number | null;
  public isConsignment: boolean;
  public stubhubListingId: number;
  public stubhubAccountId: number;
  public sbAccount: string;
  public invoice: string;
  public client: string;
  public face: number;
  public maskSeats: boolean;

  public splitVector: number[];
  public seatsRange: string;
  public isSectionFound: boolean;
  public isRowFound: boolean;
  public mktLess: number;
  public mktGreater: number;
  public isConsecutiveSeating: boolean;
 // public disclosures: DisclosureModel[];
  public disclosureNames: string;
  public blockId: number;
  public userShNetworks: string;
  public userShNetworksList: number[]; 

  public get isPdf(): boolean {
    return this.documentsCount === this.quantity;
  }

  public get isBC(): boolean {
    return this.barcodesCount === this.quantity;
  }
  public get isSold(): boolean {
    return true;
  }

  public get seats(): string {
    return `${this.startSeat} - ${this.endSeat}`;
  }
  public set seats(value: string) {}

}

