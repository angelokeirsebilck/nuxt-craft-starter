import type {
  EntryQuery,
  FooterNavQuery,
  GlobalCompanyInfoQuery,
  GlobalGeneralQuery,
  HomeFragment,
  JobsFragment,
  LegalPagesDefaultFragment,
  LinkFragment,
  MainNavQuery,
  NewsFragment,
  NewsPagesDefaultFragment,
  PagesDefaultFragment,
} from "#gql/craft";

export type RemoveEmptyObjectUnions<T> = T extends T // distribute over union types
  ? keyof T extends never // are there no keys (i.e. {})?
    ? never // then: remove from result union
    : {
        // else: recursively apply to all properties
        [P in keyof T]: RemoveEmptyObjectUnions<T[P]>;
      }
  : never; // (the else case for the first extends which is just for distributing)

export type Entry = RemoveEmptyObjectUnions<EntryQuery["entry"]>;

export type ContentBuilder = Entry["fieldContentBuilder"];

export type TextBlock = Extract<
  ContentBuilder[0],
  { __typename: "fieldContentBuilder_typeText_BlockType" }
>;

export type DefaultBlock = Extract<
  ContentBuilder[0],
  { __typename: "fieldContentBuilder_typeDefault_BlockType" }
>;

export type NewsOverviewBlock = Extract<
  ContentBuilder[0],
  { __typename: "fieldContentBuilder_typeNewsOverview_BlockType" }
>;

export type CtaBlock = Extract<
  ContentBuilder[0],
  { __typename: "fieldContentBuilder_typeCta_BlockType" }
>;

export type Home = RemoveEmptyObjectUnions<
  Extract<HomeFragment, { __typename: "home_home_Entry" }>
>;

export type News = RemoveEmptyObjectUnions<
  Extract<NewsFragment, { __typename: "news_news_Entry" }>
>;

export type Jobs = RemoveEmptyObjectUnions<
  Extract<JobsFragment, { __typename: "jobs_jobs_Entry" }>
>;

export type PagesDefault = RemoveEmptyObjectUnions<
  Extract<PagesDefaultFragment, { __typename: "pages_default_Entry" }>
>;

export type NewsPagesDefault = RemoveEmptyObjectUnions<
  Extract<NewsPagesDefaultFragment, { __typename: "newsPages_default_Entry" }>
>;

export type LegalPagesDefault = RemoveEmptyObjectUnions<
  Extract<LegalPagesDefaultFragment, { __typename: "legalPages_default_Entry" }>
>;

export type CraftLink = RemoveEmptyObjectUnions<LinkFragment>;

export type GlobalGeneral = NonNullable<
  RemoveEmptyObjectUnions<GlobalGeneralQuery>["globalGeneralEntries"]
>[0];

export type CompanyInfo = NonNullable<
  RemoveEmptyObjectUnions<GlobalCompanyInfoQuery>["globalCompanyInfoEntries"]
>[0];

export type CraftMedia = Extract<
  DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
  {
    __typename: "itemColumn_typeMedia_BlockType";
  }
>["itemMedia"][0];

export type CraftImage = Extract<CraftMedia, { __typename: "images_Asset" }>;
export type CraftVideo = Extract<CraftMedia, { __typename: "videos_Asset" }>;

export type CraftLinkWrapper = TextBlock["itemColumns"][0]["itemLinks"][0];

export type MainNav = NonNullable<MainNavQuery["navigationNodes"]>;
export type FooterNav = NonNullable<FooterNavQuery["navigationNodes"]>;

export type Localized = {
  language: string;
  siteId: number;
  uri: string;
};
