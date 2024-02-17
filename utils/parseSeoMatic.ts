import { pipe, filter, values, flatten, toPairs } from "ramda";
//@ts-expect-error
const filterEmptyValues = (item) => item?.length !== 0;

const flattenValues = pipe(values, filter(filterEmptyValues), flatten);

//@ts-expect-error
export default function parseSEO(seo) {
  const parsed = toPairs(seo).reduce(
    //@ts-expect-error
    (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }),
    {}
  );

  const {
    metaTitleContainer,
    metaTagContainer,
    metaLinkContainer,
    metaJsonLdContainer,
  } = parsed;

  const meta = flattenValues(metaTagContainer);
  const links = flattenValues(metaLinkContainer);
  const jsonLd = flattenValues(metaJsonLdContainer);

  return {
    title: metaTitleContainer?.title?.title,
    meta,
    links,
    jsonLd,
  };
}
