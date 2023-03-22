use actix_web::{HttpResponse, Responder,Result, get, post, web};

use crate::lib;




#[get("/api/v1/info")]
async fn info() -> Result<impl Responder> {
    let obj = lib::structures::Reponse {
        info:"This is an monitor overviewing current xp, it sits on the logfiles and displays its content nicely.".to_string(),
    };
    Ok(web::Json(obj))
}

#[post("/api/v1/log_names")]
pub async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}
