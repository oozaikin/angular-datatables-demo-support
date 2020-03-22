
import * as moment from 'moment';
import TicketGroup from './ticketGroup';

export class TicketGroupWithEvent extends TicketGroup {

   
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
