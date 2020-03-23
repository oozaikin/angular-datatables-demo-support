
import * as moment from 'moment';
import TicketGroup from './ticketGroup';
import { TicketGroupWithEvent as TicketGroupWithEventApiContract } from '../apiContract/ticketGroupWithEvent';

export class TicketGroupWithEvent extends TicketGroup {

   public static fromApi(apiContract: TicketGroupWithEventApiContract) {
        const ticketGroup = <TicketGroupWithEvent>TicketGroup.fromApi(apiContract);
        ticketGroup.eventName = apiContract.EventName;
        ticketGroup.eventDateTime = moment(apiContract.EventDateTime);
        ticketGroup.venueName = apiContract.VenueName;
        ticketGroup.primaryEventName = apiContract.PrimaryEventName;
        ticketGroup.secondaryEventName = apiContract.SecondaryEventName;
        ticketGroup.prodID = apiContract.ProductionID != null? apiContract.ProductionID: -2;
        ticketGroup.companyName = apiContract.CompanyName;
        ticketGroup.isSelected = false;
        return ticketGroup;
      }
      public static Empty() {
        const ticketGroup = <TicketGroupWithEvent>TicketGroup.Empty();
        ticketGroup.eventName = '';
        ticketGroup.eventDateTime = null;
        ticketGroup.venueName = '';
        ticketGroup.primaryEventName = '';
        ticketGroup.secondaryEventName = '';
        ticketGroup.prodID = -1;
        ticketGroup.isSelected = false;
        ticketGroup.companyName = '';
        return ticketGroup;
      }
      eventName: string;
      eventDateTime: moment.Moment;
      venueName: string;
      primaryEventName: string;
      secondaryEventName: string;
      prodID: number;
      isSelected: boolean;
      companyName: string;
}
