use actix_web::{ App,  HttpServer};
mod routes;
mod lib {
    pub mod structures;
}
mod parse_log;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let log_path:String = "./src/example-logs/".to_string();
    parse_log::parse_log(log_path);
    HttpServer::new(|| {
        App::new()
            .service(routes::info)
            .service(routes::echo)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}