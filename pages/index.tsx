import Head from "next/head";
import { withUrqlClient, initUrqlClient, NextUrqlPageContext } from "next-urql";
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql";
import styles from "../styles/Home.module.css";
import { Repositories } from "../components";
import { LIST_REPOSITORIES } from "./queries";

function Home() {
  return (
    <>
      <Head>
        <title>Next.js + URQL Example App</title>
        <meta name="description" content="Next.js + URQL Example App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Repositories />
      </main>
    </>
  );
}

const token = "<your token here>";

export async function getServerSideProps(ctx: NextUrqlPageContext) {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://api.github.com/graphql",
      fetchOptions: {
        headers: {
          authorization: "Bearer " + token,
        },
      },
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  if (!client) {
    return;
  }

  await client.query(LIST_REPOSITORIES, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

export default withUrqlClient(() => ({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      authorization: "Bearer " + token,
    },
  },
}))(Home);
