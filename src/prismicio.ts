import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field
 * is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "page",
    path: "/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  if (process.env.NODE_ENV === "development") {
    fetch("http://localhost:3000/revalidate", { method: "post" });
  }

  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: (url, init) => {
      return {
        cache: "force-cache",
        next: {
          ...init?.next,
          tags: [
            "prismic",
            /\/documents\/search\/?/.test(url)
              ? "prismic-query"
              : "prismic-repository",
            ...(init?.next?.tags || []),
          ],
        },
      };
    },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
