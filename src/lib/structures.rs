use std::collections::HashMap;

use serde::{Serialize, Deserialize};


#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")] 
pub struct LogUser {
    pub id: i64,
    pub name: String,
    pub experience: f32,
    pub level: i16,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct LogUsers (pub HashMap<String, LogUser>);


#[derive(Serialize)]
pub struct Response {
    pub info: String
}