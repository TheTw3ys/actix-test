use actix_web::{Responder, Result, get, web::{self, Json}};

use crate::lib::{self, structures::LogUsers};




#[get("/api/v1/info")]
pub async fn info() -> Result<impl Responder> {
    let obj = lib::structures::Response {
        info:"This is an monitor overviewing current xp, it sits on the logfiles and displays its content nicely.".to_string(),
    };
    Ok(web::Json(obj))
}

#[get("/api/v1/log_names")]
pub async fn echo(req_body: LogUsers) -> Json<String>{
    return web::Json(serde_json::json!(req_body).to_string())
}