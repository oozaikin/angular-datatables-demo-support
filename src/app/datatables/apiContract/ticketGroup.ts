import { TicketGroupBlock } from './ticketGroupBlock';
import { TicketGroup as TicketGroupViewModel } from '../../viewModels';
import { Disclosure } from '../buyIn/ticketGroup/disclosure';

export class TicketGroup {
  public TicketGroupID: number;
  public StubhubEventId: number | null;
  public Cost: number;
  public Price: number;
  public MarketPrice: number | null;
  public StartSeat: string;
  public EndSeat: string;
  public Section: string;
  public Row: string;
  public RowAlias: string;
  public InhandDate: Date | null;
  public InternalNote: string;
  public ExternalNote: string;
  public Quantity: number;
  public ProductionID: number | null;
  public Pdf: string;
  public UserShNetworks: string;
  public UserShNetworksList: number[];
  public BarcodesCount: number;
  public DocumentsCount: number;
  public DeliveryTypeId: number | null;
  public IsInstantDelivery: boolean;
  public SortRank: number | null;
  public Block: TicketGroupBlock | null;
  public StatusTypeId: number | null;
  public Splits: number | null;
  public IsConsignment: boolean;
  public StubhubListingId: number;
  public StubhubAccountId: number;
  public SBAccount: string;
  public Invoice: string;
  public Client: string;
  public AverageTicketFace: number;
  public MaskSeat: boolean;
  public IsConsecutiveSeating: boolean;
  public Disclosures: Disclosure[];
  public BlockID?: number;

}

export class TicketGroupPriceModel {
  public static fromView(viewModel: TicketGroupViewModel) {
    const ticketGroup = new TicketGroupPriceModel();
    ticketGroup.TicketGroupID = viewModel.ticketGroupID;
    ticketGroup.MarketPrice = viewModel.price;
    ticketGroup.ProductionID = viewModel.productionID;
    return ticketGroup;
  }

  public TicketGroupID: number;
  public MarketPrice: number;
  public ProductionID: number;
}

export class TicketGroupNetworkTypesModel {
  public TicketGroupIDs: number[];
  public Shared: number;
  public Mask: number;
  public UpdateBlocks: TicketGroupBlock[];
  public ProductionID: number;
}

export class TicketGroupSplitsModel {
  public BlockID: number;
  public ProductionID: number;
  public SplitOption: number[];
}
