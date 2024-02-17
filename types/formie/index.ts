import type { FormQueryQuery } from "#gql/craft";

export type FormieForm = NonNullable<FormQueryQuery["form"]>;

export type FormieCaptchas = NonNullable<
  NonNullable<NonNullable<FormQueryQuery["form"]>["captchas"]>[0]
>;

export type FormiePage = NonNullable<
  NonNullable<FormQueryQuery["form"]>["pages"]
>[0];

export type FormieField = NonNullable<
  NonNullable<
    NonNullable<NonNullable<NonNullable<FormiePage>["rows"]>[0]>["rowFields"]
  >
>[0];
