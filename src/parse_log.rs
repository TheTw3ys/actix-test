use crate::lib::{structures::{LogUsers}};
use serde_json::{self};
use state::{Storage};
use std::{fs::{self, ReadDir}, sync::RwLock};

pub static SERVER_STATE :Storage<RwLock<LogUsers>>= Storage::new() ;
fn parse_files_to_object(server_jsons: ReadDir){
    for file in server_jsons {
        let file_path = file.unwrap().path();
        let server_data:String = fs::read_to_string(file_path).expect("Unable to read file");
        let state: LogUsers =serde_json::from_str(&server_data).unwrap(); 
        SERVER_STATE.set(RwLock::new(state));
        }
        }


pub fn parse_log(log_path: String) {
    let log_paths = fs::read_dir(log_path).unwrap();
    parse_files_to_object(log_paths);
}