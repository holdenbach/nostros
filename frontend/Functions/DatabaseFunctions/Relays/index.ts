import { QueryResult, QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { getItems } from '..'

export interface Relay {
  url: string
  name?: string
}

const databaseToEntity: (object: any) => Relay = (object) => {
  return object as Relay
}

export const addRelay: (
  relay: Relay,
  db: QuickSQLiteConnection,
) => Promise<QueryResult | undefined> = async (relay, db) => {
  if (relay.url) {
    const relays: Relay[] = await searchRelays(relay.url, db)
    if (relays.length === 0) {
      const query = `
        INSERT OR IGNORE INTO nostros_relays
          (url) 
        VALUES 
          (?);
      `
      const queryValues = [relay.url.split("'").join("''")]

      return db.execute(query, queryValues)
    }
  }
}

export const removeRelay: (
  relay: Relay,
  db: QuickSQLiteConnection,
) => Promise<QueryResult | undefined> = async (relay, db) => {
  if (relay.url) {
    const query = `
      DELETE FROM nostros_relays WHERE url=?;
    `
    return db.execute(query, [relay.url])
  }
}

export const searchRelays: (
  relayUrl: string,
  db: QuickSQLiteConnection,
) => Promise<Relay[]> = async (relayUrl, db) => {
  const searchQuery = `SELECT * FROM nostros_relays WHERE url = '${relayUrl}';`
  const results = await db.execute(searchQuery)
  const items: object[] = getItems(results)
  const notes: Relay[] = items.map((object) => databaseToEntity(object))
  return notes
}

export const getRelays: (db: QuickSQLiteConnection) => Promise<Relay[]> = async (db) => {
  const notesQuery = 'SELECT * FROM nostros_relays;'
  const resultSet = await db.execute(notesQuery)
  const items: object[] = getItems(resultSet)
  const relays: Relay[] = items.map((object) => databaseToEntity(object))
  return relays
}
