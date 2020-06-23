export interface SpoilerLog{
    Version: string;
    FileHash: string[];
    Seed: string;
    SettingsString: string;
    Notes: string;

}

export interface OoTSpoilerLog extends SpoilerLog {
    Settings: Settings;
    RandomizedSettings: RandomizedSettings;
    FreeItem: Item;
    GoldSkulltulaCount : CollectionCounter;
    Locations: Location[];
    Zones: Zone[];
    MainItems: Item[];
    Equipment: Item[];
    Songs: Item[];
    DungeonRewards: Item[];
}
export class Location
{
    public ID: string;
    public Name: string;
    public ItemAtLocation: Item;
    public Revealed: boolean;
    public ZoneID: number;
    public DefaultItemAtLocationName: string;

    
}
export interface Item
{
    Name: string;
    Order: number;
    ImageURL: string;
    Price: number;
    Model: string;
    Upgrades: Upgrade[];
    HasMultipleLocations: boolean;
    Revealed: boolean;
    LocationNames: ItemLocation[];
    ItemType: ItemType;
}
export interface Upgrade
{
    ID: number;
    UpgradeText: string;
    ImageURL: string;
    Revealed: boolean;
}
export interface ItemLocation
{
    ID: string;
    ItemText: string;
}

export interface CollectionCounter 
{
    Label: string;
    Count: number;
}
 
export class Zone
{
    public ID: number = 0;
    public Name: string = "";
    public OrderID: number = 0;
    public Locations: Location[] = null;
}

export enum ItemType {
    Generic = 0,
    MainItem = 1,
    Equipment = 2,
    Song = 3,
    SpiritualStone = 4,
    Medallion = 5
}
export interface RandomizedSettings
{
    StartingAge: string;

    TriforceHunt: boolean;

    TriforceGoalPerWorld: number;

    EntranceShuffle: string;

    BombchusInLogic: boolean;

    OneItemPerDungeon: boolean;

    OpenForest: string;

    OpenDoorOfTime: boolean;

    ZoraFountain: string;

    GerudoFortress: string;

    Bridge: string;

    BridgeTokens: number;

    TrialsRandom: boolean;

    Trials: number;

    Shopsanity: string;

    Tokensanity: string;

    ShuffleScrubs: string;

    ShuffleCows: boolean;

    ShuffleSongItems: boolean;

    ShuffleKokiriSword: boolean;

    ShuffleOcarinas: boolean;

    ShuffleWeirdEgg: boolean;

    ShuffleGerudoCard: boolean;

    ShuffleBeans: boolean;

    ShuffleMapcompass: string;

    ShuffleSmallkeys: string;

    ShuffleBosskeys: string;

    ShuffleGanonBosskey: string;

    EnhanceMapCompass: boolean;
}
export interface Settings
{
    WorldCount: number;

    CreateSpoiler: boolean;

    RandomizeSettings: boolean;

    LogicRules: string;

    AllReachable: boolean;

    NoEscapeSequence: boolean;

    NoGuardStealth: boolean;

    NoEponaRace: boolean;

    NoFirstDampeRace: boolean;

    UsefulCutscenes: boolean;

    FastChests: boolean;

    LogicNoNightTokensWithoutSunsSong: boolean;

    FreeScarecrow: boolean;

    StartWithRupees: boolean;

    StartWithConsumables: boolean;

    StartingHearts: number;

    ChickenCountRandom: boolean;

    ChickenCount: number;

    BigPoeCountRandom: boolean;

    BigPoeCount: number;

    MqDungeonsRandom: boolean;

    MqDungeons: number;

    DisabledLocations: any[];

    AllowedTricks: any[];

    LogicEarliestAdultTrade: string;

    LogicLatestAdultTrade: string;

    LogicLens: string;

    StartingEquipment: any[];

    StartingItems: any[];

    StartingSongs: any[];

    OcarinaSongs: boolean;

    CorrectChestSizes: boolean;

    ClearerHints: boolean;

    Hints: string;

    HintDist: string;

    TextShuffle: string;

    IceTrapAppearance: string;

    JunkIceTraps: string;

    ItemPoolValue: string;

    DamageMultiplier: string;

    StartingTod: string;
}