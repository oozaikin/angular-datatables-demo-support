export enum DeliveryType {
  None = 1,
  HardTickets = 10,
  LMS = 20,
  EDelivery = 30,
  FlashSeats = 40,
  MobileTransfer = 50,
  MobileQR = 60
}

export const DeliveryTypeMap = new Map<DeliveryType, string>([
  [DeliveryType.None, 'None'],
  [DeliveryType.HardTickets, 'Hard Tickets'],
  [DeliveryType.LMS, 'LMS'],
  [DeliveryType.EDelivery, 'E-Delivery'],
  [DeliveryType.FlashSeats, 'Flash Seats'],
  [DeliveryType.MobileTransfer, 'Mobile Transfer'],
  [DeliveryType.MobileQR, 'Mobile QR']]
);
