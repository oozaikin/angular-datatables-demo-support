export enum TicketGroupStatus {
    Available = 1,
    Expired = 2,
    Sold = 3,
    Hold = 4,
    Merged = 5,
    OutOnConsignment = 6,
    ReturnConsignment = 7,
    Canceled = 8,
    ReconciledConsignment = 9,
    PreOrder = 10,
    PreOrderFilled = 11
}

export const TicketGroupStatusMap = new Map<number, string>([
    [TicketGroupStatus.Available, 'Available'],
    [TicketGroupStatus.Expired, 'Expired'],
    [TicketGroupStatus.Sold, 'Sold'],
    [TicketGroupStatus.Hold, 'Hold'],
    [TicketGroupStatus.Merged, 'Merged'],
    [TicketGroupStatus.OutOnConsignment, 'OutOnConsignment'],
    [TicketGroupStatus.ReturnConsignment, 'ReturnConsignment'],
    [TicketGroupStatus.Canceled, 'Canceled'],
    [TicketGroupStatus.ReconciledConsignment, 'ReconciledConsignment'],
    [TicketGroupStatus.PreOrder, 'PreOrder'],
    [TicketGroupStatus.PreOrderFilled, 'PreOrderFilled'],
]);
