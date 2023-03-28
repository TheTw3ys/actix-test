use crate::lib::{self, structures::{LogUsers}};
use serde_json::{self, Value, json};
use std::{fs::{self, ReadDir}, collections::HashMap};

fn parse_files_to_object(server_jsons: ReadDir)-> LogUsers{
    let mut state: LogUsers = lib::structures::LogUsers(HashMap::new());
    for file in server_jsons {
        let file_path = file.unwrap().path();
        let server_data:String = fs::read_to_string(file_path).expect("Unable to read file");
        state = serde_json::from_str(&server_data).unwrap();
        print!("{:#?}",json!(state).to_string())       
        }
    return state
    }


pub fn parse_log(log_path: String) {
    let log_paths = fs::read_dir(log_path).unwrap();
    parse_files_to_object(log_paths);
}