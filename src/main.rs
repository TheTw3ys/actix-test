#![allow(unused)]
use actix_web::{ App,  HttpServer};
use actix_rt::spawn;
use actix_rt::time::{interval};
use std::path::Path;
use std::time;
use std::env::{self, VarError};
use actix_files::Files;
mod routes;
mod lib {
    pub mod structures;
}
mod parse_log;

#[actix_web::main]

async fn main() -> std::io::Result<()> {
    /// This is the main function, which starts the Actix-webserver
    spawn(async move {
        /// This is an internal actix-web threading aproach designated to rerun 
        /// parse_log indefinetely every 5 seconds
        let mut interval = interval(time::Duration::from_millis(2500));
        loop {
          interval.tick().await;
          let log_path= Path::new("example-logs");
          parse_log::parse_log(log_path.to_str().unwrap().to_string());
          
        }
    });
    HttpServer::new(|| {
        /// The Web-Server starts here
        App::new()
        // These services serve the whole API
            .service(routes::info)
            .service(routes::logs)
        // This serves a static HTML-site which gets reshaded by the React-App
            .service(Files::new("/",(Path::new("public").to_str().unwrap())).index_file("index.html"))
    })
    .bind(("0.0.0.0", 42107))?
    .run()
    .await
}