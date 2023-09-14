use mongodb::{Client, bson::Document, Collection};
use tokio;

#[tokio::main]
async fn main() {
    let client = Client::with_uri_str("mongodb://localhost:27017").await.expect("Failed Connection");
    for db_name in client.list_database_names(None, None).await.expect("Failed"){
        println!("{}", db_name);
        if db_name == "DuccBotRanking" {
            let database = client.database(&db_name);
            for collection in database.list_collection_names(None).await.expect("Failed"){
                let collection: Collection<Document> = database.collection(&collection);
                for 
            }
        }
    }
}
