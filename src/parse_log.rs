use serde_json::{self};
use state::Storage;
use std::{fs::{self, ReadDir}, sync::RwLock, collections::HashMap, path::Path, vec};
use mongodb::{Client, bson::{Document, doc}, Collection};

use crate::lib::structures::{TFullState, LogUsers, RankedLogUsers, RankedLogUser, LogUser};

pub static FULL_SERVER_STATE: Storage<RwLock<TFullState>> = Storage::new(); // creates a static variable, which will be given to the routes.rs sercvice

pub async fn parse_log(mongodb_client: mongodb::Client) {
    let mut full_state:HashMap<String, RankedLogUsers>= HashMap::new();
    let database = mongodb_client.database("DuccBotRanking");
    for collection_name in database.list_collection_names(None).await.expect("Failed") {
        
        let collection: Collection<Document> = database.collection(&collection_name.clone());
        let pipeline = vec![doc! {
           "$sort": {
              "experience": -1
           }
        }];
        let mut cursor = collection.aggregate(pipeline, None).await.expect("Error");
        let mut ranked_users: RankedLogUsers = RankedLogUsers {
            log_name: collection_name.clone(),
            users: vec![],
            updated_at: chrono::Utc::now().timestamp(),
        };
        let mut rank = 1;
        while cursor.advance().await.expect("Naaa") {
            let doc = cursor.deserialize_current().expect("error");
            let user: RankedLogUser = RankedLogUser {
                id: doc.get_i64("_id").unwrap(),
                name: doc.get("name").unwrap().as_str().unwrap().to_string(),
                experience: doc.get_i32("experience").unwrap(),
                level: doc.get_i32("level").unwrap(),
                rank: rank,
            };
            rank += 1;
            ranked_users.users.push(user);
        }
        full_state.insert(collection_name.clone() ,ranked_users.clone());
       
    }
    //println!("{:#?}",full_state);
    FULL_SERVER_STATE.set(RwLock::new(TFullState(full_state.clone()))); // does not panic in threads so can be set here in loop
    
    // This overwrites the global static which will be ran in every loop
    let mut new_full_state = FULL_SERVER_STATE.get().try_write().unwrap();
    *new_full_state = TFullState(full_state.clone());
    println!("{:?}", new_full_state)
}