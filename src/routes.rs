use actix_web::{Responder, Result, get, web::{self,Json}};
use serde_json::Value;

use crate::{lib::{self, structures::VpnNames}, parse_log::FULL_SERVER_STATE};




#[get("/api/v1/info")]
pub async fn info() -> Result<impl Responder> {
    let obj = lib::structures::Info{
        info:"This is an monitor overviewing current xp, it sits on the logfiles and displays its content nicely.".to_string(),
    };
    Ok(web::Json(obj))
}

#[get("/api/v1/logs")]
pub async fn logs()-> Result<Json<Value>>{
    Ok(web::Json(serde_json::json!(FULL_SERVER_STATE.get())))
}
#[get("/api/v1/log_names")]
pub async fn log_names()-> Result<Json<Value>>{
    let mut obj:VpnNames = VpnNames(vec![]);
        for key in FULL_SERVER_STATE.get().try_read().unwrap().0.keys(){
            obj.0.push(key.to_string());
        }
    Ok(web::Json(serde_json::json!(obj)))
}
