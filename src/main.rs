use actix_web::{ App,  HttpServer};
use actix_rt::spawn;
use actix_rt::time::{interval};
use std::time;
use actix_files::Files;
mod routes;
mod lib {
    pub mod structures;
}
mod parse_log;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
   
    spawn(async move {
        let mut interval = interval(time::Duration::from_secs(10));
        loop {
          interval.tick().await;
          let log_path:String = "./src/example-logs/".to_string();
          parse_log::parse_log(log_path);
    
        }
    });
    HttpServer::new(|| {
        App::new()
            .service(routes::info)
            .service(routes::logs)
            .service(routes::log_names)
            .service(Files::new("/","./public/").index_file("index.html"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}