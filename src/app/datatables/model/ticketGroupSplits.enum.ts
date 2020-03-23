export enum TicketGroupSplits {
    NoSingles = 1,
    None = 2,
    Any = 3,
    Two = 4,
    Three = 5,
}

export const TicketGroupSplitsMap = new Map<number, string>([
    [TicketGroupSplits.NoSingles, 'No Singles'],
    [TicketGroupSplits.None, 'None'],
    [TicketGroupSplits.Any, 'Any'],
    [TicketGroupSplits.Two, 'Multiples of 2'],
    [TicketGroupSplits.Three, 'Multiples of 3']
]);
