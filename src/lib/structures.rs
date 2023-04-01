use std::{collections::HashMap};

use serde::{Serialize, Deserialize};


#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")] 
pub struct LogUser {  // used for desierializing *.json
    pub id: i64,
    pub name: String,
    pub experience: i32,
    pub level: i16,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct RankedLogUser {
    pub id: i64,
    pub name: String,
    pub experience: i32,
    pub level: i16,
    pub rank: i16
}
#[derive(Debug, Deserialize, Serialize)]
pub struct LogUsers (pub HashMap<String, LogUser>); // used for deserializing *.json

#[derive(Debug, Deserialize, Serialize)]
pub struct RankedLogUsers (pub HashMap<String, RankedLogUser>);


#[derive(Debug, Deserialize, Serialize)]
pub struct TFullState (pub HashMap<String, RankedLogUsers>);


#[derive(Serialize)]
pub struct Info {
    pub info: String
}
#[derive(Debug, Deserialize, Serialize)]
pub struct VpnNames (pub Vec<String>);