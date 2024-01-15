
import { Client } from "cassandra-driver";
import path from "path";

declare global {
  var cassandraClient: Client | undefined;
}

const cassandraDb = globalThis.cassandraClient || createCassandraClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.cassandraClient = cassandraDb;
}

export default cassandraDb;

function createCassandraClient(): Client {
  const secureConnectBundlePath = path.join(__dirname, 'secure-connect.zip');

  const newClient = new Client({
    cloud: {
      // secureConnectBundle: './secure-connect.zip'
      secureConnectBundle: secureConnectBundlePath

    },
    credentials: {
      username: process.env.CASSANDRA_CLIENT_ID!,
      password: process.env.CASSANDRA_CLIENT_SECRET!
    },
    keyspace: process.env.CASSANDRA_KEYSPACE!
  });

  connectCassandra(newClient);
  console.log("Secure connect bundle path:", path.join(__dirname, 'secure-connect.zip'));


  return newClient;
}

function connectCassandra(client: Client) {
  if (!client.hosts.length) {
    client.connect()
      .then(() => console.log("[SERVER] Connected to AstraDB"))
      .catch((err) => console.log(`[SERVER] AstraDB connection FAILURE - ${err.message}`));
  } else {
    console.log("[SERVER] Already connected to AstraDB");
  }
}

connectCassandra(cassandraDb);