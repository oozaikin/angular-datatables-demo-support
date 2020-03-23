


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
  public Block: null;
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
  public Disclosures: null;
  public BlockID?: number;

}


