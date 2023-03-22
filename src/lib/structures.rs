use serde::{Serialize, Deserialize};


#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")] 
pub struct LogUser {
    pub id: i64,
    pub name: String,
    pub experience: f32,
    pub level: i16,
}
#[derive(Debug)]
pub struct LogUsers {
    pub users: Vec<LogUser>
}

#[derive(Serialize)]
pub struct Reponse {
    pub info: String
}