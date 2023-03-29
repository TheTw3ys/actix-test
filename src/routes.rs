use actix_web::{Responder, Result, get, web::{self,Json}};
use serde_json::Value;

use crate::{lib::{self}, parse_log::SERVER_STATE};




#[get("/api/v1/info")]
pub async fn info() -> Result<impl Responder> {
    let obj = lib::structures::Response {
        info:"This is an monitor overviewing current xp, it sits on the logfiles and displays its content nicely.".to_string(),
    };
    Ok(web::Json(obj))
}

#[get("/api/v1/log_names")]
pub async fn echo()-> Result<Json<Value>>{
    Ok(web::Json(serde_json::json!(SERVER_STATE.get())))
}