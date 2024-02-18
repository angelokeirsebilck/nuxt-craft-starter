export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig(event);
  const result = await $fetch(
    //@ts-expect-error
    config.public["graphql-client"].clients.craft.host,
    {
      method: "POST",
      body: {
        query: body.query,
        variables: body.variables,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.craft_cms_graphql_token}`,
      },
    }
  );

  return {
    result: result,
  };
});
